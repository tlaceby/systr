var ctx = document.getElementById('cpuChart').getContext('2d');
var chart_cpu = new Chart(ctx, {
    // The type of chart we want to create
    type: 'line',
    
    // The data for our dataset
    data: {
        labels: ['', '', '', '', '', '', '', '', '','', '', '', ''],
        datasets: [{
            label: '',
            backgroundColor: '#fff',
            borderColor: '#fff',
            fill: false,
            data: []
            
        }, 
        ]
    },

    // Configuration options go here
    options: {legend: {
        display: false,
     }}
});
