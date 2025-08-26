import { useEffect, useState } from "react";
import api from "../api";
import SentimentChart from "../components/SentimentChart";
import SentimentDistribution from "../components/SentimentDistribution";
import FeedbackForm from "../components/FeedbackForm";
import RecentFeedback from "../components/RecentFeedback";

export default function Dashboard() {
  const [feedback, setFeedback] = useState([]);
  const [stats, setStats] = useState(null);

  const fetchData = async () => {
    try {
      const feedbackRes = await api.get("/feedback/");
      setFeedback(feedbackRes.data);

      const statsRes = await api.get("/stats/");
      setStats(statsRes.data);
    } catch (err) {
      console.error(err);
    }
  };

  // called when new feedback is created
  const handleNewFeedback = async (newItem) => {
    setFeedback((prev) => [newItem, ...prev]); // prepend to list
    // also refresh stats so charts update
    const statsRes = await api.get("/stats/");
    setStats(statsRes.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="bg-container">
      <FeedbackForm onFeedbackSubmitted={handleNewFeedback} />

      {stats && (
        <>
        <div className="row pb-5">
          <div className="col">
            <SentimentDistribution distribution={stats} />
          </div>
          <div className="col">
            <SentimentChart data={stats.trend_over_time} />
          </div>
        </div>
        </>
      )}

      <div className="row pb-3">
        <div className="col">
          <RecentFeedback feedback={feedback} />
        </div>
      </div>
    </div>
  );
}