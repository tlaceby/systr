var ctx = document.getElementById('myChart').getContext('2d');
var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'line',
    
    // The data for our dataset
    data: {
        labels: ['', '', '', '', '', '', '', '', '','', '', '', '', '', ''],
        datasets: [{
            label: '',
            backgroundColor: '#ed553b',
            borderColor: '#ed553b',
            fill: false,
            data: []
            
        }, 
        ]
    },

     // Configuration options go here
     options: {
        legend: {
            display: false
         },
        elements: {
           line: {
                tension: 1 // disables bezier curves
           }
        }, 
        animation: {
            duration: 0 // general animation time
        },
        hover: {
            animationDuration: 0 // duration of animations when hovering an item
        },
        responsiveAnimationDuration: 0
    }
});
