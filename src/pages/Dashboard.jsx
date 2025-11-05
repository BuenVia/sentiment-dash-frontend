import { useEffect, useState } from "react";
import api from "../api";
import SentimentChart from "../components/SentimentChart";
import SentimentDistribution from "../components/SentimentDistribution";
import FeedbackForm from "../components/FeedbackForm";
import RecentFeedback from "../components/RecentFeedback";
import LoadingSpinner from "../components/LoadingSpinner";
import Summary from "../components/Summary";

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
    return <LoadingSpinner message={"This may take a moment whilst the backend wakes up..."}/>;
  }

  return (
    <div className="bg-container">
      <div className="row p-4">
        <div>

        <p>Customer Sentiment Dashboard

The Customer Sentiment Dashboard is a full-stack application built to demonstrate practical problem-solving through modern AI, data processing, and web technologies. It tackles a common business challenge — understanding customer sentiment — by integrating multiple components into a cohesive analytics pipeline.

The project features a Django REST API backend and a React frontend, communicating via RESTful endpoints for efficient data exchange. It employs Anthropic’s Claude Haiku 4.5, LangChain, and VADER Sentiment Analyzer for natural language processing and sentiment classification, while Recharts handles interactive data visualization.

This dashboard enables real-time sentiment aggregation and summarization based on customer reviews. Users can input their own feedback or generate synthetic reviews using AI via the “Generate Review” feature, providing both end-user functionality and a test harness for the sentiment analysis workflow. </p>
      </div>
        </div>
      <FeedbackForm onFeedbackSubmitted={handleNewFeedback} />


      {stats && (
        <div className="row pb-5">
          <div className="col">
          <Summary />
        </div>
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
