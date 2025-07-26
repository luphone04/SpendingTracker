import React, { useState, useEffect } from 'react';
import { Line, Pie, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement,
} from 'chart.js';

// Register chart components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement
);

function Dashboard() {
  const [spendingData, setSpendingData] = useState([]);
  const [timeView, setTimeView] = useState('monthly');
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('spendingRecords') || '[]');
    setSpendingData(data);
  }, []);

  // Filter data based on time period
  function filterDataByTime(data) {
    var filteredData = [];
    
    for (var i = 0; i < data.length; i++) {
      var record = data[i];
      var recordDate = new Date(record.date);
      
      if (timeView === 'daily') {
        if (recordDate.getMonth() === selectedMonth - 1 && recordDate.getFullYear() === selectedYear) {
          filteredData.push(record);
        }
      } else if (timeView === 'weekly') {
        if (recordDate.getMonth() === selectedMonth - 1 && recordDate.getFullYear() === selectedYear) {
          filteredData.push(record);
        }
      } else if (timeView === 'monthly') {
        if (recordDate.getFullYear() === selectedYear) {
          filteredData.push(record);
        }
      } else {
        filteredData.push(record);
      }
    }
    
    return filteredData;
  }



  // Calculate total spending
  function calculateTotalSpending(data) {
    var total = 0;
    for (var i = 0; i < data.length; i++) {
      var amount = parseFloat(data[i].amount);
      if (!isNaN(amount)) {
        total = total + amount;
      }
    }
    return total;
  }

  // Group spending by category
  function groupByCategory(data) {
    var categoryTotals = {};
    
    for (var i = 0; i < data.length; i++) {
      var record = data[i];
      var category = record.category;
      var amount = parseFloat(record.amount);
      
      if (!isNaN(amount)) {
        if (categoryTotals[category]) {
          categoryTotals[category] = categoryTotals[category] + amount;
        } else {
          categoryTotals[category] = amount;
        }
      }
    }
    
    return categoryTotals;
  }

  // Prepare data for line chart
  function prepareLineChartData(data) {
    if (timeView === 'monthly') {
      // Group by months for yearly view
      var monthlyData = {};
      
      for (var i = 0; i < data.length; i++) {
        var record = data[i];
        var date = new Date(record.date);
        var month = date.getMonth();
        var amount = parseFloat(record.amount);
        
        if (!isNaN(amount)) {
          if (monthlyData[month]) {
            monthlyData[month] = monthlyData[month] + amount;
          } else {
            monthlyData[month] = amount;
          }
        }
      }

      var labels = [];
      var amounts = [];
      var monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 
                       'July', 'August', 'September', 'October', 'November', 'December'];
      
      for (var j = 0; j < 12; j++) {
        labels.push(monthNames[j]);
        if (monthlyData[j]) {
          amounts.push(monthlyData[j]);
        } else {
          amounts.push(0);
        }
      }

      return {
        labels: labels,
        datasets: [
          {
            label: 'Monthly Spending',
            data: amounts,
            borderColor: 'rgb(75, 192, 192)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            tension: 0.1,
          },
        ],
      };
    } else if (timeView === 'weekly') {
      // Group by weeks within the selected month
      var weeklyData = {};
      
      for (var k = 0; k < data.length; k++) {
        var weekRecord = data[k];
        var weekDate = new Date(weekRecord.date);
        var dayOfMonth = weekDate.getDate();
        var weekNumber = Math.ceil(dayOfMonth / 7);
        var weekAmount = parseFloat(weekRecord.amount);
        
        if (!isNaN(weekAmount)) {
          if (weeklyData[weekNumber]) {
            weeklyData[weekNumber] = weeklyData[weekNumber] + weekAmount;
          } else {
            weeklyData[weekNumber] = weekAmount;
          }
        }
      }

      var weekLabels = [];
      var weekAmounts = [];
      var daysInMonth = new Date(selectedYear, selectedMonth, 0).getDate();
      var totalWeeks = Math.ceil(daysInMonth / 7);
      
      for (var m = 1; m <= totalWeeks; m++) {
        var startDay = (m - 1) * 7 + 1;
        var endDay = m * 7;
        if (endDay > daysInMonth) {
          endDay = daysInMonth;
        }
        weekLabels.push('Week ' + m + ' (' + startDay + '-' + endDay + ')');
        if (weeklyData[m]) {
          weekAmounts.push(weeklyData[m]);
        } else {
          weekAmounts.push(0);
        }
      }

      return {
        labels: weekLabels,
        datasets: [
          {
            label: 'Weekly Spending',
            data: weekAmounts,
            borderColor: 'rgb(75, 192, 192)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            tension: 0.1,
          },
        ],
      };
    } else {
      // Daily view - show individual transactions
      var sortedData = [];
      for (var n = 0; n < data.length; n++) {
        sortedData.push(data[n]);
      }
      
      // Sort by date
      for (var p = 0; p < sortedData.length - 1; p++) {
        for (var q = 0; q < sortedData.length - p - 1; q++) {
          var date1 = new Date(sortedData[q].date);
          var date2 = new Date(sortedData[q + 1].date);
          if (date1 > date2) {
            var temp = sortedData[q];
            sortedData[q] = sortedData[q + 1];
            sortedData[q + 1] = temp;
          }
        }
      }
      
      var dailyLabels = [];
      var dailyAmounts = [];
      for (var r = 0; r < sortedData.length; r++) {
        dailyLabels.push(sortedData[r].date);
        var dailyAmount = parseFloat(sortedData[r].amount);
        if (!isNaN(dailyAmount)) {
          dailyAmounts.push(dailyAmount);
        } else {
          dailyAmounts.push(0);
        }
      }

      return {
        labels: dailyLabels,
        datasets: [
          {
            label: 'Daily Spending',
            data: dailyAmounts,
            borderColor: 'rgb(75, 192, 192)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            tension: 0.1,
          },
        ],
      };
    }
  }

  // Prepare data for pie chart
  function preparePieChartData(categoryData) {
    var categories = [];
    var amounts = [];
    
    // Get all categories and amounts
    for (var category in categoryData) {
      categories.push(category);
      amounts.push(categoryData[category]);
    }
    
    var colors = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40', '#FF6384', '#C9CBCF', '#4BC0C0', '#FF9F40'];
    var chartColors = [];
    
    for (var i = 0; i < categories.length; i++) {
      if (i < colors.length) {
        chartColors.push(colors[i]);
      } else {
        chartColors.push('#999999');
      }
    }

    return {
      labels: categories,
      datasets: [
        {
          data: amounts,
          backgroundColor: chartColors,
          hoverBackgroundColor: chartColors,
        },
      ],
    };
  }

  // Prepare data for bar chart
  function prepareBarChartData(categoryData) {
    var categories = [];
    var amounts = [];
    
    // Get all categories and amounts
    for (var category in categoryData) {
      categories.push(category);
      amounts.push(categoryData[category]);
    }
    
    var colors = ['#667eea', '#764ba2', '#36A2EB', '#4BC0C0', '#9966FF', '#FF9F40', '#FF6384', '#FFCE56', '#C9CBCF', '#28a745'];
    var chartColors = [];
    
    for (var i = 0; i < categories.length; i++) {
      if (i < colors.length) {
        chartColors.push(colors[i]);
      } else {
        chartColors.push('#999999');
      }
    }

    return {
      labels: categories,
      datasets: [
        {
          label: 'Spending Amount ($)',
          data: amounts,
          backgroundColor: chartColors,
          borderColor: chartColors,
          borderWidth: 1,
        },
      ],
    };
  }

  // Calculate data for display
  var filteredData = filterDataByTime(spendingData);
  var allTimeTotal = calculateTotalSpending(spendingData);
  var periodTotal = calculateTotalSpending(filteredData);
  var categoryData = groupByCategory(filteredData);

  // Chart configuration
  var chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Spending Analysis - ' + timeView.charAt(0).toUpperCase() + timeView.slice(1),
      },
    },
  };

  // Bar chart specific configuration
  var barChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Category Spending - ' + timeView.charAt(0).toUpperCase() + timeView.slice(1),
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value) {
            return '$' + value.toFixed(2);
          }
        }
      }
    },
  };

  return (
    <div className="dashboard">
      <div className="row mb-4">
        <div className="col-md-12">
          <h2>Analytics Dashboard</h2>
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-md-6">
          <div className="btn-group" role="group">
            <button 
              className={`btn ${timeView === 'daily' ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => setTimeView('daily')}
            >
              Daily
            </button>
            <button 
              className={`btn ${timeView === 'weekly' ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => setTimeView('weekly')}
            >
              Weekly
            </button>
            <button 
              className={`btn ${timeView === 'monthly' ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => setTimeView('monthly')}
            >
              Monthly
            </button>
          </div>
        </div>
        {timeView !== 'monthly' && (
          <div className="col-md-6">
            <div className="row">
              <div className="col-6">
                <select 
                  className="form-select"
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
                >
                  {Array.from({length: 12}, (_, i) => (
                    <option key={i+1} value={i+1}>
                      {new Date(0, i).toLocaleString('default', { month: 'long' })}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-6">
                <select 
                  className="form-select"
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                >
                  {Array.from({length: 10}, (_, i) => (
                    <option key={2020 + i} value={2020 + i}>
                      {2020 + i}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}
        {timeView === 'monthly' && (
          <div className="col-md-6">
            <select 
              className="form-select"
              value={selectedYear}
              onChange={(e) => setSelectedYear(parseInt(e.target.value))}
            >
              {Array.from({length: 10}, (_, i) => (
                <option key={2020 + i} value={2020 + i}>
                  {2020 + i}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      <div className="row mb-4">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body text-center">
              <h5 className="card-title">Total Spending (All Time)</h5>
              <h3 className="text-primary">${allTimeTotal.toFixed(2)}</h3>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card">
            <div className="card-body text-center">
              <h5 className="card-title">{timeView.charAt(0).toUpperCase() + timeView.slice(1)} Spending</h5>
              <h3 className="text-success">${periodTotal.toFixed(2)}</h3>
            </div>
          </div>
        </div>
      </div>

      {filteredData.length > 0 && (
        <>
          <div className="row mb-4">
            <div className="col-md-12">
              <div className="card">
                <div className="card-header">
                  <h5>Spending Trend</h5>
                </div>
                <div className="card-body">
                  <Line data={prepareLineChartData(filteredData)} options={chartOptions} />
                </div>
              </div>
            </div>
          </div>

          <div className="row mb-4">
            <div className="col-md-6">
              <div className="card">
                <div className="card-header">
                  <h5>Spending by Category - Pie Chart</h5>
                </div>
                <div className="card-body">
                  <div style={{ height: '400px', display: 'flex', justifyContent: 'center' }}>
                    <Pie data={preparePieChartData(categoryData)} options={chartOptions} />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card">
                <div className="card-header">
                  <h5>Spending by Category - Bar Chart</h5>
                </div>
                <div className="card-body">
                  <div style={{ height: '400px' }}>
                    <Bar data={prepareBarChartData(categoryData)} options={barChartOptions} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-12">
              <div className="card">
                <div className="card-header">
                  <h5>Category Breakdown</h5>
                </div>
                <div className="card-body">
                  <div className="table-responsive">
                    <table className="table table-striped">
                      <thead>
                        <tr>
                          <th>Category</th>
                          <th>Amount</th>
                          <th>Percentage</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Object.entries(categoryData).map(([category, amount]) => (
                          <tr key={category}>
                            <td>{category}</td>
                            <td>${amount.toFixed(2)}</td>
                            <td>{((amount / periodTotal) * 100).toFixed(1)}%</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {filteredData.length === 0 && (
        <div className="row">
          <div className="col-md-12">
            <div className="alert alert-info text-center">
              <h4>No spending data found</h4>
              <p>Add some spending records in the Journal to see your analytics!</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;