import { useState } from "react";
import api from "../api";
import LoadingSpinner from "./LoadingSpinner";

export default function FeedbackForm({ onFeedbackSubmitted }) {
  const [data, setData] = useState({
    name: "",
    email: "",
    text: ""
  });
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(true)

  const handleChange = (e) => {
    const { name, value } = e.target
    setData(prevVals => {
        return {
            ...prevVals,
            [name]: value
        }
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!data.text.trim()) return;

    setLoading(true);
    try {
    const payload = { name: data.name, email: data.email, feedback_text: data.text }
      const res = await api.post("/feedback/", payload);
      setData({
        name: "",
        email: "",
        text: ""
      });
      onFeedbackSubmitted(res.data); // send new feedback object up
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
      setShowForm(false)
    }
  };



  const generateAiFeedback = async () => {
    try {
      setLoading(true)
      console.log("Getting feedback");
      const aiRes = await api.get("/feedback-ai/")
      console.log("Response received");
      onFeedbackSubmitted(aiRes.data); // send new feedback object up
      console.log("Completed");
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(true);
      setShowForm(false)
    }
  }

  return (
    <div className="row card-box p-4">

      {showForm ? 
      <>
        {loading ? <LoadingSpinner message={"Generating review"} /> : 
        <>
      <div className="col">
        <h3>Generate AI feedback</h3>
        <img src="./assets/claude.svg" alt="Claude" style={{ height: "30px", margin: "1em" }}></img>
        <img src="./assets/langchain.svg" alt="langchain" style={{ height: "30px", margin: "1em" }}></img>
        <p>This review will be created using Anthropic's Claude Haiku 4.5 model and Langchain.</p>
        <p>Please allow up to 60 seconds for this to be generated. The reviews below should update automatically once complete.</p>
        <button className="btn btn-primary" onClick={generateAiFeedback}>Generate</button>

      </div>
      <div className="col">
        <form onSubmit={handleSubmit}>
          <h3>Write your own feedback</h3>
            <div className="form-cont">
              <label htmlFor="name" className="form-label">Name *</label>
                <input
                    type="text"
                    name="name"
                    onChange={handleChange}
                    value={data.name}
                    placeholder="Name..."
                    className="form-control"
                    required
                />
            </div>

            <div className="form-cont">
              <label htmlFor="name" className="form-label">Email (optional)</label>
                <input
                    type="text"
                    name="email"
                    onChange={handleChange}
                    value={data.email}
                    placeholder="Email..."
                    className="form-control"
                />
            </div>
            
            <div className="form-cont">
              <label htmlFor="text" className="form-label">Please leave a review (max 250 chars) *</label>
                <textarea
                    type="text"
                    name="text"
                    onChange={handleChange}
                    value={data.text}
                    placeholder="Leave your feedback..."
                    className="form-control"
                    maxLength={250}
                    required
                />
            </div>
          
            <button type="submit" disabled={loading} className="btn btn-success">{loading ? "Submitting..." : "Submit"}</button>
        </form>
      </div>
        </>}
      </>
      : <a href="/feedback" className="btn btn-success">Review all feedback</a>
      }
    </div>

  );
}