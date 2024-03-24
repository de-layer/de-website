import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

export default function TestnetPage() {
  redirect("/dapp/testnet");
}