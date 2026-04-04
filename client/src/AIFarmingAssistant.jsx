import React, { useState } from "react";
import "./style.css";
import Header from "./components/Header";
import PageTransition from "./components/PageTransition";

const AIFarmingAssistant = () => {
  const [messages, setMessages] = useState([
    {
      text: "Hello! I'm your Agri-Nova assistant. How can I help you optimize your farm today?",
      sender: "ai",
    },
  ]);
  const [userInput, setUserInput] = useState("");
  const [typing, setTyping] = useState(false);

  const chips = [
    "Wheat sowing time?",
    "Treat rice pests?",
    "Soil pH 6.5?",
    "Market rates",
  ];

  const getAIResponse = (query) => {
    const q = query.toLowerCase();
    if (q.includes("wheat")) return "For most regions, the ideal wheat sowing window is between mid-October and mid-November. Ensure your soil moisture is around 70% for best germination.";
    if (q.includes("price") || q.includes("rate")) return "Top market rates today: Wheat: ₹2,125/quintal, Rice: ₹1,940/quintal. Prices are steady with a slight upward trend in local mandis.";
    if (q.includes("pest")) return "Rice blast and stem borer are common this season. I recommend checking for spindle-shaped spots on leaves. Early treatment with copper oxychloride is effective.";
    if (q.includes("soil")) return "A pH of 6.0 to 7.0 is ideal for most cereal crops. If your pH is 6.5, your soil is in excellent condition for nutrient uptake!";
    return "That's a great question. Based on current environmental data, I recommend monitoring your field's moisture levels and checking for any early signs of nitrogen deficiency.";
  };

  const handleSendMessage = (text) => {
    const trimmedText = text.trim();
    if (!trimmedText) return;
    setMessages((prev) => [...prev, { text: trimmedText, sender: "user" }]);
    setUserInput("");
    setTyping(true);
    setTimeout(() => {
      const aiReply = getAIResponse(trimmedText);
      setTyping(false);
      setMessages((prev) => [...prev, { text: aiReply, sender: "ai" }]);
    }, 1500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSendMessage(userInput);
  };

  return (
    <PageTransition>
      <Header />
      <style>{`
        .assistant-bg {
          min-height: 100vh;
          background: linear-gradient(rgba(26, 60, 94, 0.9), rgba(46, 125, 50, 0.8)), url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1600&q=80');
          background-size: cover;
          background-position: center;
          padding-top: 100px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .chat-container {
          display: grid;
          grid-template-columns: 300px 1fr;
          height: calc(100vh - 140px);
          width: 95%;
          max-width: 1400px;
          gap: 1.5rem;
        }

        .chat-sidebar-glass {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(15px);
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 25px;
          padding: 2rem;
          color: white;
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .chat-main-glass {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 25px;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        .chat-history {
          flex: 1;
          padding: 2rem;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .msg {
          max-width: 75%;
          padding: 1rem 1.5rem;
          border-radius: 20px;
          font-size: 1rem;
          line-height: 1.6;
          animation: slideUp 0.3s ease;
        }

        @keyframes slideUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .msg-ai {
          align-self: flex-start;
          background: rgba(255, 255, 255, 0.95);
          color: var(--primary);
          border-bottom-left-radius: 5px;
        }

        .msg-user {
          align-self: flex-end;
          background: var(--grad-green);
          color: white;
          border-bottom-right-radius: 5px;
        }

        .chat-controls {
          padding: 1.5rem 2rem;
          background: rgba(0, 0, 0, 0.2);
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }

        .chip-scroll {
          display: flex;
          gap: 0.8rem;
          margin-bottom: 1.2rem;
          overflow-x: auto;
          padding-bottom: 5px;
        }

        .ai-chip {
          background: rgba(255, 255, 255, 0.1);
          color: white;
          padding: 0.6rem 1.2rem;
          border-radius: 50px;
          font-size: 0.85rem;
          white-space: nowrap;
          cursor: pointer;
          transition: 0.3s;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .ai-chip:hover {
          background: var(--secondary);
          transform: translateY(-2px);
        }

        .chat-input-field {
          flex: 1;
          background: rgba(255, 255, 255, 0.12);
          border: 1px solid rgba(255, 255, 255, 0.2);
          padding: 1rem 1.8rem;
          border-radius: 30px;
          color: white;
          outline: none;
          font-size: 1rem;
        }

        @media (max-width: 992px) {
          .chat-container { grid-template-columns: 1fr; }
          .chat-sidebar-glass { display: none; }
        }
      `}</style>

      <div className="assistant-bg">
        <main className="chat-container">
          <aside className="chat-sidebar-glass">
            <div style={{ textAlign: "center" }}>
              <div style={{ width: "80px", height: "80px", background: "var(--grad-blue)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.5rem", fontSize: "2.5rem", color: "white" }}>
                <i className="fas fa-robot"></i>
              </div>
              <h2 style={{ fontSize: "1.6rem", color: "white" }}>Agri-Nova AI</h2>
              <p style={{ fontSize: "0.9rem", color: "var(--accent)", fontWeight: 500 }}>Global Expert System</p>
            </div>

            <div style={{ background: "rgba(255,255,255,0.05)", padding: "1.5rem", borderRadius: "15px" }}>
              <h3 style={{ fontSize: "1.1rem", marginBottom: "1rem" }}><i className="fas fa-magic"></i> IQ Engine</h3>
              <ul style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.7)", listStyle: "none", display: "grid", gap: "0.8rem" }}>
                <li><i className="fas fa-check" style={{ color: "var(--accent)", marginRight: "8px" }}></i> Plant Pathology</li>
                <li><i className="fas fa-check" style={{ color: "var(--accent)", marginRight: "8px" }}></i> Soil Chemistry</li>
                <li><i className="fas fa-check" style={{ color: "var(--accent)", marginRight: "8px" }}></i> Market Analytics</li>
              </ul>
            </div>

            <div style={{ marginTop: "auto", borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "1.5rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "0.9rem" }}>
                <div style={{ width: "10px", height: "10px", background: "#4caf50", borderRadius: "50%", boxShadow: "0 0 10px #4caf50" }}></div>
                <span>Neural Core Online</span>
              </div>
              <small style={{ opacity: 0.5, marginTop: "0.5rem", display: "block" }}>Security Level: Encrypted E2E</small>
            </div>
          </aside>

          <section className="chat-main-glass">
            <div className="chat-history">
              {messages.map((message, index) => (
                <div key={index} className={`msg msg-${message.sender}`}>
                  {message.text}
                </div>
              ))}
              {typing && (
                <div style={{ fontStyle: "italic", fontSize: "0.85rem", color: "rgba(255,255,255,0.7)", alignSelf: "flex-start", marginLeft: "10px" }}>
                  Assistant is processing...
                </div>
              )}
            </div>

            <div className="chat-controls">
              <div className="chip-scroll">
                {chips.map((chip, index) => (
                  <div key={index} className="ai-chip" onClick={() => handleSendMessage(chip)}>
                    {chip}
                  </div>
                ))}
              </div>

              <form style={{ display: "flex", gap: "1rem" }} onSubmit={handleSubmit}>
                <input
                  type="text"
                  className="chat-input-field"
                  placeholder="Inquire about your crops, soil, or market..."
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                />
                <button type="submit" className="btn btn-primary" style={{ width: "50px", height: "50px", borderRadius: "50%", padding: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <i className="fas fa-paper-plane"></i>
                </button>
              </form>
            </div>
          </section>
        </main>
      </div>
    </PageTransition>
  );
};

export default AIFarmingAssistant;