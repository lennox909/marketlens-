import React, { useEffect, useState } from "react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from "recharts";

const SentimentChart: React.FC = () => {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    fetch("http://localhost:8000/logs")
      .then((res) => res.json())
      .then((logs) => {
        const formatted = logs.map((log: any) => ({
          asset: log.asset,
          score: log.score,
          time: new Date(log.timestamp).toLocaleTimeString(),
        }));
        setData(formatted.reverse()); // reverse to show oldest -> newest
      });
  }, []);

  return (
    <div className="mt-10 bg-white rounded-2xl p-4 shadow">
      <h2 className="text-xl font-bold mb-4">Sentiment Trend (Score Over Time)</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis domain={[0, 1]} tickFormatter={(v) => `${Math.round(v * 100)}%`} />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="score" stroke="#8884d8" name="Sentiment Score" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SentimentChart;
