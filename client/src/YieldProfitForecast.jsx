import React, { useEffect, useRef, useState } from "react";
import "./style.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import PageTransition from "./components/PageTransition";
import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";

Chart.register(
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Filler,
  Tooltip,
  Legend
);

const YieldProfitForecast = () => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);
  const [isRecalculating, setIsRecalculating] = useState(false);

  useEffect(() => {
    if (!chartRef.current) return;

    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    const ctx = chartRef.current.getContext("2d");

    chartInstanceRef.current = new Chart(ctx, {
      type: "line",
      data: {
        labels: [
          "Week 1",
          "Week 2",
          "Week 3",
          "Week 4",
          "Week 5",
          "Week 6",
          "Projected",
        ],
        datasets: [
          {
            label: "Dry Matter Accumulation (lb/ac)",
            data: [420, 850, 1400, 2100, 2900, 3800, 4800],
            borderColor: "#2e7d32",
            backgroundColor: "rgba(46, 125, 50, 0.1)",
            fill: true,
            tension: 0.4,
            borderWidth: 3,
            pointBackgroundColor: "#1a3c5e",
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false },
        },
        scales: {
          y: { 
            beginAtZero: true,
            grid: { color: "rgba(0,0,0,0.05)" }
          },
          x: { 
            grid: { display: false } 
          },
        },
      },
    });

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, []);

  return (
    <PageTransition>
      <Header />
      <style>{`
        .yield-hero-section {
          padding: 160px 0 80px;
          background: linear-gradient(rgba(26, 60, 94, 0.9), rgba(46, 125, 50, 0.9)), url('https://images.unsplash.com/photo-1598514982846-3a1d59eaa1f2?auto=format&fit=crop&w=1600&q=80');
          background-size: cover;
          background-position: center;
          color: white;
          text-align: center;
        }

        .stats-floating-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 1.5rem;
          margin-top: -60px;
          position: relative;
          z-index: 10;
        }

        .value-card {
          background: white;
          border-radius: 25px;
          padding: 2.5rem;
          box-shadow: var(--shadow-md);
          text-align: center;
          border-bottom: 5px solid var(--accent);
          transition: 0.3s;
        }

        .value-card:hover {
          transform: translateY(-5px);
          box-shadow: var(--shadow-lg);
        }

        .value-card i {
          font-size: 2.2rem;
          color: var(--secondary);
          margin-bottom: 1.5rem;
          display: block;
        }

        .forecast-grid {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 2.5rem;
          margin-top: 60px;
        }

        .chart-card-wrapper {
          background: white;
          border-radius: 30px;
          padding: 3rem;
          box-shadow: var(--shadow-md);
          border: 1px solid rgba(0,0,0,0.05);
        }

        .market-intel-card {
          background: var(--primary);
          color: white;
          padding: 3rem;
          border-radius: 30px;
          box-shadow: var(--shadow-lg);
        }

        .intel-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.2rem 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .intel-item:last-child {
          border-bottom: none;
        }

        @media (max-width: 1024px) {
          .forecast-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <section className="yield-hero-section">
        <div className="container">
          <span className="badge" style={{ background: "rgba(255,255,255,0.2)", color: "white", marginBottom: "1.5rem" }}>Financial Foresight</span>
          <h1 style={{ fontSize: "3.5rem", marginBottom: "1rem" }}>Yield & Profit Projections</h1>
          <p style={{ fontSize: "1.2rem", maxWidth: "800px", margin: "0 auto", opacity: 0.9 }}>
            Maximizing agricultural ROI through precision harvesting analytics and global market intelligence.
          </p>
        </div>
      </section>

      <main className="section">
        <div className="container">
          <div className="stats-floating-grid">
            <div className="value-card">
              <i className="fas fa-chart-line"></i>
              <h3 style={{ fontSize: "0.85rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "0.8rem" }}>Est. Harvest</h3>
              <div style={{ fontSize: "2.2rem", fontWeight: 800, color: "var(--primary)" }}>4.8 Tons/Ha</div>
              <p style={{ color: "var(--accent)", fontSize: "0.85rem", marginTop: "0.8rem", fontWeight: 600 }}>
                <i className="fas fa-caret-up"></i> 12% above regional avg
              </p>
            </div>

            <div className="value-card">
              <i className="fas fa-coins"></i>
              <h3 style={{ fontSize: "0.85rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "0.8rem" }}>Projected Revenue</h3>
              <div style={{ fontSize: "2.2rem", fontWeight: 800, color: "var(--primary)" }}>₹1,02,000</div>
              <p style={{ color: "var(--accent)", fontSize: "0.85rem", marginTop: "0.8rem", fontWeight: 600 }}>
                <i className="fas fa-caret-up"></i> 8% improvement MoM
              </p>
            </div>

            <div className="value-card">
              <i className="fas fa-hand-holding-usd"></i>
              <h3 style={{ fontSize: "0.85rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "0.8rem" }}>Est. Net Profit</h3>
              <div style={{ fontSize: "2.2rem", fontWeight: 800, color: "var(--primary)" }}>₹64,500</div>
              <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", marginTop: "0.8rem" }}>
                Pure margin after all costs
              </p>
            </div>

            <div className="value-card">
              <i className="fas fa-calendar-alt"></i>
              <h3 style={{ fontSize: "0.85rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "0.8rem" }}>Days to Harvest</h3>
              <div style={{ fontSize: "2.2rem", fontWeight: 800, color: "var(--primary)" }}>42 Days</div>
              <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", marginTop: "0.8rem" }}>
                ETA: mid-May 2026
              </p>
            </div>
          </div>

          <div className="forecast-grid">
            <div className="chart-card-wrapper">
              <h2 style={{ marginBottom: "2rem", color: "var(--primary)", fontSize: "1.8rem" }}>
                Yield Growth Trend
              </h2>
              <canvas ref={chartRef} height="150"></canvas>
            </div>

            <div className="market-intel-card">
              <h3 style={{ marginBottom: "2rem", fontSize: "1.5rem", borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: "1rem" }}>Market Intelligence</h3>

              <div className="intel-item">
                <span>Wheat (A-Grade)</span>
                <span style={{ color: "var(--accent)", fontWeight: 700 }}>₹2,150 <i className="fas fa-arrow-up"></i></span>
              </div>

              <div className="intel-item">
                <span>Rice (Basmati)</span>
                <span style={{ color: "var(--accent)", fontWeight: 700 }}>₹3,400 <i className="fas fa-arrow-up"></i></span>
              </div>

              <div className="intel-item">
                <span>Maize</span>
                <span style={{ color: "#f87171", fontWeight: 700 }}>₹1,920 <i className="fas fa-arrow-down"></i></span>
              </div>

              <div className="intel-item">
                <span>Soybeans</span>
                <span style={{ color: "var(--accent)", fontWeight: 700 }}>₹4,250 <i className="fas fa-arrow-up"></i></span>
              </div>

              <div style={{ marginTop: "2.5rem", padding: "1.5rem", background: "rgba(255,255,255,0.05)", borderRadius: "20px", border: "1px solid rgba(255,255,255,0.1)" }}>
                <h4 style={{ color: "var(--accent)", marginBottom: "0.8rem", textTransform: "uppercase", fontSize: "0.8rem", letterSpacing: "1px" }}>AI Predictive Insight</h4>
                <p style={{ fontSize: "0.9rem", opacity: 0.8, lineHeight: 1.6 }}>
                  Global demand for premium wheat is expected to peak in 6 weeks. High probability of price surge. Align harvest schedule for maximum ROI.
                </p>
              </div>
              
              <button 
                className="btn btn-primary" 
                style={{ width: "100%", marginTop: "1.5rem", background: "white", color: "var(--primary)", border: "none" }}
                onClick={() => {
                  setIsRecalculating(true);
                  setTimeout(() => {
                    setIsRecalculating(false);
                    alert('Projections have been updated based on the latest live commodities data.');
                  }, 1500);
                }}
                disabled={isRecalculating}
              >
                {isRecalculating ? (
                  <span><i className="fas fa-spinner fa-spin"></i> Recalculating...</span>
                ) : (
                  "Recalculate Projections"
                )}
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </PageTransition>
  );
};

export default YieldProfitForecast;