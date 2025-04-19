from datetime import datetime, timedelta
import numpy as np

class PlayerReputation:
    def __init__(self):
        self.reputations = {}  # player_id -> reputation_score
        self.history = {}      # player_id -> list of events
        self.trust_factors = {}  # player_id -> trust_factor
        self.decay_rate = 0.95  # Taxa de decaimento diário
        self.min_score = 0.0
        self.max_score = 100.0
        
    def get_reputation(self, player_id: str) -> float:
        """Retorna a reputação atual do jogador (0-100)"""
        return self.reputations.get(player_id, 50.0)  # Começa com 50
        
    def get_reputation_level(self, player_id: str) -> str:
        """Retorna o nível de reputação do jogador"""
        reputation = self.get_reputation(player_id)
        if reputation >= 80:
            return "CONFIÁVEL"
        elif reputation >= 50:
            return "NORMAL"
        elif reputation >= 30:
            return "SUSPEITO"
        else:
            return "NÃO CONFIÁVEL"
            
    def update_reputation(self, player_id: str, event_type: str, severity: float):
        """Atualiza a reputação do jogador baseado em eventos"""
        if player_id not in self.history:
            self.history[player_id] = []
            
        # Registra o evento
        event = {
            'timestamp': datetime.now(),
            'type': event_type,
            'severity': severity
        }
        self.history[player_id].append(event)
        
        # Atualiza reputação
        current_reputation = self.get_reputation(player_id)
        
        if event_type == 'cheat_detected':
            # Reduz reputação baseado na severidade
            reduction = 20 * severity
            new_reputation = max(0, current_reputation - reduction)
        elif event_type == 'fair_play':
            # Aumenta reputação lentamente
            increase = 2 * severity
            new_reputation = min(100, current_reputation + increase)
        else:
            return
            
        self.reputations[player_id] = new_reputation
        
        # Atualiza fator de confiança
        self._update_trust_factor(player_id)
        
    def get_history(self, player_id: str) -> list:
        """Retorna o histórico de eventos do jogador"""
        return self.history.get(player_id, [])
        
    def get_trust_factor(self, player_id: str) -> float:
        """Retorna o fator de confiança do jogador (0-1)"""
        return self.trust_factors.get(player_id, 0.5)
        
    def _update_trust_factor(self, player_id: str):
        """Atualiza o fator de confiança baseado no histórico recente"""
        history = self.get_history(player_id)
        if not history:
            self.trust_factors[player_id] = 0.5
            return
            
        # Considera apenas os últimos 10 eventos
        recent_events = history[-10:]
        
        # Calcula a média ponderada das severidades
        total_weight = 0
        weighted_sum = 0
        
        for i, event in enumerate(recent_events):
            weight = (i + 1) / len(recent_events)  # Eventos mais recentes têm mais peso
            if event['type'] == 'cheat_detected':
                weighted_sum -= event['severity'] * weight
            else:  # fair_play
                weighted_sum += event['severity'] * weight
            total_weight += weight
            
        trust_factor = 0.5 + (weighted_sum / total_weight) * 0.5
        trust_factor = max(0, min(1, trust_factor))  # Limita entre 0 e 1
        
        self.trust_factors[player_id] = trust_factor
    
    def get_players_by_reputation(self, min_score=None, max_score=None):
        """Retorna lista de jogadores filtrada por score"""
        filtered_players = []
        for player_id, score in self.reputations.items():
            if min_score is not None and score < min_score:
                continue
            if max_score is not None and score > max_score:
                continue
            filtered_players.append({
                'player_id': player_id,
                'score': score,
                'level': self.get_reputation_level(player_id)
            })
        return sorted(filtered_players, key=lambda x: x['score'], reverse=True) 