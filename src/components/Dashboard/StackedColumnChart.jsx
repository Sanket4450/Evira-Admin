import React from 'react'
import PropTypes from 'prop-types'
import ReactApexChart from 'react-apexcharts'

const getChartColorsArray = (colors) => {
  colors = JSON.parse(colors)
  return colors.map(function (value) {
    var newValue = value.replace(' ', '')
    if (newValue.indexOf(',') === -1) {
      var color = getComputedStyle(document.documentElement).getPropertyValue(
        newValue
      )

      if (color.indexOf('#') !== -1) color = color.replace(' ', '')
      if (color) return color
      else return newValue
    } else {
      var val = value.split(',')
      if (val.length === 2) {
        var rgbaColor = getComputedStyle(
          document.documentElement
        ).getPropertyValue(val[0])
        rgbaColor = 'rgba(' + rgbaColor + ',' + val[1] + ')'
        return rgbaColor
      } else {
        return newValue
      }
    }
  })
}

const StackedColumnChart = ({ dataColors, periodData }) => {
  const stackedColumnChartColors = getChartColorsArray(dataColors)
  const options = {
    chart: {
      stacked: !0,
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: !0,
      },
    },
    plotOptions: {
      bar: {
        horizontal: !1,
        columnWidth: '15%',
        // endingShape: "rounded"
      },
    },
    dataLabels: {
      enabled: !1,
    },
    xaxis: {
      show: true,
      categories: periodData?.[0]?.label,
      labels: {
        show: true,
      },
    },
    colors: stackedColumnChartColors,
    legend: {
      position: 'bottom',
    },
    fill: {
      opacity: 1,
    },
  }
  return (
    <React.Fragment>
      <ReactApexChart
        options={options}
        series={[...periodData]}
        type="bar"
        height="359"
        className="apex-charts"
      />
    </React.Fragment>
  )
}

StackedColumnChart.propTypes = {
  periodData: PropTypes.any,
}
export default StackedColumnChart
