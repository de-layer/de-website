"use server";
import "server-only";
import { Chain, createPublicClient, createWalletClient, erc20Abi, getContract, http, isAddress, parseEther } from "viem";
import { arbitrum, mainnet } from "viem/chains";
import { ChainName, bridgedTokenAddress, mainnetTokenAddress } from "./bridge";
import { daozang } from "./testnet";
import { privateKeyToAccount } from "viem/accounts";
import { getBalance, waitForTransactionReceipt } from "viem/actions";

type FaucetFormState = {
  message: string;
} | {
  error: string;
};

function getPublicClient(chain: ChainName) {
  let chainConfig: Chain = mainnet;
  if (chain === "arbitrumOne") chainConfig = arbitrum;
  else if (chain === "base") chainConfig = arbitrum;

  return createPublicClient({
    chain: chainConfig,
    transport: http()
  });
}

async function sendTestnetTokens(to: `0x${string}`) {
  const client = createWalletClient({
    chain: daozang,
    transport: http()
  });
  const key = process.env.FAUCET_PRIVATE_KEY || "";

  if (!key || !key.startsWith("0x")) {
    throw new Error("Invalid faucet private key");
  }

  const account = privateKeyToAccount(key as `0x${string}`);

  const hash = await client.sendTransaction({
    account,
    to,
    value: parseEther("100")
  });

  await waitForTransactionReceipt(client, { hash });

  return hash;
}

async function isHolderOnChain(chain: ChainName, address: `0x${string}`) {
  const token = getContract({
    abi: erc20Abi,
    address: chain === "eth" ? mainnetTokenAddress : bridgedTokenAddress,
    client: getPublicClient(chain)
  });

  const balance = await token.read.balanceOf([address]);
  return balance > 0n;
}

async function isHolderOnTestnet(address: `0x${string}`) {
  const client = createPublicClient({
    chain: daozang,
    transport: http()
  });
  return (await getBalance(client, { address })) > 0n;
}

export async function faucetAction(_currentState: FaucetFormState, formData: FormData): Promise<FaucetFormState> {
  const address = formData.get("address");
  if (typeof address !== "string" || !isAddress(address)) {
    return { error: "Invalid address" };
  }

  try {
    const isHolder = await isHolderOnChain("eth", address) || await isHolderOnChain("arbitrumOne", address) || await isHolderOnChain("base", address);
    if (!isHolder) {
      return { error: "Only $DEAI holders can use the faucet" };
    }

    const isTestnetHolder = await isHolderOnTestnet(address);
    if (isTestnetHolder) {
      return { error: "You have already received testnet tokens" };
    }
  } catch (e) {
    return { error: "An error occurred while fetching balance" };
  }

  try {
    const tx = await sendTestnetTokens(address);

    return { message: "Tokens sent successfully. Transaction hash: " + tx };
  } catch (e) {
    console.error(e);
    return { error: "An error occurred while sending tokens" };
  }
}