let currentChart;

function showSection(id) {
  document.querySelectorAll('.section').forEach(sec => sec.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  document.querySelectorAll('.sidebar a').forEach(a => a.classList.remove('active'));
  event.target.classList.add('active');
}

// Chart setup
const ctx = document.getElementById('analyticsChart').getContext('2d');
currentChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ["Jan", "Feb", "Mar", "Apr"],
    datasets: [
      { label: "Sales", data: [12, 19, 3, 5], backgroundColor: "#3498db" },
      { label: "Orders", data: [5, 15, 8, 2], backgroundColor: "#2ecc71" }
    ]
  }
});

// Update chart from form
document.getElementById('dataForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const sales = document.getElementById('salesInput').value;
  const orders = document.getElementById('ordersInput').value;
  currentChart.data.datasets[0].data.push(Number(sales));
  currentChart.data.datasets[1].data.push(Number(orders));
  currentChart.data.labels.push("New");
  currentChart.update();
});

// Upload CSV
document.getElementById('fileInput').addEventListener('change', function(e) {
  const file = e.target.files[0];
  const reader = new FileReader();
  reader.onload = function(event) {
    const lines = event.target.result.split("\n").map(l => l.split(","));
    const labels = [], sales = [], orders = [];
    lines.slice(1).forEach(row => {
      if (row.length >= 3) {
        labels.push(row[0]);
        sales.push(Number(row[1]));
        orders.push(Number(row[2]));
      }
    });
    currentChart.data.labels = labels;
    currentChart.data.datasets[0].data = sales;
    currentChart.data.datasets[1].data = orders;
    currentChart.update();
  };
  reader.readAsText(file);
});

// Dark mode toggle
document.getElementById('darkModeToggle').addEventListener('change', function() {
  document.body.classList.toggle('dark-mode');
});