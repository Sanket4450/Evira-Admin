import React from "react";
import ReactApexChart from "react-apexcharts";

const getChartColorsArray = (colors) => {
  colors = JSON.parse(colors);
  return colors.map(function (value) {
      var newValue = value.replace(" ", "");
      if (newValue.indexOf(",") === -1) {
          var color = getComputedStyle(document.documentElement).getPropertyValue(newValue);

          if (color.indexOf("#") !== -1)
              color = color.replace(" ", "");
          if (color) return color;
          else return newValue;
      } else {
          var val = value.split(',');
          if (val.length === 2) {
              var rgbaColor = getComputedStyle(document.documentElement).getPropertyValue(val[0]);
              rgbaColor = "rgba(" + rgbaColor + "," + val[1] + ")";
              return rgbaColor;
          } else {
              return newValue;
          }
      }
  });
};

const ApexRadial = ({data, dataColors ,label}) => {
  const apexRadialColors = getChartColorsArray(dataColors);
  const series = [data?.percentage];
  const options = {
    plotOptions: {
      radialBar: {
        startAngle: -135,
        endAngle: 135,
        dataLabels: {
          name: {
            fontSize: "13px",
            color: void 0,
            offsetY: 60,
          },
          value: {
            offsetY: 22,
            fontSize: "16px",
            color: void 0,
            formatter: function (e) {
              return e + "%";
            },
          },
        },
      },
    },
    colors: apexRadialColors,
    fill: {
      type: "gradient",
      gradient: {
        shade: "dark",
        shadeIntensity: 0.15,
        inverseColors: !1,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 50, 65, 91],
      },
    },
    stroke: {
      dashArray: 4,
    },
    labels: [label],
  };
  return (
    <ReactApexChart
      options={options}
      series={series}
      type="radialBar"
      height="200"
      className="apex-charts"
    />
  );
};

export default ApexRadial;
