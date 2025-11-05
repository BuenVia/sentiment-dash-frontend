
export default function RecentFeedback({ feedback }) {


    const sentimentColors = {
    Positive: "text-positive",
    Negative: "text-negative",
    Neutral: "text-neutral",
    };

  return (
    <>
          <h2 className="text-xl font-bold mt-4 mb-2" style={{ textAlign: "center"}}>All Feedback</h2>
    <div className="card-box p-4">
      <ul className="space-y-2">
        {feedback.map((item) => (
          <li key={item.id} className="feedback-list">
            <div>
            <p className="font-medium">"{item.feedback_text}"</p>
            <p className="text-sm text-gray-500">- {item.name} { item.email ? <span>({item.email})</span> : ""} {new Date(item.created_at).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            })}</p>
            </div>
            <span className={sentimentColors[item.sentiment_label] ?? "text-black"}>{item.sentiment_label}</span>
          </li>
        ))}
      </ul>

    </div>
        </>
  );
}
