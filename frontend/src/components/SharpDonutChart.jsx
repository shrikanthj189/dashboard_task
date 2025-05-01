import React from 'react';
import Chart from 'react-apexcharts';

const SharpDonutChart = ({ perpetualData }) => {
  const { total_label, data } = perpetualData;
  
  const labels = data.map(item => item.label);
  
  const series = data.map(item => item.user_count);
  
  const colors = ['#8B5CF6', '#A78BFA', '#DDD6FE'];
  
  const options = {
    chart: {
      type: 'donut',
      toolbar: { show: false },
    },
    labels: labels,
    colors: colors,
    legend: { show: false },
    dataLabels: { enabled: false },
    plotOptions: {
      pie: {
        donut: {
          size: '70%',
          labels: { show: false },
        },
        expandOnClick: false,
        startAngle: -90,
        endAngle: 270,
      },
    },
    stroke: {
      width: 6,
      colors: ['#fff'],
      lineCap: 'round',
    },
  };

  const formatUserCount = (count) => {
    return count.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const labelItems = data.map((item, index) => ({
    name: item.label,
    value: `${formatUserCount(item.user_count)} users`,
    color: colors[index % colors.length] 
  }));

  return (
    <div className="flex flex-col sm:flex-row items-center justify-start gap-10 lg:gap-16">
      <div className="relative w-[150px] h-[150px] lg:w-[200px] lg:h-[200px] ml-[-20px]">
        <Chart options={options} series={series} type="donut" height="100%" width="100%" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center z-10">
          <div className="text-base lg:text-xl font-extrabold text-[#11263C]">
            {formatUserCount(total_label)}
          </div>
          <div className="text-sm text-[#D0D1D2] mt-1">Users</div>
        </div>
      </div>
      <div className="space-y-4 lg:space-y-6">
        {labelItems.map((label, idx) => (
          <div key={idx} className="flex items-baseline space-x-3">
            <span
              className="w-7.5 h-1 rounded-full inline-block"
              style={{ backgroundColor: label.color }}
            ></span>
            <div className="flex flex-col">
              <span className="text-sm text-[#D0D1D2]">{label.name}</span>
              <span className="text-sm font-semibold text-[#11263C]">{label.value}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SharpDonutChart;