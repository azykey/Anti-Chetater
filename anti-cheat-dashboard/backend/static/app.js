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
        <div class="row">
            <div class="col-12">
                <div class="card">
                    <div class="card-header d-flex justify-content-between align-items-center">
                        <h5 class="card-title mb-0">Lista de Jogadores</h5>
                        <div class="btn-group">
                            <button class="btn btn-sm btn-outline-primary" onclick="sortPlayers('name')">
                                <i class="bi bi-sort-alpha-down"></i> Nome
                            </button>
                            <button class="btn btn-sm btn-outline-primary" onclick="sortPlayers('reputation')">
                                <i class="bi bi-sort-numeric-down"></i> Reputação
                            </button>
                        </div>
                    </div>
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-hover">
                                <thead class="table-light">
                                    <tr>
                                        <th>ID</th>
                                        <th>Nome</th>
                                        <th>Status</th>
                                        <th>Reputação</th>
                                        <th>Última Atividade</th>
                                        <th>Ações</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${players.map(player => `
                                        <tr>
                                            <td>${player.id}</td>
                                            <td>
                                                <div class="d-flex align-items-center">
                                                    <div class="avatar me-2">
                                                        <i class="bi bi-person-circle"></i>
                                                    </div>
                                                    <div>
                                                        <div class="fw-bold">${player.name}</div>
                                                        <small class="text-muted">ID: ${player.id}</small>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <span class="badge bg-${getStatusColor(player.status)}">
                                                    <i class="bi ${getStatusIcon(player.status)}"></i>
                                                    ${player.status}
                                                </span>
                                            </td>
                                            <td>
                                                <div class="progress" style="height: 20px;">
                                                    <div class="progress-bar ${getReputationColor(player.reputation)}" 
                                                         role="progressbar" 
                                                         style="width: ${player.reputation}%"
                                                         aria-valuenow="${player.reputation}" 
                                                         aria-valuemin="0" 
                                                         aria-valuemax="100">
                                                        ${player.reputation}%
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <div class="d-flex flex-column">
                                                    <span>${formatDate(player.lastSeen)}</span>
                                                    <small class="text-muted">${formatTimeAgo(player.lastSeen)}</small>
                                                </div>
                                            </td>
                                            <td>
                                                <div class="btn-group">
                                                    <button class="btn btn-sm btn-outline-primary" onclick="viewPlayerDetails(${player.id})">
                                                        <i class="bi bi-eye"></i>
                                                    </button>
                                                    <button class="btn btn-sm btn-outline-warning" onclick="editPlayer(${player.id})">
                                                        <i class="bi bi-pencil"></i>
                                                    </button>
                                                    <button class="btn btn-sm btn-outline-danger" onclick="banPlayer(${player.id})">
                                                        <i class="bi bi-ban"></i>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    `).join('')}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Funções auxiliares para formatação
function getStatusColor(status) {
    switch(status) {
        case 'Normal': return 'success';
        case 'Suspicious': return 'warning';
        case 'Banned': return 'danger';
        default: return 'secondary';
    }
}

function getStatusIcon(status) {
    switch(status) {
        case 'Normal': return 'bi-check-circle';
        case 'Suspicious': return 'bi-exclamation-triangle';
        case 'Banned': return 'bi-x-circle';
        default: return 'bi-question-circle';
    }
}

function getReputationColor(reputation) {
    if (reputation >= 80) return 'bg-success';
    if (reputation >= 50) return 'bg-warning';
    return 'bg-danger';
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
}

function formatTimeAgo(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now - date;
    
    const minutes = Math.floor(diff / 60000);
    if (minutes < 60) return `${minutes} minutos atrás`;
    
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} horas atrás`;
    
    const days = Math.floor(hours / 24);
    return `${days} dias atrás`;
}

// Funções para ações dos jogadores
function viewPlayerDetails(playerId) {
    // Implementar visualização de detalhes do jogador
    console.log(`Visualizando detalhes do jogador ${playerId}`);
}

function editPlayer(playerId) {
    // Implementar edição do jogador
    console.log(`Editando jogador ${playerId}`);
}

function banPlayer(playerId) {
    // Implementar banimento do jogador
    console.log(`Banindo jogador ${playerId}`);
}

function sortPlayers(criteria) {
    // Implementar ordenação dos jogadores
    console.log(`Ordenando por ${criteria}`);
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