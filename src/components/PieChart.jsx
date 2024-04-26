import { useState, useEffect } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const PieChart = (props) => {
  const { data } = props;

  const [chartData, setChartData] = useState([]);

  const DonutChartOptions = {
    chart: {
      type: "pie",
    },
    credits: {
      enabled: false,
    },
    title: {
      text: null, // This ensures the title is not displayed
    },
    subtitle: {
      text: null,
    },
    plotOptions: {
      pie: {
        dataLabels: {
          enabled: true,
          format: "{point.percentage:.1f}%", // Display only the percentage
          distance: -20,
          backgroundColor: "rgba(255,255,255,0.8)",
          borderRadius: 5,
        },
        series: {
          cursor: "pointer",
          point: {
            events: {},
          },
        },
      },
    },
    series: [
      {
        colorByPoint: true,
        data: chartData,
      },
    ],
    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 400,
          },
          chartOptions: {
            legend: {
              align: "center",
              verticalAlign: "bottom",
              layout: "horizontal",
              itemMarginTop: 5,
            },
            subtitle: {
              text: null,
            },
            credits: {
              enabled: false,
            },
          },
        },
      ],
    },
  };

  const handlePushDataToOptions = () => {
    const _data = [];
    data.forEach((item) => {
      _data.push({
        name: item.name ? item.name : "-",
        y: item.count ? Number(item.count) : 0,
      });
    });
    setChartData(_data);
  };

  useEffect(() => {
    handlePushDataToOptions();
  }, [data]);

  return (
    <>
      {data?.length > 0 ? (
        <HighchartsReact highcharts={Highcharts} options={DonutChartOptions} />
      ) : (
        <div>
          <div className="text-center text-black-600 font-bold">
            No Data Available
          </div>
        </div>
      )}
    </>
  );
};

export default PieChart;
