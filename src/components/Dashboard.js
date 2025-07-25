import { useState, useEffect } from 'react';
import { Line, Pie } from 'react-chartjs-2';
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
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
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

  const filterDataByTime = (data) => {
    return data.filter(record => {
      const recordDate = new Date(record.date);
      
      switch(timeView) {
        case 'daily':
          return recordDate.getMonth() === selectedMonth - 1 && 
                 recordDate.getFullYear() === selectedYear;
        case 'weekly':
          return recordDate.getMonth() === selectedMonth - 1 && 
                 recordDate.getFullYear() === selectedYear;
        case 'monthly':
          return recordDate.getFullYear() === selectedYear;
        default:
          return true;
      }
    });
  };



  const calculateTotalSpending = (data) => {
    return data.reduce((total, record) => total + parseFloat(record.amount || 0), 0);
  };

  const groupByCategory = (data) => {
    const grouped = {};
    data.forEach(record => {
      const category = record.category;
      grouped[category] = (grouped[category] || 0) + parseFloat(record.amount || 0);
    });
    return grouped;
  };

  const prepareLineChartData = (data) => {
    if (timeView === 'monthly') {
      // Group by months for yearly view
      const monthlyData = {};
      data.forEach(record => {
        const date = new Date(record.date);
        const monthKey = date.getMonth();
        monthlyData[monthKey] = (monthlyData[monthKey] || 0) + parseFloat(record.amount || 0);
      });

      const labels = [];
      const amounts = [];
      for (let i = 0; i < 12; i++) {
        labels.push(new Date(0, i).toLocaleString('default', { month: 'long' }));
        amounts.push(monthlyData[i] || 0);
      }

      return {
        labels,
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
      const weeklyData = {};
      data.forEach(record => {
        const date = new Date(record.date);
        const dayOfMonth = date.getDate();
        const weekNumber = Math.ceil(dayOfMonth / 7);
        weeklyData[weekNumber] = (weeklyData[weekNumber] || 0) + parseFloat(record.amount || 0);
      });

      const labels = [];
      const amounts = [];
      const daysInMonth = new Date(selectedYear, selectedMonth, 0).getDate();
      const totalWeeks = Math.ceil(daysInMonth / 7);
      
      for (let i = 1; i <= totalWeeks; i++) {
        const startDay = (i - 1) * 7 + 1;
        const endDay = Math.min(i * 7, daysInMonth);
        labels.push(`Week ${i} (${startDay}-${endDay})`);
        amounts.push(weeklyData[i] || 0);
      }

      return {
        labels,
        datasets: [
          {
            label: 'Weekly Spending',
            data: amounts,
            borderColor: 'rgb(75, 192, 192)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            tension: 0.1,
          },
        ],
      };
    } else {
      // Daily view - show individual transactions
      const sortedData = [...data].sort((a, b) => new Date(a.date) - new Date(b.date));
      
      const labels = sortedData.map(record => record.date);
      const amounts = sortedData.map(record => parseFloat(record.amount || 0));

      return {
        labels,
        datasets: [
          {
            label: 'Daily Spending',
            data: amounts,
            borderColor: 'rgb(75, 192, 192)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            tension: 0.1,
          },
        ],
      };
    }
  };

  const preparePieChartData = (categoryData) => {
    const categories = Object.keys(categoryData);
    const amounts = Object.values(categoryData);
    
    const colors = [
      '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', 
      '#9966FF', '#FF9F40', '#FF6384', '#C9CBCF',
      '#4BC0C0', '#FF9F40'
    ];

    return {
      labels: categories,
      datasets: [
        {
          data: amounts,
          backgroundColor: colors.slice(0, categories.length),
          hoverBackgroundColor: colors.slice(0, categories.length),
        },
      ],
    };
  };

  const filteredData = filterDataByTime(spendingData);
  const allTimeTotal = calculateTotalSpending(spendingData);
  const periodTotal = calculateTotalSpending(filteredData);
  const categoryData = groupByCategory(filteredData);

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: `Spending Analysis - ${timeView.charAt(0).toUpperCase() + timeView.slice(1)}`,
      },
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
            <div className="col-md-12">
              <div className="card">
                <div className="card-header">
                  <h5>Spending by Category</h5>
                </div>
                <div className="card-body">
                  <div style={{ height: '400px', display: 'flex', justifyContent: 'center' }}>
                    <Pie data={preparePieChartData(categoryData)} options={chartOptions} />
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