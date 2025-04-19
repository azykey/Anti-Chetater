import numpy as np
from datetime import datetime

class QuantumMLPredictor:
    def __init__(self):
        self.prediction_history = []
        self.model_loaded = False
        
    def load_model(self):
        """Simula o carregamento do modelo"""
        self.model_loaded = True
        
    def predict(self, player_state, game_state, network_data):
        """Analisa o comportamento do jogador usando métricas e limites"""
        if not self.model_loaded:
            return 0.0, "Modelo não carregado"
            
        # Calcula pontuação de suspeita baseada em várias métricas
        suspicion_score = 0.0
        messages = []
        
        # 1. Verifica velocidade de movimento
        if player_state['movement_speed'] > 100:  # Velocidade máxima realista
            suspicion_score += 0.3
            messages.append("Velocidade de movimento anormal")
            
        # 2. Verifica precisão
        if player_state['accuracy'] > 0.8:  # Precisão muito alta
            suspicion_score += 0.3
            messages.append("Precisão sobre-humana")
            
        # 3. Verifica tempo de reação
        if player_state['reaction_time'] < 0.1:  # Tempo de reação impossível
            suspicion_score += 0.2
            messages.append("Tempo de reação impossível")
            
        # 4. Verifica taxa de pontuação em relação à dificuldade
        expected_score_rate = game_state['difficulty'] * 2
        if player_state['score_rate'] > expected_score_rate * 1.5:
            suspicion_score += 0.2
            messages.append("Taxa de pontuação muito alta para o nível de dificuldade")
            
        # Registra a predição no histórico
        prediction = {
            'timestamp': datetime.now(),
            'suspicion_score': suspicion_score,
            'messages': messages
        }
        self.prediction_history.append(prediction)
        
        # Retorna confiança e mensagem
        message = " | ".join(messages) if messages else "Comportamento normal"
        return suspicion_score, message
        
    def get_prediction_history(self):
        """Retorna o histórico de predições"""
        return self.prediction_history 