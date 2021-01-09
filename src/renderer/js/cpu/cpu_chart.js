var ctx = document.getElementById('cpuChart').getContext('2d');
var chart_cpu = new Chart(ctx, {
    // The type of chart we want to create
    type: 'line',
    
    // The data for our dataset
    data: {
        labels: ['|', '|', '|', '|', '|', '|', '|', '|', '|', '|', '|', '|', '|', '|', '|', '|', '|', '|', '|', '|', ],
        datasets: [
            {
            label: 'Overall',
            showLine: true,
            backgroundColor: '#fff ',
            borderColor: '#fff',
            fill: false,
            data: [],
            pointStyle: 'rectRounded'
        }, 

        { label: 'User',
            showLine: true,
            backgroundColor: '#ed553b ',
            borderColor: '#ed553b',
            fill: false,
            data: [],
            pointStyle: 'rectRot'
        },

        { label: 'System',
            showLine: true,
            backgroundColor: '#3caea3 ',
            borderColor: '#3caea3',
            fill: false,
            data: [],
            pointStyle: 'rectRot'
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
        display: true
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
