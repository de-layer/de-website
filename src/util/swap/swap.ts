import { useMemo } from "react";
import { erc20Abi } from "viem";
import { useConfig, useReadContract, useWriteContract } from "wagmi";
import { waitForTransactionReceipt } from "wagmi/actions";
import { useRouterApprove } from "./erc20";
import { router, routerAddress, wtDEAIAddress } from "./swapContracts";

interface SwapParameters {
  tokens: {
    input: `0x${string}`;
    output: `0x${string}`;
    poolFee: number;
  },
  to: `0x${string}`;
  slippageTolerance: {
    numerator: bigint;
    denominator: bigint;
  };
  amountIn: bigint;
}

type SwapFunction = () => Promise<`0x${string}` | undefined>;

interface SwapData {
  swapFunction: SwapFunction;
  swapFunctionName: string;
  amountsOut: {
    minimum: bigint,
    base: bigint;
  };
  path: string[];
  shouldHaveApprove: boolean;
}

export function useSwapApproval(params: SwapParameters, data: SwapData) {
  const { data: allowance } = useReadContract({
    address: params.tokens.input,
    abi: erc20Abi,
    functionName: "allowance",
    args: [params.to, routerAddress]
  });
  const approve = useRouterApprove(params.tokens.input);
  const config = useConfig();

  return {
    approve: () => approve(params.amountIn).then((hash) => waitForTransactionReceipt(config, { hash })),
    shouldApprove: data.shouldHaveApprove && (allowance ?? 0n) < params.amountIn
  };
}

export function useSwap(params: SwapParameters): SwapData {
  const { desiredFunction, path } = makePath(params);
  const amountsOut = useAmountsOut(params, path);

  const { writeContractAsync } = useWriteContract();
  const config = useConfig();

  const deadline = getSwapDeadline();

  let swapFunction: SwapFunction = () => Promise.resolve(undefined);

  switch (desiredFunction) {
    case "swapExactETHForTokensSupportingFeeOnTransferTokens": {
      swapFunction = () => writeContractAsync({
        ...router,
        functionName: "swapExactETHForTokensSupportingFeeOnTransferTokens",
        args: [amountsOut.minimum, path, params.to, deadline],
        value: params.amountIn
      }
      );
      break;
    }
    case "swapExactTokensForTokensSupportingFeeOnTransferTokens":
    case "swapExactTokensForETHSupportingFeeOnTransferTokens": {
      swapFunction = () => writeContractAsync({
        ...router,
        functionName: desiredFunction,
        args: [params.amountIn, amountsOut.minimum, path, params.to, deadline],
      }
      );
      break;
    }
  }

  return {
    swapFunction: () => swapFunction().then(async (hash) => {
      hash && await waitForTransactionReceipt(config, { hash });
      return hash;
    }),
    swapFunctionName: desiredFunction,
    amountsOut,
    path,
    shouldHaveApprove: (desiredFunction !== "swapExactETHForTokensSupportingFeeOnTransferTokens") && params.tokens.input !== wtDEAIAddress
  };
}

type SwapKind = "swapExactETHForTokensSupportingFeeOnTransferTokens" | "swapExactTokensForTokensSupportingFeeOnTransferTokens" | "swapExactTokensForETHSupportingFeeOnTransferTokens";
interface MakePathT {
  path: `0x${string}`[];
  desiredFunction: SwapKind;
}

function makePath(params: SwapParameters): MakePathT {
  const { input, output } = params.tokens;

  if (input.toLowerCase() === wtDEAIAddress.toLowerCase()) {
    return {
      path: [input, output],
      desiredFunction: "swapExactETHForTokensSupportingFeeOnTransferTokens"
    };
  } else if (output.toLowerCase() === wtDEAIAddress.toLowerCase()) {
    return {
      path: [input, output],
      desiredFunction: "swapExactTokensForETHSupportingFeeOnTransferTokens"
    };
  } else {
    return {
      path: [input, wtDEAIAddress, output],
      desiredFunction: "swapExactTokensForTokensSupportingFeeOnTransferTokens"
    };
  }
}

function useAmountsOut(params: SwapParameters, path: `0x${string}`[]) {
  const { data } = useReadContract({
    ...router,
    functionName: "getAmountsOut",
    args: [params.amountIn, path]
  });

  return useMemo(() => {
    let canonicalValue = 0n;

    const lastPath = path.length - 1;
    canonicalValue = data?.[lastPath] || 0n;

    const withoutFee = canonicalValue;

    const { numerator, denominator } = params.slippageTolerance;
    const slippageInverseNum = denominator - numerator;
    const withoutSlippageAndFee = withoutFee * slippageInverseNum / denominator;

    return {
      base: withoutFee,
      minimum: withoutSlippageAndFee,
    };
  }, [data, params, path]);
}

export function getSwapDeadline() {
  const delay = 60 * 5; // 5 minutes
  const timeNow = Math.floor(Date.now() / 1000);
  return BigInt(timeNow + delay);
}