import { useState } from "react";
import api from "../api";
import Markdown from 'react-markdown'
import LoadingSpinner from "./LoadingSpinner";

export default function Summary() {

    const [summary, setSummary] = useState("")
    const [showSummary, setShowSummary] = useState(false)
    const [loading, setLoading] = useState(false)

    const handleSummary = async () => {
        try {
            setLoading(true)
            console.log("Getting summary");
            const aiRes = await api.get("/feedback-summary/")
            console.log("Response received");
            setSummary(aiRes.data)
            console.log("Completed");
        } catch (err) {
            console.error(err)
        } finally {
            setShowSummary(true)
        }
    }

    return (
    <div className="card-box p-4 card-height">
      <h2 className="text-xl font-bold mb-2" style={{textAlign: "center"}}>Summary</h2>
      {!showSummary ? 
        <div>
            {!loading ? 
            <div style={{textAlign: "center"}}>
                <p>Using Anthropic's Claude Haiku 4.5 model, generate a summary of recent reviews.</p> 
                <button className="btn btn-primary" onClick={handleSummary}>Generate Summary</button>
            </div>
            :
            <LoadingSpinner message={"Calling Claude Haiku 4.5"} />
            }
        </div>
        :
        <div>
            <Markdown>{summary}</Markdown>
            <p>Please note that this summary has been created by AI and therefore there are possible inaccuracies in the response.</p>
        </div>
      }
    </div>
    )
}