export default function SentimentDistribution({ distribution }) {
  
  const sentimentColors = {
    Positive: "green",
    Negative: "red",
    Neutral: "gold",
  };
  
  return (
    <div className="card-box card-height p-4">
        <h3>Current Satisfaction Score:</h3>
  
        {distribution.sentiment_distribution.map((item, index) => (
          item.sentiment_label === "Positive" ? <p key={index} style={{ fontSize: "36px", fontWeight: "bold"}}>{(item.count / distribution.total_feedback * 100).toFixed(2)}%</p> : null
        ))}        
        
      <h2 className="text-xl font-bold mb-2">Sentiment Distribution</h2>
      <p>Total Number of Reviews: {distribution.total_feedback}</p>
      <ul className="list-disc ml-4">
        {distribution.sentiment_distribution.map((item, index) => (
          <li key={index} className="sent-list">
            {item.sentiment_label}: <span style={{ color: sentimentColors[item.sentiment_label] ?? "black" }}>{item.count}</span>
          </li>
        ))}

      </ul>
    </div>
  );
}