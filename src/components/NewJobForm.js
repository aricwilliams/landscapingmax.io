import React, { useState } from "react";

export default function ChatForm() {
  const [landscapingJobId, setLandscapingJobId] = useState("");
  const [senderName, setSenderName] = useState("");
  const [messageText, setMessageText] = useState("");
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    const url = `https://example.com/api/messages/${landscapingJobId}/${senderName}/${messageText}`;

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setMessage(data);
      })
      .catch((error) => {
        setError(error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Landscaping Job ID:
        <input
          type="number"
          value={landscapingJobId}
          onChange={(event) => setLandscapingJobId(event.target.value)}
        />
      </label>
      <label>
        Sender Name:
        <input
          type="text"
          value={senderName}
          onChange={(event) => setSenderName(event.target.value)}
        />
      </label>
      <label>
        Message Text:
        <input
          type="text"
          value={messageText}
          onChange={(event) => setMessageText(event.target.value)}
        />
      </label>
      <button type="submit">Send Message</button>
      {error && <div>Error: {error.message}</div>}
      {message && <div>Message sent successfully</div>}
    </form>
  );
}
