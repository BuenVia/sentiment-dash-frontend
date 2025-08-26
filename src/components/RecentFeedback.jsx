import { useState } from "react";

export default function RecentFeedback({ feedback }) {
  const [showAll, setShowAll] = useState(false);

  // Show the last 3 if not expanded, otherwise show all
  const displayedFeedback = showAll ? feedback : feedback.slice(0, 3);

    const sentimentColors = {
    Positive: "text-positive",
    Negative: "text-negative",
    Neutral: "text-neutral",
    };

  return (
    <div className="card-box p-4">
      <h2 className="text-xl font-bold mb-2">Recent Feedback</h2>
      <ul className="space-y-2">
        {displayedFeedback.map((item) => (
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

      {/* Only show button if there are more than 3 items */}
      {feedback.length > 3 && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="btn btn-secondary"
        >
          {showAll ? "Show Less" : "Show More"}
        </button>
      )}
    </div>
  );
}
