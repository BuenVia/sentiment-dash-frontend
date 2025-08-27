import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from "recharts";

export default function SentimentChart({ data }) {

  return (
    <div className="p-4 card-box card-height">
      <h2 className="text-xl font-bold mb-2">Sentiment of Reviews by Date</h2>

      <LineChart width={600} height={300} data={data}>
        <CartesianGrid stroke="#ccc" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="Positive" stroke="#22c55e" />
        <Line type="monotone" dataKey="Negative" stroke="#ef4444" />
        <Line type="monotone" dataKey="Neutral" stroke="#3b82f6" />
      </LineChart>
    
    </div>
  );
}