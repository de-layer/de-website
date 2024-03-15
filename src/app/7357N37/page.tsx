"use client";

import { useEffect, useState } from "react";

type Dots = "." | ".." | "...";

function getNextDots(previous: Dots): Dots {
  switch (previous) {
    case ".":
      return "..";
    case "..":
      return "...";
    case "...":
      return ".";
  }
}

export default function TestnetPage() {
  const [dots, setDots] = useState<Dots>("...");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => getNextDots(prev));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-4 font-serif">
      <h1 className="text-xl font-bold">Error 7357</h1>
      <p>Establishing connection with network in progress{dots}</p>
    </div>
  );
}