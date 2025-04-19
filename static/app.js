const API_BASE_URL = '';  // Vazio para usar URLs relativas

// Função para carregar o conteúdo da página
async function loadPage(page) {
    const contentDiv = document.getElementById('content');
    
    switch (page) {
        case 'dashboard':
            contentDiv.innerHTML = await loadDashboard();
            initDashboardCharts();
            break;
        case 'players':
            contentDiv.innerHTML = await loadPlayers();
            break;
        case 'alerts':
            contentDiv.innerHTML = await loadAlerts();
            break;
        case 'stats':
            contentDiv.innerHTML = await loadStats();
            initStatsCharts();
            break;
    }
}

// Função para carregar o dashboard
async function loadDashboard() {
    const [players, alerts, stats] = await Promise.all([
        fetch(`${API_BASE_URL}/api/players`).then(res => res.json()),
        fetch(`${API_BASE_URL}/api/alerts`).then(res => res.json()),
        fetch(`${API_BASE_URL}/api/stats`).then(res => res.json())
    ]);

    return `
        <div class="row">
            <div class="col-md-4">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">Total de Jogadores</h5>
                        <p class="card-text display-4">${players.length}</p>
                    </div>
                </div>
            </div>
            <div class="col-md-4">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">Alertas Ativos</h5>
                        <p class="card-text display-4">${alerts.length}</p>
                    </div>
                </div>
            </div>
            <div class="col-md-4">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">Taxa de Detecção</h5>
                        <p class="card-text display-4">${stats.detection_rate}%</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="row mt-4">
            <div class="col-md-6">
                <div class="card">
                    <div class="card-header">
                        <h5 class="card-title mb-0">Últimos Alertas</h5>
                    </div>
                    <div class="card-body">
                        ${alerts.slice(0, 5).map(alert => `
                            <div class="alert-item ${alert.severity.toLowerCase()}">
                                <div class="d-flex justify-content-between align-items-center">
                                    <div>
                                        <p class="mb-0">${alert.message}</p>
                                        <small class="text-muted">ID: ${alert.id}</small>
                                    </div>
                                    <span class="badge bg-${alert.severity === 'warning' ? 'warning' : 'danger'}">${alert.severity}</span>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="card">
                    <div class="card-header">
                        <h5 class="card-title mb-0">Estatísticas de Jogadores</h5>
                    </div>
                    <div class="card-body">
                        <canvas id="playersChart"></canvas>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Função para carregar a lista de jogadores
async function loadPlayers() {
    const players = await fetch(`${API_BASE_URL}/api/players`).then(res => res.json());
    
    return `
        <div class="card">
            <div class="card-header">
                <h5 class="card-title mb-0">Lista de Jogadores</h5>
            </div>
            <div class="card-body">
                <div class="table-responsive">
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nome</th>
                                <th>Status</th>
                                <th>Reputação</th>
                                <th>Última Atividade</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${players.map(player => `
                                <tr>
                                    <td>${player.id}</td>
                                    <td>${player.name}</td>
                                    <td><span class="badge bg-${player.status === 'Normal' ? 'success' : player.status === 'Suspicious' ? 'warning' : 'danger'}">${player.status}</span></td>
                                    <td>${player.reputation}</td>
                                    <td>${new Date(player.lastSeen).toLocaleString()}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `;
}

// Função para carregar os alertas
async function loadAlerts() {
    const alerts = await fetch(`${API_BASE_URL}/api/alerts`).then(res => res.json());
    
    return `
        <div class="card">
            <div class="card-header">
                <h5 class="card-title mb-0">Alertas do Sistema</h5>
            </div>
            <div class="card-body">
                ${alerts.map(alert => `
                    <div class="alert-item ${alert.severity.toLowerCase()}">
                        <div class="d-flex justify-content-between align-items-center">
                            <div>
                                <p class="mb-0">${alert.message}</p>
                                <small class="text-muted">ID: ${alert.id}</small>
                            </div>
                            <span class="badge bg-${alert.severity === 'warning' ? 'warning' : 'danger'}">${alert.severity}</span>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

// Função para carregar as estatísticas
async function loadStats() {
    const stats = await fetch(`${API_BASE_URL}/api/stats`).then(res => res.json());
    
    return `
        <div class="row">
            <div class="col-md-6">
                <div class="card">
                    <div class="card-header">
                        <h5 class="card-title mb-0">Estatísticas Gerais</h5>
                    </div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-md-6">
                                <div class="stats-card">
                                    <div class="number">${stats.detection_rate}%</div>
                                    <div class="label">Taxa de Detecção</div>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="stats-card">
                                    <div class="number">${stats.false_positives}</div>
                                    <div class="label">Falsos Positivos</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="card">
                    <div class="card-header">
                        <h5 class="card-title mb-0">Distribuição de Jogadores</h5>
                    </div>
                    <div class="card-body">
                        <canvas id="statsChart"></canvas>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Função para inicializar os gráficos do dashboard
function initDashboardCharts() {
    const ctx = document.getElementById('playersChart').getContext('2d');
    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Normal', 'Suspeitos', 'Banidos'],
            datasets: [{
                data: [70, 20, 10],
                backgroundColor: ['#28a745', '#ffc107', '#dc3545']
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });
}

// Função para inicializar os gráficos das estatísticas
function initStatsCharts() {
    const ctx = document.getElementById('statsChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Normal', 'Suspeitos', 'Banidos'],
            datasets: [{
                label: 'Número de Jogadores',
                data: [70, 20, 10],
                backgroundColor: ['#28a745', '#ffc107', '#dc3545']
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Event listeners para navegação
document.addEventListener('DOMContentLoaded', () => {
    // Carregar a página inicial (dashboard)
    loadPage('dashboard');
    
    // Adicionar event listeners para os links de navegação
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const page = e.target.closest('.nav-link').dataset.page;
            
            // Atualizar a classe active
            document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
            e.target.closest('.nav-link').classList.add('active');
            
            // Carregar a página
            loadPage(page);
        });
    });
}); 