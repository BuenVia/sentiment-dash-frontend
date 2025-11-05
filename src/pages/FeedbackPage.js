import { useEffect, useState } from "react";
import RecentFeedback from "../components/RecentFeedback"
import api from "../api";
import LoadingSpinner from "../components/LoadingSpinner";

const RecentFeedbackPage = () => {

    const [feedback, setFeedback] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        try {
            const [feedbackRes] = await Promise.all([
            api.get("/feedback/"),
            ]);

            setFeedback(feedbackRes.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (<>{loading ? <LoadingSpinner message={"Contacting database."} /> : <RecentFeedback feedback={feedback} />}</>)
}

export default RecentFeedbackPage