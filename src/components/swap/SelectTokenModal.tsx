import { TOKENS } from "@/util/swap/agg";
import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import { isAddress } from "viem";

interface Props {
  onClose: () => void;
  onSelect: (address: string, onlyToWeth: boolean, poolFee: number) => void;
}

function SelectTokenModal({ onClose, onSelect }: Props) {
  const [search, setSearch] = useState("");

  return (
    <div className="fixed inset-0 top-0 bottom-0 left-0 right-0 z-50 w-full h-full text-whites bg-black bg-opacity-50 p-2">
      <div className="w-full h-full max-w-[100vw] max-h-screen overflow-y-auto py-4 px-8 text-center">
        <div className="flex flex-col w-full max-w-lg bg-white shadow-xl rounded-xl px-6 py-6 gap-6 mx-auto">
          <div className="flex flex-row justify-between">
            <h1 className="text-2xl font-bold">Select token</h1>
            <button className="font-bold text-xl" onClick={() => onClose()}>
              <IoClose size={"24px"} />
            </button>
          </div>

          <span>select token by address:</span>

          <div className="flex flex-col w-full gap-2">
            <div className="flex flex-col md:flex-row justify-between gap-2">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Enter address"
                className="flex-1 bg-transparent border-[1px] border-neutral outline-none rounded-xl px-3 py-2"
              />
            </div>
            <button
              className="bg-primary text-white rounded-xl leading-tight px-4 py-2 max-w-[8rem] ml-auto"
              onClick={() => {
                if (isAddress(search)) {
                  onSelect(search, false, 0);
                } else {
                  alert("Invalid address");
                }
              }}
            >
              Add token
            </button>
          </div>

          <span>or, choose from the list:</span>

          <div className="flex flex-col gap-1">
            <div className="flex flex-row flex-wrap justify-start items-center gap-3">
              {TOKENS.map((token, tidx) => (
                <button
                  key={tidx}
                  className="bg-primary text-white rounded-xl px-6 py-2 md:text-lg"
                  onClick={() => onSelect(token.address, false, 0)}
                >
                  {token.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default React.memo(SelectTokenModal);