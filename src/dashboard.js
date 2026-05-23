import './index.css';

let donutChart = null;
let barChart = null;

const errorMessage = document.getElementById('errorMessage');
const loadingSpinner = document.getElementById('loadingSpinner');
const chartsSection = document.getElementById('chartsSection');
const tableSection = document.getElementById('tableSection');
const tableBody = document.getElementById('tableBody');
const logoutBtn = document.getElementById('logoutBtn');

// Load dashboard data on page load
window.addEventListener('DOMContentLoaded', async () => {
  await loadDashboardData();
});

// Handle logout
logoutBtn.addEventListener('click', async () => {
  try {
    await window.electronAPI.logout();
    window.location.href = 'index.html';
  } catch (error) {
    console.error('Logout error:', error);
  }
});

/**
 * Load dashboard data from API
 */
async function loadDashboardData() {
  try {
    loadingSpinner.style.display = 'flex';
    errorMessage.style.display = 'none';
    chartsSection.style.display = 'none';
    tableSection.style.display = 'none';

    console.log('Fetching dashboard data...');
    const result = await window.electronAPI.fetchAPI();

    console.log('Dashboard result:', result);

    if (result.success && result.data) {
      const dashboardData = result.data;

      // Populate table
      populateTable(dashboardData.tableUsers);

      // Initialize charts
      setTimeout(() => {
        initializeDonutChart(dashboardData.chartDonut);
        initializeBarChart(dashboardData.chartBar);
      }, 0);

      loadingSpinner.style.display = 'none';
      chartsSection.style.display = 'grid';
      tableSection.style.display = 'block';
    } else {
      throw new Error(result.error || 'Failed to load dashboard data');
    }
  } catch (error) {
    console.error('Error loading dashboard data:', error);
    loadingSpinner.style.display = 'none';
    errorMessage.textContent = error.message || 'Failed to load dashboard data. Please try again later.';
    errorMessage.style.display = 'block';
  }
}

/**
 * Populate users table
 */
function populateTable(users) {
  tableBody.innerHTML = '';

  if (!users || users.length === 0) {
    tableBody.innerHTML = '<tr><td colspan="4" style="text-align: center; padding: 2rem;">No users found</td></tr>';
    return;
  }

  users.forEach((user, index) => {
    const row = document.createElement('tr');
    row.className = 'table-body-row';
    row.innerHTML = `
      <td class="table-body-cell">${index + 1}</td>
      <td class="table-body-cell">${user.firstName || '-'}</td>
      <td class="table-body-cell">${user.lastName || '-'}</td>
      <td class="table-body-cell">${user.username || '-'}</td>
    `;
    tableBody.appendChild(row);
  });
}

/**
 * Initialize Donut Chart
 */
function initializeDonutChart(chartData) {
  const canvas = document.getElementById('donutChartCanvas');
  if (!canvas) {
    console.warn('Donut chart canvas not found');
    return;
  }

  // Destroy existing chart
  if (donutChart) {
    donutChart.destroy();
  }

  const colors = [
    'rgba(255, 99, 132, 0.8)',
    'rgba(54, 162, 235, 0.8)',
    'rgba(255, 206, 86, 0.8)',
    'rgba(75, 192, 192, 0.8)',
    'rgba(153, 102, 255, 0.8)',
    'rgba(255, 159, 64, 0.8)'
  ];

  const borderColors = [
    'rgba(255, 99, 132, 1)',
    'rgba(54, 162, 235, 1)',
    'rgba(255, 206, 86, 1)',
    'rgba(75, 192, 192, 1)',
    'rgba(153, 102, 255, 1)',
    'rgba(255, 159, 64, 1)'
  ];

  const ctx = canvas.getContext('2d');
  donutChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: chartData.map(item => item.name),
      datasets: [
        {
          label: 'Donut Chart',
          data: chartData.map(item => item.value),
          backgroundColor: colors.slice(0, chartData.length),
          borderColor: borderColors.slice(0, chartData.length),
          borderWidth: 1
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: {
          display: true,
          position: 'bottom'
        }
      }
    }
  });
}

/**
 * Initialize Bar Chart
 */
function initializeBarChart(chartData) {
  const canvas = document.getElementById('barChartCanvas');
  if (!canvas) {
    console.warn('Bar chart canvas not found');
    return;
  }

  // Destroy existing chart
  if (barChart) {
    barChart.destroy();
  }

  const colors = [
    'rgba(255, 99, 132, 0.8)',
    'rgba(54, 162, 235, 0.8)',
    'rgba(255, 206, 86, 0.8)',
    'rgba(75, 192, 192, 0.8)',
    'rgba(153, 102, 255, 0.8)',
    'rgba(255, 159, 64, 0.8)'
  ];

  const borderColors = [
    'rgba(255, 99, 132, 1)',
    'rgba(54, 162, 235, 1)',
    'rgba(255, 206, 86, 1)',
    'rgba(75, 192, 192, 1)',
    'rgba(153, 102, 255, 1)',
    'rgba(255, 159, 64, 1)'
  ];

  const ctx = canvas.getContext('2d');
  barChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: chartData.map(item => item.name),
      datasets: [
        {
          label: 'Bar Chart',
          data: chartData.map(item => item.value),
          backgroundColor: colors.slice(0, chartData.length),
          borderColor: borderColors.slice(0, chartData.length),
          borderWidth: 1
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: {
          display: true,
          position: 'bottom'
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          grid: {
            color: 'rgba(0, 0, 0, 0.05)'
          }
        },
        x: {
          grid: {
            display: false
          }
        }
      }
    }
  });
}
