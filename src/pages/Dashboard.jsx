import { useEffect, useState } from "react";
import api from "../api";
import SentimentChart from "../components/SentimentChart";
import SentimentDistribution from "../components/SentimentDistribution";
import FeedbackForm from "../components/FeedbackForm";
import RecentFeedback from "../components/RecentFeedback";
import LoadingSpinner from "../components/LoadingSpinner";

export default function Dashboard() {
  const [feedback, setFeedback] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const [feedbackRes, statsRes] = await Promise.all([
        api.get("/feedback/"),
        api.get("/stats/"),
      ]);

      setFeedback(feedbackRes.data);
      setStats(statsRes.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const transformTrendData = (trend) => {
    const grouped = {};

    trend.forEach((item) => {
      const { date, sentiment_label, count } = item;
      if (!grouped[date]) {
        grouped[date] = { date };
      }
      grouped[date][sentiment_label] = count;
    });

    return Object.values(grouped);
  };

  const handleNewFeedback = async (newItem) => {
    setFeedback((prev) => [newItem, ...prev]);
    try {
      const statsRes = await api.get("/stats/");
      setStats(statsRes.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="bg-container">
      <FeedbackForm onFeedbackSubmitted={handleNewFeedback} />

      {stats && (
        <div className="row pb-5">
          <div className="col">
            <SentimentDistribution distribution={stats} />
          </div>
          <div className="col">
            <SentimentChart data={transformTrendData(stats.trend_over_time)} />
          </div>
        </div>
      )}

      <div className="row pb-3">
        <div className="col">
          <RecentFeedback feedback={feedback} />
        </div>
      </div>
    </div>
  );
}
