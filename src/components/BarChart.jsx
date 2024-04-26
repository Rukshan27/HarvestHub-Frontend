import { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const BarChart = (props) => {
  const { data } = props;

  const [chartData, setChartData] = useState([]);

  const ColumnChartOptions = {
    chart: {
      type: "column",
    },

    credits: {
      enabled: false,
    },
    title: {
      text: null,
    },

    subtitle: {
      text: null,
    },

    legend: {
      enabled: false,
    },
    xAxis: {
      type: "category",
      labels: {
        rotation: -90,
      },
    },
    yAxis: {
      title: {
        text: null,
      },
      min: 0,
    },
    series: [
      {
        data: chartData,
      },
    ],
    plotOptions: {
      column: {
        pointWidth: 40,
        cursor: "pointer",
        dataLabels: {
          enabled: true,
          format: "{point.y:.1f}",
          style: {
            fontSize: "10px",
          },
        },
        showInLegend: {
          lineWidth: 2,
        },
      },
    },

    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 100,
          },
          chartOptions: {
            legend: {
              align: "center",
              verticalAlign: "top",
              layout: "horizontal",
            },
            yAxis: {
              labels: {
                align: "left",
                x: 0,
                y: 0,
              },
              title: {
                text: null,
              },
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
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    fill: {
      opacity: 1,
    },
  };

  const handlePushDataToOptions = () => {
    const _data = [];
    let _total = 0;
    data.forEach((item) => {
      _total += item.count ? Number(item.count) : 0;
    });
    data.forEach((item) => {
      _data.push({
        name: item.name ? item.name : "-",
        y: item.count ? Number(item.count) : 0,
        percentage: (item.count / _total) * 100,
      });
    });
    setChartData(_data);
  };

  useEffect(() => {
    handlePushDataToOptions();
  }, [data]);

  return (
    <>
      {data.length > 0 ? (
        <HighchartsReact highcharts={Highcharts} options={ColumnChartOptions} />
      ) : (
        <div>
          <img
            className="mx-auto my-auto min-w-0 p-24 rounded h-50 overflow-auto "
            src="assets/icons/no-data-sm.png"
            alt="logo"
          />
          <div className="text-center text-black-600 font-bold">
            No Data Available
          </div>
        </div>
      )}
    </>
  );
};
export default BarChart;
