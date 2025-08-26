import { useState } from "react";
import api from "../api";

export default function FeedbackForm({ onFeedbackSubmitted }) {
  const [data, setData] = useState({
    name: "",
    email: "",
    text: ""
  });
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false)

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

  const handleShowForm = () => {
    setShowForm(prevVal => !prevVal)
  }

  return (
    <div className="feedback-form">
    {showForm ? 
    <form onSubmit={handleSubmit} className="card-box p-4">
      <p onClick={handleShowForm} className="show-form">Hide form</p>
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
    : <p onClick={handleShowForm} className="show-form">Click here to leave your feedback</p>}
    </div>
  );
}