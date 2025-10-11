function BlockScriptToast({
  convertedScript,
}: {
  convertedScript: string | null;
}) {
  if (convertedScript === null) return null;
  return (
    <div className="absolute top-8 right-8 z-100">
      <div className="w-48 bg-gray-800 text-white text-left px-4 py-2 rounded-lg shadow-lg animate-fade-in-down">
        <pre className="text-sm whitespace-pre-wrap">{convertedScript}</pre>
      </div>
    </div>
  );
}

export default BlockScriptToast;
