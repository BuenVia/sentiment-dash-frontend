const about = `
## What is it?
The *Customer Sentiment Dashboard* is a full-stack application built to demonstrate practical problem-solving through modern AI, data processing, and web technologies. It tackles a common business challenge — understanding customer sentiment — by integrating multiple components into a cohesive analytics pipeline.

## What technologies?
The project features a **Django REST API** backend and a **React** frontend, communicating via RESTful endpoints for efficient data exchange. It employs 
- **Anthropic’s Claude Haiku 4.5** model to generate text.
- **LangChain** to manage the AI functionality.
- **VADER Sentiment Analyzer** for natural language processing and sentiment classification.
- **Recharts** handles interactive data visualization.

This dashboard enables real-time sentiment aggregation and summarization based on customer reviews. Users can input their own feedback or generate synthetic reviews using AI via the “Generate Review” feature, providing both end-user functionality and a test harness for the sentiment analysis workflow.`

export default about