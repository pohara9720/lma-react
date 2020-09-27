/*=========================================================================================
    File Name: app-invoice.js
    Description: app-invoice Javascripts
    ----------------------------------------------------------------------------------------
    Item Name: Frest HTML Admin Template
   Version: 1.0
    Author: PIXINVENT
    Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/
$(document).ready(function() {

//    // Single Date Range
//   //----------------------
//   $('.single-daterange').daterangepicker({
//     singleDatePicker: true,
//     showDropdowns: true,
//     minYear: 1901,
//     maxYear: parseInt(moment().format('YYYY'), 10)
//   });

//   // Basic Date Range
//   //---------------------
    $('.daterange').daterangepicker({
      singleDatePicker: true
    });

    // .datepicker({
    // format: "yyyy",
    // autoclose: true,
    // minViewMode: "years"}); 


    var $primary = '#5A8DEE';
  var $success = '#39DA8A';
  var $danger = '#FF5B5C';
  var $warning = '#FDAC41';
  var $info = '#00CFDD';
  var $label_color = '#304156';
  var $danger_light = '#FFDEDE';
  var $gray_light = '#828D99';
  var $bg_light = "#f2f4f4";


  // Order Activity Line Chart
  // -------------------------
  var orderActivityChartOptions = {
    chart: {
      height: 350,
      type: 'line',
      toolbar: {
        show: false
      }
    },
    colors: [$primary],
    dataLabels: {
      enabled: false,
    },
    series: [{
      data: [40, 60, 120, 100, 140, 80, 180, 180, 280, 190, 210, 190, 290, 290]
    }],
    markers: {
      size: 5,
      hover: {
        size: 7,
        sizeOffset: 7
      },
    },
    xaxis: {
      categories: [10.12, 10.12, 11.12, 11.12, 12.12, 12.12, 13.12, 13.12, 14.12, 14.12, 15.12, 15.12, 16.12, 16.12],
      axisTicks: {
        show: false
      },
      axisBorder: {
        show: false
      },
      labels: {
        style: {
          colors: $gray_light
        },
        offsetX: 3,
      }
    },
    yaxis: {
      min: 0,
      max: 3000,
      tickAmount: 3,
      labels: {
        style: {
          color: $gray_light
        }
      }
    },
    grid: {
      padding: {
        left: 15
      }
    }
  }

  var orderActivityChart = new ApexCharts(
    document.querySelector("#order-activity-line-chart"),
    orderActivityChartOptions
  );
  orderActivityChart.render();

  // Multi Radial Statistics
  // -----------------------
  var multiRadialOptions = {
    chart: {
      height: 300,
      type: "radialBar",
    },
    colors: [$primary, $warning, $danger],
    series: [75, 90, 85],
    plotOptions: {
      radialBar: {
        hollow: {
          size: "55%"
        },
        track: {
          margin: 10,
          background: '#fff',
        },
        dataLabels: {
          name: {
            fontSize: '15px',
            color: [$gray_light],
            fontFamily: "IBM Plex Sans",
            offsetY: 25,
          },
          value: {
            fontSize: '32px',
            fontFamily: "Rubik",
            offsetY: -15,
          },
          total: {
            show: true,
            label: 'Sales',
            color: $gray_light,
            formatter: function (w) {
              // By default this function returns the average of all series. The below is just an example to show the use of custom formatter function
              return "$3,800"
            }
          }
        }
      }
    },
    stroke: {
      lineCap: "round",
    },
    labels: ['Steers', 'Embryos', 'Heifers']
  };

  var multiradialChart = new ApexCharts(
    document.querySelector("#radial-chart-multi"),
    multiRadialOptions
  );
  multiradialChart.render();

  var multiRadialOptions2 = {
    chart: {
      height: 300,
      type: "radialBar",
    },
    colors: [$primary, $warning, $danger],
    series: [75, 80, 85],
    plotOptions: {
      radialBar: {
        hollow: {
          size: "55%"
        },
        track: {
          margin: 10,
          background: '#fff',
        },
        dataLabels: {
          name: {
            fontSize: '15px',
            color: [$gray_light],
            fontFamily: "IBM Plex Sans",
            offsetY: 25,
          },
          value: {
            fontSize: '32px',
            fontFamily: "Rubik",
            offsetY: -15,
          },
          total: {
            show: true,
            label: 'Expenses',
            color: $gray_light,
            formatter: function (w) {
              // By default this function returns the average of all series. The below is just an example to show the use of custom formatter function
              return "$2,174"
            }
          }
        }
      }
    },
    stroke: {
      lineCap: "round",
    },
    labels: ['Steers', 'Embryos', 'Heifers']
  };

  var multiradialChart2 = new ApexCharts(
    document.querySelector("#radial-chart-multi2"),
    multiRadialOptions2
  );
  multiradialChart2.render();
});  