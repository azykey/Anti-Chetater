from quantum_ml_predictor import QuantumMLPredictor
from player_reputation import PlayerReputation
import subprocess
import json
import time
from datetime import datetime

class QuantumAntiCheatIntegrated:
    def __init__(self):
        self.ml_predictor = QuantumMLPredictor()
        self.reputation_system = PlayerReputation()
        self.memory_monitor = None
        self.game_process_id = None
        
    def initialize(self, game_process_id):
        """Inicializa todos os sistemas"""
        self.game_process_id = game_process_id
        self.ml_predictor.load_model()
        
        # Inicializa monitor de memória
        try:
            subprocess.run(['memory_monitor.exe', str(game_process_id)], check=True)
            self.memory_monitor = True
        except:
            print("Aviso: Monitor de memória não inicializado")
            self.memory_monitor = False
    
    def monitor_player(self, player_id, player_state, game_state, network_data):
        """Monitora um jogador usando todos os sistemas"""
        results = {
            'player_id': player_id,
            'timestamp': datetime.now().isoformat(),
            'detections': []
        }
        
        # 1. Análise ML
        ml_confidence, ml_message = self.ml_predictor.predict(
            player_state, game_state, network_data
        )
        if ml_confidence > 0.7:
            results['detections'].append({
                'type': 'ML_ANALYSIS',
                'confidence': ml_confidence,
                'message': ml_message
            })
        
        # 2. Verificação de Memória
        if self.memory_monitor:
            try:
                memory_result = subprocess.run(
                    ['memory_monitor.exe', 'check', str(self.game_process_id)],
                    capture_output=True, text=True
                )
                if 'Modificações de memória detectadas' in memory_result.stdout:
                    results['detections'].append({
                        'type': 'MEMORY_MODIFICATION',
                        'confidence': 0.9,
                        'message': 'Modificação de memória suspeita detectada'
                    })
            except:
                pass
        
        # 3. Verificação de Reputação
        reputation = self.reputation_system.get_reputation(player_id)
        if reputation < 30:  # Reputação baixa
            results['detections'].append({
                'type': 'REPUTATION_CHECK',
                'confidence': 0.8,
                'message': f'Jogador com reputação baixa: {reputation}'
            })
        
        # Atualiza reputação baseado nas detecções
        if results['detections']:
            severity = max(d['confidence'] for d in results['detections'])
            self.reputation_system.update_reputation(
                player_id, 'cheat_detected', severity
            )
        else:
            self.reputation_system.update_reputation(
                player_id, 'fair_play', 1.0
            )
        
        return results
    
    def get_player_report(self, player_id):
        """Gera relatório completo do jogador"""
        return {
            'player_id': player_id,
            'reputation': {
                'score': self.reputation_system.get_reputation(player_id),
                'level': self.reputation_system.get_reputation_level(player_id),
                'history': self.reputation_system.get_history(player_id)
            },
            'ml_predictions': self.ml_predictor.get_prediction_history(),
            'trust_factor': self.reputation_system.get_trust_factor(player_id)
        }
    
    def _convert_datetime_to_str(self, obj):
        """Converte objetos datetime em strings no formato ISO."""
        if isinstance(obj, dict):
            return {key: self._convert_datetime_to_str(value) for key, value in obj.items()}
        elif isinstance(obj, list):
            return [self._convert_datetime_to_str(item) for item in obj]
        elif isinstance(obj, datetime):
            return obj.isoformat()
        return obj

    def save_report(self, player_id: str) -> str:
        """Salva o relatório do jogador em um arquivo JSON."""
        report = self.get_player_report(player_id)
        # Converte todos os objetos datetime para string antes de salvar
        report = self._convert_datetime_to_str(report)
        
        filename = f"player_report_{player_id}_{int(time.time())}.json"
        with open(filename, 'w') as f:
            json.dump(report, f, indent=4)
        return filename

# Exemplo de uso:
if __name__ == "__main__":
    print("=== Testando Sistema Anti-Cheat Quântico Integrado ===\n")
    
    # Inicializa sistema
    anti_cheat = QuantumAntiCheatIntegrated()
    anti_cheat.initialize(1234)  # ID do processo do jogo
    
    # Cenário 1: Jogador Normal
    print("\n[Teste 1] Jogador com comportamento normal")
    player_normal = {
        'movement_speed': 50,      # Velocidade normal
        'accuracy': 0.65,          # Precisão realista
        'reaction_time': 0.25,     # Tempo de reação humano
        'score_rate': 5            # Taxa de pontuação normal
    }
    
    game_state_normal = {
        'difficulty': 1,
        'time_elapsed': 1800,
        'player_count': 16
    }
    
    network_normal = {
        'latency': 50,
        'packet_loss': 0.01,
        'bandwidth': 1000000
    }
    
    results_normal = anti_cheat.monitor_player(
        "P001", player_normal, game_state_normal, network_normal
    )
    print(f"Detecções para jogador normal: {len(results_normal['detections'])}")
    
    # Cenário 2: Jogador Suspeito
    print("\n[Teste 2] Jogador com comportamento suspeito")
    player_suspicious = {
        'movement_speed': 80,      # Velocidade acima do normal
        'accuracy': 0.85,          # Precisão muito alta
        'reaction_time': 0.15,     # Tempo de reação suspeito
        'score_rate': 8            # Taxa de pontuação alta
    }
    
    game_state_suspicious = {
        'difficulty': 3,
        'time_elapsed': 3600,
        'player_count': 16
    }
    
    network_suspicious = {
        'latency': 100,
        'packet_loss': 0.05,
        'bandwidth': 500000
    }
    
    results_suspicious = anti_cheat.monitor_player(
        "P002", player_suspicious, game_state_suspicious, network_suspicious
    )
    print(f"Detecções para jogador suspeito: {len(results_suspicious['detections'])}")
    
    # Cenário 3: Jogador Trapaceando
    print("\n[Teste 3] Jogador claramente trapaceando")
    player_cheating = {
        'movement_speed': 200,     # Velocidade impossível
        'accuracy': 0.98,          # Precisão sobre-humana
        'reaction_time': 0.05,     # Tempo de reação impossível
        'score_rate': 20           # Taxa de pontuação impossível
    }
    
    game_state_cheating = {
        'difficulty': 5,
        'time_elapsed': 7200,
        'player_count': 16
    }
    
    network_cheating = {
        'latency': 30,
        'packet_loss': 0.001,
        'bandwidth': 2000000
    }
    
    results_cheating = anti_cheat.monitor_player(
        "P003", player_cheating, game_state_cheating, network_cheating
    )
    print(f"Detecções para jogador trapaceando: {len(results_cheating['detections'])}")
    
    # Gera relatórios para todos os jogadores
    print("\n=== Gerando relatórios ===")
    for player_id in ["P001", "P002", "P003"]:
        report_file = anti_cheat.save_report(player_id)
        print(f"Relatório para {player_id} salvo em: {report_file}")
    
    print("\nTestes concluídos!") 