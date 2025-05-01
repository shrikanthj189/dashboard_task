import React, { useState, useEffect } from "react";
import ProgressBar from "./ProgressBar";

const apiBaseURL = import.meta.env.VITE_API_URL;

const ActiveUsers = () => {
  const [activeData, setActiveData] = useState({
    total: 0,
    online: 0,
    offline: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchActiveData = async () => {
      try {
        const response = await fetch(
          `${apiBaseURL}/dashboard/active/`,
          {
            headers: {
              "Ngrok-Skip-Browser-Warning": "true"
            }
          }
        );
        
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        
        const data = await response.json();
        setActiveData({
          total: data.total,
          online: data.online,
          offline: data.offline
        });
      } catch (err) {
        console.error("Error fetching active users data:", err);
        setError("Failed to load data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchActiveData();
  }, []);

  const onlinePercentage = activeData.total > 0 
    ? Math.round((activeData.online / activeData.total) * 100) 
    : 0;

  const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const labels = [
    { 
      name: "Online", 
      value: `${formatNumber(activeData.online)} users`, 
      color: "#7459D9" 
    },
    { 
      name: "Offline", 
      value: `${formatNumber(activeData.offline)} users`, 
      color: "#7459D933" 
    },
  ];

  if (loading) {
    return <div>Loading active users data...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="space-y-5 flex-1">
      <div className="flex items-center gap-2.5">
        <h3 className="text-lg font-bold text-[#11263C]">Active Percentage</h3>
        <img src="public/assets/info.svg" alt="Information" />
      </div>
      
      <div className="flex flex-col items-start justify-center gap-5 min-h-[175px]">
        <div className="flex items-center gap-3 text-3xl font-bold text-[#11263C]">
          {formatNumber(activeData.total)}
          <div className="text-sm text-[#D0D1D2] font-normal">Total</div>
        </div>
        
        <ProgressBar value={onlinePercentage} />
        
        <div className="flex space-x-12">
          {labels.map((label, idx) => (
            <div key={idx} className="flex items-center space-x-3">
              <div className="flex items-baseline space-x-3">
                <span
                  className="w-7.5 h-1 rounded-full inline-block"
                  style={{ backgroundColor: label.color }}
                ></span>
                <div className="flex flex-col">
                  <span className="text-sm text-[#D0D1D2]">{label.name}</span>
                  <span className="text-sm font-semibold text-[#11263C]">
                    {label.value}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ActiveUsers;