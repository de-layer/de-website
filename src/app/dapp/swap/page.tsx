"use client";

import { AppButton } from "@/components/AppButton";
import LoadingScreen from '@/components/LoadingScreen';
import SelectTokenModal from '@/components/swap/SelectTokenModal';
import { prettyFormatEther, shortenIfAddress } from "@/util/format";
import { useSwap, useSwapApproval } from "@/util/swap/swap";
import { wtDEAIAddress } from "@/util/swap/swapContracts";
import { daozang } from "@/util/testnet";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import type { NextPage } from 'next';
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import { HiOutlineSwitchVertical } from "react-icons/hi";
import { formatUnits, isAddress, parseUnits } from "viem";
import { useAccount, useBalance, useToken } from "wagmi";

const SwapPage: NextPage = () => {
  const searchParams = useSearchParams();
  const wasLoaded = useRef(false);

  const { open } = useWeb3Modal();
  const { address, isConnected } = useAccount();

  const [inputToken, setInputToken] = useState(wtDEAIAddress);
  const [outputToken, setOutputToken] = useState("0x80a6127a88006Dc9997f3A42E115c4128aC34031");
  const [slippagePerMille, setSlippagePerMille] = useState(10); // default: 1%
  const [slippageTxt, setSlippageTxt] = useState("1");

  const queryAddress = searchParams.get("address");

  useEffect(() => {
    if (wasLoaded.current || !queryAddress) return;
    if (queryAddress && isAddress(queryAddress)) {
      setOutputToken(queryAddress);
    };
  }, [queryAddress]);

  const [poolFee, setPoolFee] = useState(0);

  const { data: inputData } = useToken({
    address: inputToken as `0x${string}`,
    chainId: daozang.id
  });
  const { data: outputData } = useToken({
    address: outputToken as `0x${string}`,
    chainId: daozang.id
  });

  const { data: ethBalanceRaw, refetch: refetch1 } = useBalance({
    address,
    chainId: daozang.id,
  });

  const { data: inputBalanceRaw, refetch: refetch2 } = useBalance({
    address,
    chainId: daozang.id,
    token: inputToken as `0x${string}`
  });
  const { data: outputBalanceRaw, refetch: refetch3 } = useBalance({
    address,
    chainId: daozang.id,
    token: outputToken as `0x${string}`
  });

  useEffect(() => {
    const interval = setInterval(() => {
      refetch1();
      refetch2();
      refetch3();
    }, 15000);
    return () => clearInterval(interval);
  }, [refetch1, refetch2, refetch3]);

  const inputBalance = inputToken === wtDEAIAddress ? ethBalanceRaw?.value : inputBalanceRaw?.value;
  const outputBalance = outputToken === wtDEAIAddress ? ethBalanceRaw?.value : outputBalanceRaw?.value;

  const [amount, setAmount] = useState("0.1");
  const [amountBN, setAmountBN] = useState(0n);

  const swapParams = useMemo(() => ({
    tokens: {
      input: inputToken as `0x${string}`,
      output: outputToken as `0x${string}`,
      poolFee
    },
    to: address ?? "0xAB8253Cd0A011c2dE1fff63AeC12C2bDFFADe488",
    slippageTolerance: {
      numerator: BigInt(slippagePerMille),
      denominator: 1000n
    },
    amountIn: amountBN
  }), [address, amountBN, inputToken, outputToken, slippagePerMille, poolFee]);

  const swapData = useSwap(swapParams);
  const swapApprove = useSwapApproval(swapParams, swapData);

  useEffect(() => {
    try {
      setAmountBN(parseUnits(amount, inputData?.decimals ?? 18));
    } catch (e) {
      setAmountBN(0n);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [amount]);

  const [loading, setLoading] = useState(false);
  const [selectTokenModal, setSelectTokenModal] = useState<null | "input" | "output">(null);

  const onTokenSelect = useCallback((address: string, onlyToWeth: boolean, poolFee: number) => {
    if (selectTokenModal === "input") {
      if (outputToken === address) setOutputToken(inputToken);
      setInputToken(address);
      if (onlyToWeth) setOutputToken(wtDEAIAddress);
    } else if (selectTokenModal === "output") {
      if (inputToken === address) setInputToken(outputToken);
      setOutputToken(address);
      if (onlyToWeth) setInputToken(wtDEAIAddress);
    }

    setPoolFee(poolFee);
    setSelectTokenModal(null);
  }, [selectTokenModal, inputToken, outputToken]);

  const onTokenSelectClose = useCallback(() => {
    setSelectTokenModal(null);
  }, []);

  return (
    <>
      <div className="w-full max-w-lg mx-auto relative z-20 mt-32 flex flex-row gap-4 mb-4">
        <AppButton href="/dapp/swap" className="underline">
          Swap
        </AppButton>
        <AppButton href="/dapp/liquidity">
          Liquidity
        </AppButton>
      </div>
      <div className="w-full max-w-lg mx-auto min-h-96 relative z-20 mb-32 rounded-lg border-white border backdrop-blur-lg text-white flex flex-col gap-4 max-h-full h-[32rem] p-4 md:p-8">
        <p className='text-2xl font-semibold'>Swap</p>
        <div className='flex flex-col space-y-2 md:space-y-0 md:flex-row justify-between'>
          <label className='flex flex-row gap-2 items-center text-sm'>
            <span>Slippage:</span>
            <div className='flex flex-row gap-2 items-center border rounded-md border-white px-2'>
              <input
                type='text'
                value={slippageTxt}
                onChange={e => {
                  setSlippageTxt(e.target.value);

                  const pct = Number(e.target.value);
                  if (isNaN(pct)) setSlippagePerMille(50);
                  if (pct <= 0 || pct >= 100) {
                    setSlippagePerMille(50);
                    return;
                  }

                  const perMille = Math.floor(pct * 10);
                  setSlippagePerMille(perMille);
                }}
                className='bg-transparent p-1 w-[1.5rem] h-4 text-sm ring-0 outline-none '
              />
              <span>%</span>
            </div>
          </label>
        </div>
        <div className='relative flex flex-col space-y-6 items-center justify-center mb-auto'>
          <div className='w-full h-24 bg-black border border-white flex flex-col items-center justify-center px-4 py-2 rounded-xl text-base md:text-lg'>
            <div className='flex flex-row items-center justify-between w-full'>
              <input
                type='text'
                value={amount}
                onChange={e => setAmount(e.target.value)}
                placeholder='Amount'
                className='bg-transparent w-[6rem] sm:w-[8rem] md:w-[10rem] p-1  flex-1  font-semibold'
              />
              <button
                className='font-bold flex flex-row items-center justify-between gap-2 cursor-pointer'
                onClick={() => setSelectTokenModal("input")}
              >
                <p className='w-full text-end ml-3'>{inputData?.symbol ?? shortenIfAddress(inputToken)}</p>
                <FaChevronDown />
              </button>
            </div>

            {typeof inputBalance === "bigint" && (
              <div
                className='w-full text-start text-sm flex flex-row justify-between'
              >
                <span className='ml-1 '>Balance: {prettyFormatEther(inputBalance, inputData?.decimals ?? 18)} {inputData?.symbol}</span>
                <button onClick={() => setAmount(formatUnits(inputBalance, inputData?.decimals ?? 18))}>
                  [<span className='underline'>max</span>]
                </button>
              </div>
            )}
          </div>

          <button
            className='absolute left-0 right-0 bottom-1/2 translate-y-1/2 text-center flex items-center justify-center'
            onClick={() => {
              const temp = inputToken;
              const temp2 = prettyFormatEther(swapData.amountsOut.base, outputData?.decimals ?? 18);

              setInputToken(outputToken);
              setOutputToken(temp);
              setAmount(temp2);
            }}
          >
            <HiOutlineSwitchVertical size={50} />
          </button>

          <div className='w-full h-24 bg-black border border-white flex flex-col items-center justify-center px-4 py-2 rounded-xl text-base md:text-lg'>
            <div className='flex flex-row items-center justify-between w-full'>
              <div className='bg-transparent p-1  flex-1 font-semibold'>
                {prettyFormatEther(swapData.amountsOut.base, outputData?.decimals ?? 18)}
              </div>
              <button
                className='font-bold flex flex-row items-center justify-between gap-2 cursor-pointer'
                onClick={() => setSelectTokenModal("output")}
              >
                <p className='w-full text-end ml-3'>{outputData?.symbol ?? shortenIfAddress(outputToken)}</p>
                <FaChevronDown />
              </button>
            </div>

            {typeof outputBalance === "bigint" && <p className='w-full text-start text-sm ml-1'>Balance: {prettyFormatEther(outputBalance, outputData?.decimals ?? 18)} {outputData?.symbol}</p>}
          </div>
        </div>
        {!isConnected && (
          <button onClick={() => open()} className='w-full bg-accent text-white rounded-xl p-2 text-lg'>
            Connect Wallet
          </button>
        )}

        {isConnected && swapApprove.shouldApprove && (
          <button onClick={() => {
            setLoading(true);
            swapApprove.approve()
              .finally(() => setLoading(false));
          }} className='w-full bg-accent text-white rounded-xl p-2 text-lg'>
            Approve Tokens
          </button>
        )}

        {isConnected && !swapApprove.shouldApprove && (
          <button onClick={() => {
            setLoading(true);
            swapData.swapFunction()
              .finally(() => setLoading(false));
          }} className='w-full bg-accent text-white rounded-xl p-2 text-lg'>
            Swap
          </button>
        )}

        <div className='flex flex-col w-full items-start justify-start text-sm'>
          <p>Minimum output: {prettyFormatEther(swapData.amountsOut.minimum, outputData?.decimals ?? 18)} {outputData?.symbol ?? shortenIfAddress(outputToken)}</p>
          <p>Expected output: {prettyFormatEther(swapData.amountsOut.base, outputData?.decimals ?? 18)} {outputData?.symbol ?? shortenIfAddress(outputToken)}</p>
        </div>
      </div>

      {selectTokenModal && (
        <SelectTokenModal
          onSelect={onTokenSelect}
          onClose={onTokenSelectClose}
        />
      )}
      {loading && <LoadingScreen />}
    </>
  );
};

export default SwapPage;
