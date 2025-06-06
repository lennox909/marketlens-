import React, { useState } from "react";

const SentimentChecker: React.FC = () => {
  const [input, setInput] = useState("");
  const [asset, setAsset] = useState("BTC");
  const [result, setResult] = useState<{ label: string; score: number } | null>(null);
  const [loading, setLoading] = useState(false);

  const analyzeSentiment = async () => {
    if (!input.trim()) return;

    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:8000/analyze?text=${encodeURIComponent(input)}&asset=${encodeURIComponent(asset)}`
      );
      const data = await response.json();
      setResult(data.sentiment);
    } catch (error) {
      console.error("Error analyzing sentiment:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4 bg-white rounded-2xl shadow-md mt-10">
      <h1 className="text-2xl font-bold mb-4">MarketLens Sentiment Analyzer</h1>

      <div className="mb-4">
        <label className="block mb-1 font-semibold">Asset Ticker</label>
        <input
          className="w-full p-2 border border-gray-300 rounded-md"
          type="text"
          placeholder="e.g. BTC, TSLA"
          value={asset}
          onChange={(e) => setAsset(e.target.value.toUpperCase())}
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-semibold">Text to Analyze</label>
        <input
          className="w-full p-2 border border-gray-300 rounded-md"
          type="text"
          placeholder="Enter financial news or tweet..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </div>

      <button
        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        onClick={analyzeSentiment}
      >
        {loading ? "Analyzing..." : "Analyze"}
      </button>

      {result && (
        <div className="mt-4 p-4 bg-gray-100 rounded-md">
          <p><strong>Asset:</strong> {asset}</p>
          <p><strong>Label:</strong> {result.label}</p>
          <p><strong>Confidence:</strong> {(result.score * 100).toFixed(2)}%</p>
        </div>
      )}
    </div>
  );
};

export default SentimentChecker;
