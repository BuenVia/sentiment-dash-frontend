import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";

export default function SentimentChart({ data }) {
  return (
    <div className="p-4 card-box card-height">
      <h2 className="text-xl font-bold mb-2">Sentiment Trend Over Time</h2>
      <LineChart width={600} height={300} data={data}>
        <Line type="monotone" dataKey="count" stroke="#8884d8" />
        <CartesianGrid stroke="#ccc" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
      </LineChart>
    </div>
  );
}