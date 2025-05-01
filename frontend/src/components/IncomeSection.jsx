import React from "react";
import Chart from "react-apexcharts";

function IncomeSection() {
  const chartOptions = {
    chart: {
      type: "radialBar",
      offsetY: -10,
      sparkline: {
        enabled: true,
      },
    },
    plotOptions: {
      radialBar: {
        offsetY: 10,
        startAngle: -135,
        endAngle: 225,
        hollow: {
          margin: 0,
          size: "40%",
          background: "transparent",
        },
        track: {
          background: "#f2f2f2",
          strokeWidth: "30%",
        },
        dataLabels: {
          show: true,
          name: {
            show: false,
          },
          value: {
            fontSize: "12px",
            fontWeight: "bold",
            color: "#11263C",
            offsetY: 5,
          },
        },
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "dark",
        type: "horizontal",
        shadeIntensity: 0.5,
        gradientToColors: ["#9333EA"],
        inverseColors: true,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 100],
      },
    },
    stroke: {
      width: 10,
      lineCap: "round",
    },
    labels: ["Income"],
  };

  const chartSeries = [46];

  return (
    <>
      <div className="flex items-center gap-2.5 mb-2 sm:mb-3">
        <h3 className="text-base sm:text-lg font-bold text-[#11263C]">My Income</h3>
        <img src="public/assets/info.svg" alt="Information" className="w-4 sm:w-5" />
      </div>

      <div className="bg-white p-2.5 sm:px-2.5 sm:h-[62px] rounded-lg shadow-[0px_8px_16px_0px_#3232470F,0px_8px_8px_0px_#32324714]">
        <div className="flex flex-col sm:flex-row items-center sm:justify-between h-full gap-2 sm:gap-0">
          <div className="flex items-center gap-3 sm:gap-4.5">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-full relative">
              <Chart
                options={chartOptions}
                series={chartSeries}
                type="radialBar"
                height="100%"
                width="100%"
              />
            </div>
            <div className="text-xs text-[#3C3C4399]">Legend</div>
          </div>
          <div className="text-[10px] text-[#7459D9] sm:mt-0 mt-1">+25%</div>
        </div>
      </div>
    </>
  );
}

export default IncomeSection;
