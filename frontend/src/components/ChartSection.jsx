import React, { useState, useEffect, useMemo } from "react";
import Chart from "react-apexcharts";
import Breadcrumbs from "./Breadcrumbs";

const ChartSection = () => {
  const [selectedMonth, setSelectedMonth] = useState("2021-12");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [allData, setAllData] = useState(null);
  const [dataByMonth, setDataByMonth] = useState({});
  const [availableYears, setAvailableYears] = useState(["2020", "2021"]);

  const getMonthKeyFromDate = (dateStr) => {
    const [year, month] = dateStr.split('-');
    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    const monthName = monthNames[parseInt(month) - 1];
    return `${monthName} ${year}`;
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        try {
          const fileData = await window.fs.readFile('paste.txt', { encoding: 'utf8' });
          const data = JSON.parse(fileData);
          
          const years = [...new Set(data.map(item => item.date.split('-')[0]))].sort();
          setAvailableYears(years);
          
          setAllData(data);
          return;
        } catch (fileError) {
          console.log("Could not read from file, trying API instead:", fileError);
        }
        
        const response = await fetch(
          "https://df3a-2401-4900-8821-e06e-df72-6b72-2683-4f6a.ngrok-free.app/dashboard/visits/",
          {
            headers: {
              "Ngrok-Skip-Browser-Warning": "true"
            }
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch data from API");
        }

        const data = await response.json();
        const parsedData = Array.isArray(data) ? data : [data];
        
        const years = [...new Set(parsedData.map(item => item.date.split('-')[0]))].sort();
        setAvailableYears(years);
        
        setAllData(parsedData);
        
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); 

  useEffect(() => {
    if (!allData) return;
    
    const processedDataByMonth = {};
    allData.forEach(item => {
      if (item.date) {
        let month;
        if (item.month) {
          month = item.month; 
        } else {
          const dateParts = item.date.split('-');
          const year = dateParts[0];
          const monthNum = parseInt(dateParts[1]);
          const monthNames = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
          ];
          month = `${monthNames[monthNum - 1]} ${year}`;
        }
        
        if (!processedDataByMonth[month]) {
          processedDataByMonth[month] = [];
        }
        
        const day = parseInt(item.date.split('-')[2]);
        processedDataByMonth[month].push({
          day,
          visit_count: item.visit_count
        });
      }
    });
    
    Object.keys(processedDataByMonth).forEach(month => {
      processedDataByMonth[month].sort((a, b) => a.day - b.day);
    });
    
    setDataByMonth(processedDataByMonth);
  }, [allData]);

  const prepareChartData = (selectedMonth, dataByMonth) => {
    const currentMonthKey = getMonthKeyFromDate(selectedMonth);
    
    let [year, month] = selectedMonth.split('-').map(num => parseInt(num));
    let prevMonth = month - 1;
    let prevYear = year;
    if (prevMonth === 0) {
      prevMonth = 12;
      prevYear -= 1;
    }
    const prevMonthStr = prevMonth.toString().padStart(2, '0');
    const previousMonthKey = getMonthKeyFromDate(`${prevYear}-${prevMonthStr}`);
    
    const currentMonthData = dataByMonth[currentMonthKey] || [];
    currentMonthData.sort((a, b) => a.day - b.day);
    
    const previousMonthData = dataByMonth[previousMonthKey] || [];
    previousMonthData.sort((a, b) => a.day - b.day);
    
    return {
      currentMonth: getSelectedDaysData(currentMonthData),
      previousMonth: getSelectedDaysData(previousMonthData)
    };
  };

  const getSelectedDaysData = (monthData) => {
    const selectedDays = [1, 5, 10, 15, 20, 25, 30];
    const result = [];
    
    for (const targetDay of selectedDays) {
      const dayData = monthData.find(d => d.day === targetDay) || 
                    monthData.reduce((closest, current) => {
                      return Math.abs(current.day - targetDay) < Math.abs(closest.day - targetDay) 
                            ? current : closest;
                    }, { day: 0, visit_count: 0 });
      
      result.push(dayData.visit_count);
    }
    
    return result;
  };

  const options = {
    chart: { id: "visits-chart", toolbar: { show: false } },
    colors: ["#422F8ADE", "#7459D91A"],
    xaxis: { categories: ["1", "5", "10", "15", "20", "25", "30"] },
    stroke: { curve: "smooth" },
    tooltip: {
      shared: false,
      style: { fontSize: "12px", fontFamily: "inherit" },
      theme: "light",
      custom: function ({ series, seriesIndex, dataPointIndex, w }) {
        return `
          <div style="background: #F8F9FE; padding: 8px 12px; border-radius: 8px; color: #422F8A;">
            <strong>${w.globals.seriesNames[seriesIndex]}</strong><br/>
            ${series[seriesIndex][dataPointIndex]}
          </div>
        `;
      },
    },
    legend: { show: false },
  };

  const chartData = useMemo(() => {
    if (Object.keys(dataByMonth).length === 0) {
      return {
        currentMonth: [0, 0, 0, 0, 0, 0, 0],
        previousMonth: [0, 0, 0, 0, 0, 0, 0]
      };
    }
    
    return prepareChartData(selectedMonth, dataByMonth);
  }, [selectedMonth, dataByMonth]);
  
  const series = [
    { name: "This Month", data: chartData.currentMonth },
    { name: "Previous Month", data: chartData.previousMonth },
  ];

  const currentMonthName = getMonthKeyFromDate(selectedMonth);

  if (loading) {
    return <div className="md:p-4">Loading chart data...</div>;
  }

  if (error) {
    return <div className="md:p-4 text-red-500">{error}</div>;
  }

  return (
    <div className="md:p-4">
      <Breadcrumbs options={[{ path: "/BITFOREX.COM", label: "BITFOREX.COM" }]} />

      <div className="flex flex-wrap items-center space-x-0 sm:space-x-5 mt-4 gap-4 sm:gap-0">
        <img
          src="public/assets/dashboard.svg"
          alt="profile"
          className="rounded-2xl size-[45px]"
        />
        <h2 className="text-base md:text-2xl text-[#11263C] font-bold">Dashboard design</h2>
        <button className="cursor-pointer size-[45px] bg-[#F8F9FE] text-[#422F8ADE] text-2xl px-2 rounded-full">
          +
        </button>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mt-6 gap-4">
        <div className="flex items-center gap-2.5">
          <h3 className="text-lg font-bold text-[#11263C]">Total Visits</h3>
          <img src="public/assets/info.svg" alt="Information" />
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-center gap-4 sm:gap-7.5">
          <div className="w-full sm:w-[61px] h-1 bg-[#ECE9F1] rounded-2xl"></div>

          <span className="text-[#D0D1D2] text-xs font-medium whitespace-nowrap">
            {getMonthKeyFromDate(selectedMonth).split(" ")[0]}
          </span>

          <div className="relative w-full sm:w-auto flex items-center gap-2">
            <select
              value={selectedMonth.split('-')[1]}
              onChange={(e) => {
                const year = selectedMonth.split('-')[0];
                const newMonth = e.target.value.padStart(2, '0');
                setSelectedMonth(`${year}-${newMonth}`);
              }}
              className="border leading-none border-[#ECE9F1] text-[#11263C] text-sm rounded p-1.5 cursor-pointer"
            >
              <option value="01">January</option>
              <option value="02">February</option>
              <option value="03">March</option>
              <option value="04">April</option>
              <option value="05">May</option>
              <option value="06">June</option>
              <option value="07">July</option>
              <option value="08">August</option>
              <option value="09">September</option>
              <option value="10">October</option>
              <option value="11">November</option>
              <option value="12">December</option>
            </select>
            
            <select
              value={selectedMonth.split('-')[0]}
              onChange={(e) => {
                const month = selectedMonth.split('-')[1];
                setSelectedMonth(`${e.target.value}-${month}`);
              }}
              className="border leading-none border-[#ECE9F1] text-[#11263C] text-sm rounded p-1.5 cursor-pointer"
            >
              {availableYears.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>

          <div className="size-4">
            <img
              src="public/assets/more-horizontal.svg"
              alt="more-horizontal"
              className="size-4 cursor-pointer"
            />
          </div>
        </div>
      </div>

      <Chart options={options} series={series} type="line" height={277} />
    </div>
  );
};

export default ChartSection;