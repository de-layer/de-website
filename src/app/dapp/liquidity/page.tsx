"use client";

import { AppButton } from "@/components/AppButton";
import LoadingScreen from '@/components/LoadingScreen';
import SelectTokenModal from "@/components/swap/SelectTokenModal";
import { prettyFormatEther, shortenIfAddress } from "@/util/format";
import { useLiquidity } from "@/util/swap/liquidity";
import { wtDEAIAddress } from "@/util/swap/swapContracts";
import { daozang } from "@/util/testnet";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { useEffect, useState } from "react";
import { formatEther, parseEther, parseUnits } from "viem";
import { useAccount, useBalance, useToken } from "wagmi";

export default function Home() {
  const { address } = useAccount();
  const { open } = useWeb3Modal();

  const [token, setToken] = useState('');
  const { pairAddress, addLiquidity, reserves, allowance } = useLiquidity(token);
  const { data: tokenInfo } = useToken({
    address: token as `0x${string}`,
    chainId: daozang.id,
  });

  const [amountETH, setAmountETH] = useState('');
  const [amountToken, setAmountToken] = useState('');
  const [amountETHbn, setAmountETHbn] = useState(0n);
  const [amountTokenbn, setAmountTokenbn] = useState(0n);
  const [errorAmountETH, setErrorAmountETH] = useState(false);
  const [errorAmountToken, setErrorAmountToken] = useState(false);

  const [loading, setLoading] = useState(false);
  const [selectTokenModal, setSelectTokenModal] = useState(false);

  useEffect(() => {
    if (!tokenInfo) return;
    try {
      setAmountETHbn(parseEther(amountETH));
      setErrorAmountETH(false);
    } catch (e) {
      setAmountETHbn(0n);
      setErrorAmountETH(true);
    }
    try {
      setAmountTokenbn(parseUnits(amountToken, tokenInfo.decimals));
      setErrorAmountToken(false);
    } catch (e) {
      setAmountTokenbn(0n);
      setErrorAmountToken(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [amountETH, amountToken]);

  const { data: ethBalanceRaw } = useBalance({
    address,
    chainId: daozang.id,
  });
  const { data: balanceTokenRaw } = useBalance({
    address,
    chainId: daozang.id,
    token: token as `0x${string}`,
  });

  return (
    <>
      <div className="w-full max-w-lg mx-auto relative z-20 mt-32 flex flex-row gap-4 mb-4">
        <AppButton href="/dapp/swap">
          Swap
        </AppButton>
        <AppButton href="/dapp/liquidity" className="underline">
          Liquidity
        </AppButton>
      </div>
      <div className="w-full max-w-lg mx-auto min-h-96 relative z-20 mb-32 rounded-lg border-white border backdrop-blur-lg text-white flex flex-col gap-4 max-h-full h-[32rem] p-4 md:p-8">
        <h1 className="text-2xl font-semibold">Add liquidity</h1>

        <div className="flex flex-row gap-2">
          <input
            type="text"
            value={token}
            placeholder="Token address"
            className="flex-1 border-neutral bg-black border-opacity-50 border-2 rounded-xl px-1 py-1 md:px-2 md:py-1 outline-none text-sm md:text-base"
            readOnly
          />
          <button
            className="bg-primary px-2 py-1 leading-none md:px-3 md:py-2 rounded-xl text-white"
            onClick={() => setSelectTokenModal(true)}
          >
            Choose token
          </button>
        </div>

        {(pairAddress === undefined || !tokenInfo || token === wtDEAIAddress || typeof allowance !== "bigint") ? (
          <></>
        ) : (
          <>
            <p>{tokenInfo.name} / <span className="font-bold">${tokenInfo.symbol}</span></p>
            <div className="flex flex-col">
              <p>
                <span>Pool: </span>
                {(pairAddress === "0x0000000000000000000000000000000000000000") ? (
                  'will be created'
                ) : (
                  <a
                    href={`https://daozang-explorer.delayer.network/address/${pairAddress}`}
                    target="_blank"
                    rel="noreferrer"
                    className="underline"
                  >
                    {shortenIfAddress(pairAddress)}
                  </a>
                )}
              </p>
              {typeof reserves.eth === "bigint" && <p>Pooled WtDEAI: {prettyFormatEther(reserves.eth)}</p>}
              {typeof reserves.token === "bigint" && <p>Pooled {tokenInfo.symbol}: {prettyFormatEther(reserves.token, tokenInfo.decimals)}</p>}
            </div>

            <div className="flex flex-col w-full gap-1 mt-auto">
              <div className="w-full flex flex-row items-center gap-2">
                <div className="flex-1 relative flex flex-row items-center">
                  <input
                    type="text"
                    value={amountETH}
                    onChange={(e) => setAmountETH(e.target.value)}
                    placeholder="Amount ETH"
                    className={`w-full border-opacity-50 border-2 bg-black rounded-md px-2 py-1 outline-none ${errorAmountETH ? 'border-red-500' : 'border-white'}`}
                  />
                  <button
                    className="absolute right-2 hover:underline underline-offset-2"
                    onClick={() => ethBalanceRaw?.value && setAmountETH(formatEther(ethBalanceRaw.value))}
                  >max</button>
                </div>
                <span className="basis-16">WtDEAI</span>
              </div>

              <p>You have: {prettyFormatEther(ethBalanceRaw?.value)} WtDEAI</p>
            </div>

            <div className="flex flex-col w-full gap-1">
              <div className="w-full flex flex-row items-center gap-2">
                <div className="flex-1 relative flex flex-row items-center">
                  <input
                    type="text"
                    value={amountToken}
                    onChange={(e) => setAmountToken(e.target.value)}
                    placeholder={`Amount ${tokenInfo.symbol}`}
                    className={`w-full border-opacity-50 border-2 rounded-md bg-black px-2 py-1 outline-none ${errorAmountToken ? 'border-red-500' : 'border-white'}`}
                  />
                  <button
                    className="absolute right-2 hover:underline underline-offset-2"
                    onClick={() => balanceTokenRaw?.value && setAmountToken(formatEther(balanceTokenRaw.value))}
                  >max</button>
                </div>
                <span className="basis-16">{tokenInfo.symbol}</span>
              </div>

              <p>You have: {prettyFormatEther(balanceTokenRaw?.value, tokenInfo.decimals ?? 18)} {tokenInfo.symbol}</p>
            </div>
          </>

        )}
        <button
          className="w-full bg-accent text-white rounded-xl p-2 mt-auto text-lg"
          onClick={() => {
            if (!address) {
              open();
              return;
            }
            if (!token) {
              setSelectTokenModal(true);
              return;
            }
            if (!amountETHbn || !amountTokenbn) {
              alert('Incorrect amount');
              return;
            }
            setLoading(true);
            addLiquidity(amountTokenbn, amountETHbn)
              .finally(() => setLoading(false));
          }}
        >
          {address ? (typeof allowance === "bigint" ? (allowance < amountTokenbn ? 'Approve' : 'Add liquidity') : 'Select token') : 'Connect wallet'}
        </button>
      </div>

      {selectTokenModal && (
        <SelectTokenModal
          onSelect={(address) => { setToken(address); setSelectTokenModal(false); }}
          onClose={() => setSelectTokenModal(false)}
        />
      )}
      {loading && <LoadingScreen />}
    </>
  );
}
