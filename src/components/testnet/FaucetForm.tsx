"use client";
import { faucetAction } from "@/util/faucet";
import { useFormState, useFormStatus } from "react-dom";

const initialState = {
  message: ""
};

export default function FaucetForm() {
  const [state, formAction] = useFormState(faucetAction, initialState);

  return (
    <form className="w-full flex flex-col gap-2 items-start justify-start mt-auto" action={formAction}>
      {'error' in state ? (
        <p className="w-full text-red-500 break-words">{state.error}</p>
      ) : 'message' in state ? (
        <p className="w-full text-green-500 break-words">{state.message}</p>
      ) : null}
      <FaucetFormInner />
    </form>
  );
}

function FaucetFormInner() {
  const { pending } = useFormStatus();

  return (
    <>
      <label className="flex flex-row gap-2 items-start justify-start w-full">
        <span className="w-28">Your address:</span>
        <input
          name="address"
          type="text"
          placeholder="0x1234567890abcdef..."
          className="text-black flex-1"
        />
      </label>

      <input
        type="submit"
        value="Request Tokens"
        className="py-2 px-3 border border-white rounded-md cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={pending}
      />
    </>
  );
}