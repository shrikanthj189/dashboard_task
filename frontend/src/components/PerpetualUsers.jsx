
import React, { useEffect, useState } from "react";
import SharpDonutChart from "./SharpDonutChart";
const apiBaseURL = import.meta.env.VITE_API_URL;

const PerpetualUsers = () => {
  const [perpetualData, setPerpetualData] = useState({
    total_label: 0,
    data: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPerpetualData = async () => {
      try {
        const response = await fetch(
          `${apiBaseURL}/dashboard/perpetual/`,
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
        
        const uniqueData = [];
        const seen = new Set();
        
        data.data.forEach(item => {
          if (!seen.has(item.label)) {
            seen.add(item.label);
            uniqueData.push(item);
          }
        });
        
        setPerpetualData({
          total_label: data.total_label,
          data: uniqueData
        });
      } catch (err) {
        console.error("Error fetching perpetual data:", err);
        setError("Failed to load data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchPerpetualData();
  }, []);

  if (loading) {
    return <div>Loading perpetual users data...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="max-sm:w-full lg:min-w-[460px]">
      <div className="flex items-center gap-2.5">
        <h3 className="text-lg font-bold text-[#11263C]">Perpetual</h3>
        <img src="public/assets/info.svg" alt="Information" />
      </div>
      <div className="flex flex-col items-center sm:items-start">
        <SharpDonutChart 
          perpetualData={perpetualData} 
        />
      </div>
    </div>
  );
};

export default PerpetualUsers;
