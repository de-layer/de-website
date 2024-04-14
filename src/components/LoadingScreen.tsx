export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-50 w-full h-full text-white bg-black bg-opacity-50 backdrop-blur">
      <div className="flex flex-col items-center justify-center w-full h-full py-4 px-8 text-center">
        <div className="flex flex-col w-full max-w-lg bg-black/50 backdrop-blur-lg border-white border rounded-xl px-6 py-6 gap-6">
          <div className="flex flex-col justify-between">
            <h1 className="text-2xl font-bold">Waiting for transaction...</h1>
          </div>
        </div>
      </div>
    </div>
  );
}