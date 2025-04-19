import numpy as np
from enum import Enum
import random
from datetime import datetime

class QuantumState(Enum):
    NORMAL = 0
    SUSPICIOUS = 1
    CHEATING = 2

class WarningLevel(Enum):
    NONE = 0
    LOW = 1
    MEDIUM = 2
    HIGH = 3

class Player:
    def __init__(self, player_id, name):
        self.player_id = player_id
        self.name = name
        self.warnings = []
        self.total_violations = 0
        self.last_check_time = datetime.now()

class Warning:
    def __init__(self, player, warning_level, description):
        self.player = player
        self.timestamp = datetime.now()
        self.warning_level = warning_level
        self.description = description

class QuantumAntiCheat:
    def __init__(self):
        # Matriz de transição de estados quânticos ajustada
        self.transition_matrix = np.array([
            [0.9, 0.08, 0.02],  # NORMAL -> [NORMAL, SUSPICIOUS, CHEATING]
            [0.3, 0.6, 0.1],    # SUSPICIOUS -> [NORMAL, SUSPICIOUS, CHEATING]
            [0.05, 0.15, 0.8]   # CHEATING -> [NORMAL, SUSPICIOUS, CHEATING]
        ])
        self.current_state = QuantumState.NORMAL
        self.confidence = 1.0
        self.players = {}
        self.warning_threshold = {
            WarningLevel.LOW: 0.85,      # Mais sensível para avisos leves
            WarningLevel.MEDIUM: 0.70,   # Mais sensível para avisos médios
            WarningLevel.HIGH: 0.50      # Mais sensível para avisos graves
        }

    def register_player(self, player_id, name):
        """Registra um novo jogador no sistema"""
        player = Player(player_id, name)
        self.players[player_id] = player
        return player

    def update_state(self, player_id, player_behavior):
        """
        Atualiza o estado quântico baseado no comportamento do jogador
        player_behavior: 0 (normal), 1 (suspeito), 2 (cheating)
        """
        if player_id not in self.players:
            raise ValueError(f"Jogador {player_id} não registrado no sistema!")

        player = self.players[player_id]
        
        # Calcula a probabilidade de transição
        probabilities = self.transition_matrix[self.current_state.value]
        
        # Adiciona ruído quântico
        noise = np.random.normal(0, 0.1, size=3)
        probabilities = np.clip(probabilities + noise, 0, 1)
        probabilities = probabilities / np.sum(probabilities)
        
        # Atualiza o estado
        self.current_state = QuantumState(np.random.choice(3, p=probabilities))
        
        # Atualiza a confiança
        self.confidence = self._calculate_anomaly_probability(player_behavior)
        
        # Verifica se precisa emitir avisos
        self._check_and_issue_warnings(player)
        
        return self.current_state, self.confidence

    def _calculate_anomaly_probability(self, player_behavior):
        """Calcula a probabilidade de anomalia baseada no estado do jogador"""
        if self.current_state == QuantumState.NORMAL:
            return max(0.3, 1.0 - player_behavior * 0.3)
        elif self.current_state == QuantumState.SUSPICIOUS:
            return 0.4 + player_behavior * 0.3
        else:
            return 0.6 + player_behavior * 0.2

    def _check_and_issue_warnings(self, player):
        """Verifica e emite avisos baseado no nível de confiança"""
        warning_level = None
        description = None

        if self.confidence <= self.warning_threshold[WarningLevel.HIGH]:
            warning_level = WarningLevel.HIGH
            description = f"ALERTA CRÍTICO: Jogador {player.name} apresenta comportamento altamente suspeito!"
        elif self.confidence <= self.warning_threshold[WarningLevel.MEDIUM]:
            warning_level = WarningLevel.MEDIUM
            description = f"AVISO: Jogador {player.name} apresenta comportamento moderadamente suspeito."
        elif self.confidence <= self.warning_threshold[WarningLevel.LOW]:
            warning_level = WarningLevel.LOW
            description = f"NOTIFICAÇÃO: Jogador {player.name} apresenta comportamento levemente suspeito."

        if warning_level:
            warning = Warning(player, warning_level, description)
            player.warnings.append(warning)
            player.total_violations += 1
            return warning
        return None

    def get_player_status(self, player_id):
        """Retorna o status atual do jogador"""
        if player_id not in self.players:
            raise ValueError(f"Jogador {player_id} não registrado no sistema!")
        
        player = self.players[player_id]
        return {
            'player_id': player.player_id,
            'name': player.name,
            'total_violations': player.total_violations,
            'recent_warnings': [
                {
                    'level': w.warning_level.name,
                    'description': w.description,
                    'timestamp': w.timestamp.strftime('%Y-%m-%d %H:%M:%S')
                }
                for w in player.warnings[-3:]  # Mostra os 3 últimos avisos
            ]
        }

def test_system():
    print("\n=== TESTE DO SISTEMA ANTI-CHEAT QUÂNTICO ===\n")
    
    # 1. Teste de Registro de Jogadores
    print("1. Teste de Registro de Jogadores")
    print("-" * 40)
    anti_cheat = QuantumAntiCheat()
    player1 = anti_cheat.register_player("P001", "João")
    print(f"Jogador registrado: ID={player1.player_id}, Nome={player1.name}")
    
    # 2. Teste de Comportamento Normal
    print("\n2. Teste de Comportamento Normal")
    print("-" * 40)
    state, confidence = anti_cheat.update_state("P001", 0)
    print(f"Estado: {state.name}")
    print(f"Confiança: {confidence:.2f}")
    
    # 3. Teste de Comportamento Suspeito
    print("\n3. Teste de Comportamento Suspeito")
    print("-" * 40)
    state, confidence = anti_cheat.update_state("P001", 1)
    print(f"Estado: {state.name}")
    print(f"Confiança: {confidence:.2f}")
    status = anti_cheat.get_player_status("P001")
    if status['recent_warnings']:
        print("\nAvisos gerados:")
        for warning in status['recent_warnings']:
            print(f"- {warning['level']}: {warning['description']}")
    
    # 4. Teste de Comportamento de Trapaça
    print("\n4. Teste de Comportamento de Trapaça")
    print("-" * 40)
    state, confidence = anti_cheat.update_state("P001", 2)
    print(f"Estado: {state.name}")
    print(f"Confiança: {confidence:.2f}")
    status = anti_cheat.get_player_status("P001")
    if status['recent_warnings']:
        print("\nAvisos gerados:")
        for warning in status['recent_warnings']:
            print(f"- {warning['level']}: {warning['description']}")
    
    # 5. Teste de Múltiplos Jogadores
    print("\n5. Teste de Múltiplos Jogadores")
    print("-" * 40)
    player2 = anti_cheat.register_player("P002", "Maria")
    anti_cheat.update_state("P002", 0)  # comportamento normal
    anti_cheat.update_state("P002", 2)  # comportamento de trapaça
    
    print("\nStatus dos jogadores:")
    for player_id in ["P001", "P002"]:
        status = anti_cheat.get_player_status(player_id)
        print(f"\nJogador: {status['name']}")
        print(f"Total de violações: {status['total_violations']}")
        if status['recent_warnings']:
            print("Avisos recentes:")
            for warning in status['recent_warnings']:
                print(f"- {warning['level']}: {warning['description']}")
                print(f"  Em: {warning['timestamp']}")

if __name__ == "__main__":
    test_system() 