// scripts/components/charts.js

let tempChart, conditionsChart, tempChangeChart;

function initCharts() {
    // Temperature Forecast Chart
    const tempCtx = document.getElementById('tempChart').getContext('2d');
    tempChart = new Chart(tempCtx, {
        type: 'bar',
        data: {
            labels: [],
            datasets: [{
                label: 'Temperature (°C)',
                data: [],
                backgroundColor: 'rgba(54, 162, 235, 0.5)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: false
                }
            },
            animation: {
                duration: 1000,
                easing: 'easeOutQuart'
            }
        }
    });

    // Weather Conditions Chart
    const conditionsCtx = document.getElementById('conditionsChart').getContext('2d');
    conditionsChart = new Chart(conditionsCtx, {
        type: 'doughnut',
        data: {
            labels: [],
            datasets: [{
                data: [],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.8)',
                    'rgba(54, 162, 235, 0.8)',
                    'rgba(255, 206, 86, 0.8)',
                    'rgba(75, 192, 192, 0.8)',
                    'rgba(153, 102, 255, 0.8)'
                ]
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'bottom',
                }
            },
            animation: {
                animateRotate: true,
                animateScale: true
            }
        }
    });

    // Temperature Changes Chart
    const tempChangeCtx = document.getElementById('tempChangeChart').getContext('2d');
    tempChangeChart = new Chart(tempChangeCtx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'Temperature (°C)',
                data: [],
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: false
                }
            },
            animation: {
                duration: 1000,
                easing: 'easeInOutQuad'
            }
        }
    });
}

function updateCharts(forecastData) {
    const temperatures = [];
    const dates = [];
    const conditions = {};

    forecastData.list.forEach((item, index) => {
        if (index % 8 === 0) { // Data for every 24 hours
            temperatures.push(item.main.temp);
            dates.push(new Date(item.dt * 1000).toLocaleDateString());
            
            const condition = item.weather[0].main;
            conditions[condition] = (conditions[condition] || 0) + 1;
        }
    });

    // Update Temperature Forecast Chart
    tempChart.data.labels = dates;
    tempChart.data.datasets[0].data = temperatures;
    tempChart.update();

    // Update Weather Conditions Chart
    conditionsChart.data.labels = Object.keys(conditions);
    conditionsChart.data.datasets[0].data = Object.values(conditions);
    conditionsChart.update();

    // Update Temperature Changes Chart
    tempChangeChart.data.labels = dates;
    tempChangeChart.data.datasets[0].data = temperatures;
    tempChangeChart.update();
}