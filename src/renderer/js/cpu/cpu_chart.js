var ctx = document.getElementById('cpuChart').getContext('2d');
var chart_cpu = new Chart(ctx, {
    // The type of chart we want to create
    type: 'line',
    
    // The data for our dataset
    data: {
        labels: ['|', '|', '|', '|', '|', '|', '|', '|', '|', '|', '|', '|', '|', '|', '|', '|', '|', '|', '|', '|', ],
        datasets: [{
            label: '',
            showLine: true,
            backgroundColor: '#fff ',
            borderColor: '#fff',
            fill: false,
            data: [],
            pointStyle: 'rectRounded'
        }, 
        
        ]
    },

    // Configuration options go here
    options: {
        /** 
        elements: {
            line: {
                tension: 0 // disables bezier curves
            }
        }, */
        legend: {
        display: false
     }, animation: {
            duration: 0 // general animation time
        },
        hover: {
            animationDuration: 0 // duration of animations when hovering an item
        },
        responsiveAnimationDuration: 0,
        scales: {
            xAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                    },
                    gridLines: {
                        display: false,
                    },
                }],
            yAxes: [{
                    gridLines: {
                        display: false
                    },
                    display: true,
                    ticks: {
                        beginAtZero: true,
                        steps: 10,
                        stepValue: 1,
                        max: 100
                    }
                }]
        },

    },
    
    
});