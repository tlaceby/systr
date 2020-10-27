
var options_used = {
    chart: {
      type: 'line'
    },
    chart: {
        toolbar: {
          show: true,
          offsetX: 0,
          offsetY: 0,
          tools: {
            download: false,
            selection: false,
            zoom: false,
            zoomin: false,
            zoomout: false,
            pan: false,
            reset: false,
            customIcons: []
          },
        },
    },
    stroke: {
        curve: 'smooth',
      },
    series: [{
      name: 'Used',
      data: [30,43,39,55,49,60,70,91,84,39,45, 32, 21, 45, 65]
    }, {
        name: 'Core Usage',
        data: [10,15,29,70,46,49,60,91,84,61,58, 12, 34, 56]
      },],
    
    tooltip: {
        enabled: false,
    },
    legend: {
        show: true,
    },
    grid: {
        show: false,
    },
    toolbar: {
        show: false,
    },
    xaxis: {
        type: 'category',
        categories: [2, 4, 6, 8, 10, 12, 14, 16, 18, 20],
        labels: {
            show: true,
            rotate: -45,
            rotateAlways: false,
            hideOverlappingLabels: true,
            showDuplicates: false,
            trim: false,
            minHeight: undefined,
            maxHeight: 120,
            style: {
                colors: [],
                fontSize: '12px',
                fontFamily: 'Helvetica, Arial, sans-serif',
                fontWeight: 400,
                cssClass: 'apexcharts-xaxis-label',
            },
            offsetX: 0,
            offsetY: 0,
            format: undefined,
            formatter: undefined,
            datetimeUTC: true,
            datetimeFormatter: {
                year: 'yyyy',
                month: "MMM 'yy",
                day: 'dd MMM',
                hour: 'HH:mm',
            },
        },
        axisBorder: {
            show: false,
            color: '#78909C',
            height: 1,
            width: '100%',
            offsetX: 0,
            offsetY: 0
        },
        axisTicks: {
            show: true,
            borderType: 'solid',
            color: '#78909C',
            height: 6,
            offsetX: 0,
            offsetY: 0
        },
        tickAmount: undefined,
        tickPlacement: 'between',
        min: undefined,
        max: undefined,
        range: undefined,
        floating: false,
        position: 'bottom',
        title: {
            text: undefined,
            offsetX: 0,
            offsetY: 0,
            style: {
                color: undefined,
                fontSize: '12px',
                fontFamily: 'Helvetica, Arial, sans-serif',
                fontWeight: 600,
                cssClass: 'apexcharts-xaxis-title',
            },
        },
        
    },
    dataLabels: {
        enabled: true,
      },
      colors : ["#3caea3", "#ed553b"]
  }

  var options_free = {
    chart: {
      type: 'line'
    },
    chart: {
        toolbar: {
          show: true,
          offsetX: 0,
          offsetY: 0,
          tools: {
            download: false,
            selection: false,
            zoom: false,
            zoomin: false,
            zoomout: false,
            pan: false,
            reset: false,
            customIcons: []
          },
        },
    },
    stroke: {
        curve: 'smooth',
      },
    series: [{
      name: 'Available',
      data: [30,43,39,55,49,60,70,91,84,39,45, 32, 21, 45, 65]
    }, {
        name: 'Cores Available',
        data: [10,15,29,70,46,49,60,91,84,61,58, 12, 34, 56]
      },],
    
    tooltip: {
        enabled: false,
    },
    legend: {
        show: true,
    },
    grid: {
        show: false,
    },
    toolbar: {
        show: false,
    },
    xaxis: {
        type: 'category',
        categories: [2, 4, 6, 8, 10, 12, 14, 16, 18, 20],
        labels: {
            show: true,
            rotate: -45,
            rotateAlways: false,
            hideOverlappingLabels: true,
            showDuplicates: false,
            trim: false,
            minHeight: undefined,
            maxHeight: 120,
            style: {
                colors: [],
                fontSize: '12px',
                fontFamily: 'Helvetica, Arial, sans-serif',
                fontWeight: 400,
                cssClass: 'apexcharts-xaxis-label',
            },
            offsetX: 0,
            offsetY: 0,
            format: undefined,
            formatter: undefined,
            datetimeUTC: true,
            datetimeFormatter: {
                year: 'yyyy',
                month: "MMM 'yy",
                day: 'dd MMM',
                hour: 'HH:mm',
            },
        },
        axisBorder: {
            show: false,
            color: '#78909C',
            height: 1,
            width: '100%',
            offsetX: 0,
            offsetY: 0
        },
        axisTicks: {
            show: true,
            borderType: 'solid',
            color: '#78909C',
            height: 6,
            offsetX: 0,
            offsetY: 0
        },
        tickAmount: undefined,
        tickPlacement: 'between',
        min: undefined,
        max: undefined,
        range: undefined,
        floating: false,
        position: 'bottom',
        title: {
            text: undefined,
            offsetX: 0,
            offsetY: 0,
            style: {
                color: undefined,
                fontSize: '13px',
                fontFamily: 'Helvetica, Arial, sans-serif',
                fontWeight: 600,
                cssClass: 'apexcharts-xaxis-title',
            },
        },
        
    },
    dataLabels: {
        enabled: true,
      },
      colors: ['#f6d55c', "#ed553b"]
  }

  var options_time = {
    series: [],
    chart: {
    width: 300,
    height: 250,
    type: 'pie',
  },
  legend :{
    show: false,
  },
  labels: ['Avalilable', 'Used'],
  responsive: [{
    breakpoint: 600,
    options: {
      chart: {
        width: 200
      },
      legend: {
        position: 'bottom'
      }
    }
  }]
  };




  
  Apex.colors = ['#3caea3', "#f6d55c", "#ed553b"]

  var chart_used = new ApexCharts(document.querySelector("#chart-long"), options_used);
  
  var chart_long_time = new ApexCharts(document.querySelector("#chart-minutes"), options_time);
  var chart_free = new ApexCharts(document.querySelector("#chart-close"), options_free);
  
  chart_used.render();
  chart_free.render();
  chart_long_time.render()


  function update_chart_data (data_set = Array, chart, pie) {

    if(pie) {
      chart.updateSeries([data_set[0], data_set[1]], true)
      chart.render()
    } else {
        chart.updateSeries([{
            data: data_set[0]
          }], true)
    }
}

  setInterval(() => {
    ipcRenderer.send("get-cpu-usage", true);
  }, 1000)

ipcRenderer.on("cpu-data", (events, data) => {
    __cpu_stats.recent_minute.free.push(data.free.toFixed(1));
    __cpu_stats.recent_minute.used.push(data.used.toFixed(1));

    document.getElementById("utilization-cpu").innerHTML = ` ${data.used.toFixed(2)}% `
    document.getElementById("available-cpu").innerHTML = ` ${data.free.toFixed(2)}% `
    console.log(__cpu_stats.recent_minute)
    if(__cpu_stats.recent_minute.free.length > 10) {
        __cpu_stats.recent_minute.free.shift()
        __cpu_stats.recent_minute.used.shift()
    }
    update_chart_data([data.free, data.used], chart_long_time, true)
    update_chart_data([__cpu_stats.recent_minute.free], chart_free,false)
    update_chart_data([__cpu_stats.recent_minute.used], chart_used, false)
});