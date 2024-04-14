import { formatUnits, isAddress } from "viem";


export function formatGwei(amount: bigint = 0n, decimals = 18) {
  const [whole, _decimal] = formatUnits(amount, decimals).split(".");
  return parseInt(whole).toLocaleString();
}

export function prettyFormatEther(amount = 0n, decimals = 18) {
  let [whole, longDecimal] = formatUnits(amount, decimals).split(".");
  longDecimal ??= "0";

  const shortDecimal = longDecimal.slice(0, 4);

  if (whole === "0" && parseInt(shortDecimal) < 10) {
    let result = `${whole}.`;

    let endNext = false;
    for (const char of longDecimal) {
      result = result + char;

      if (endNext) {
        break;
      }

      if (char !== "0") {
        endNext = true;
      }
    }

    return result;
  } else {
    return `${whole}.${shortDecimal}`;
  }
}

export function shortenIfAddress(x: unknown) {
  if (typeof x !== "string") return "";
  if (!isAddress(x)) return x;

  return `${x.slice(0, 6)}...${x.slice(-4)}`;
}