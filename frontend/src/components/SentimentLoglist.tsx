import React, { useEffect, useState } from "react";

const SentimentLogList: React.FC = () => {
  const [logs, setLogs] = useState<any[]>([]);

  useEffect(() => {
    fetch("http://localhost:8000/logs")
      .then((res) => res.json())
      .then((data) => setLogs(data));
  }, []);

  return (
    <div className="mt-10 bg-white rounded-2xl p-4 shadow">
      <h2 className="text-xl font-bold mb-4">Historical Sentiment Logs</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left border">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2">Asset</th>
              <th className="px-4 py-2">Text</th>
              <th className="px-4 py-2">Label</th>
              <th className="px-4 py-2">Confidence</th>
              <th className="px-4 py-2">Time</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log) => (
              <tr key={log.id} className="border-t">
                <td className="px-4 py-2">{log.asset}</td>
                <td className="px-4 py-2">{log.text}</td>
                <td className="px-4 py-2">{log.label}</td>
                <td className="px-4 py-2">{(log.score * 100).toFixed(2)}%</td>
                <td className="px-4 py-2">{new Date(log.timestamp).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SentimentLogList;
