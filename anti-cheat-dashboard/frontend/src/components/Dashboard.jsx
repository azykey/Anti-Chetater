import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Grid, 
  Paper, 
  Typography, 
  Card, 
  CardContent,
  Alert
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const Dashboard = () => {
  const [players, setPlayers] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [stats, setStats] = useState({
    totalPlayers: 0,
    suspiciousPlayers: 0,
    bannedPlayers: 0
  });

  // Dados de exemplo para o gráfico
  const detectionData = [
    { name: 'Jan', detections: 12 },
    { name: 'Fev', detections: 19 },
    { name: 'Mar', detections: 15 },
    { name: 'Abr', detections: 8 },
    { name: 'Mai', detections: 11 },
    { name: 'Jun', detections: 6 },
  ];

  // Colunas para a tabela de jogadores
  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'name', headerName: 'Nome', width: 130 },
    { field: 'status', headerName: 'Status', width: 130 },
    { field: 'reputation', headerName: 'Reputação', width: 130 },
    { field: 'lastSeen', headerName: 'Última Atividade', width: 160 },
  ];

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Painel de Controle Anti-Cheat
      </Typography>

      {/* Cards de Estatísticas */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Total de Jogadores
              </Typography>
              <Typography variant="h4">
                {stats.totalPlayers}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Jogadores Suspeitos
              </Typography>
              <Typography variant="h4" color="warning.main">
                {stats.suspiciousPlayers}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Jogadores Banidos
              </Typography>
              <Typography variant="h4" color="error.main">
                {stats.bannedPlayers}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Gráfico de Detecções */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Detecções por Mês
        </Typography>
        <LineChart width={800} height={300} data={detectionData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="detections" stroke="#8884d8" />
        </LineChart>
      </Paper>

      {/* Tabela de Jogadores */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Lista de Jogadores
        </Typography>
        <div style={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={players}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection
          />
        </div>
      </Paper>

      {/* Alertas Recentes */}
      <Paper sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>
          Alertas Recentes
        </Typography>
        {alerts.map((alert, index) => (
          <Alert key={index} severity={alert.severity} sx={{ mb: 1 }}>
            {alert.message}
          </Alert>
        ))}
      </Paper>
    </Box>
  );
};

export default Dashboard; 