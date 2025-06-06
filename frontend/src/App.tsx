import React from "react";
import SentimentChecker from "./components/SentimentChecker";
import SentimentLogList from './components/SentimentLogList';
import SentimentChart from "./components/SentimentChart";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <SentimentChecker />
      <SentimentChart />
      <sentimentLogList />
    </div>
  );
}

export default App;
