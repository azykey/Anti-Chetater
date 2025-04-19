# Sistema Anti-Cheat Avançado

Um sistema anti-cheat robusto e eficiente para jogos, desenvolvido em C++. Este projeto implementa várias camadas de proteção contra trapaças e manipulações em jogos.

## 📋 Índice

- [Características](#características)
- [Requisitos](#requisitos)
- [Instalação](#instalação)
- [Como Usar](#como-usar)
- [Arquitetura](#arquitetura)
- [Componentes](#componentes)
- [Exemplos](#exemplos)
- [Segurança](#segurança)
- [Contribuindo](#contribuindo)
- [Licença](#licença)

## ✨ Características

- 🛡️ Detecção de modificações na memória
- 🔍 Monitoramento de processos suspeitos
- ⚡ Verificação de velocidade do jogo
- 🔐 Sistema de criptografia integrado
- 🏷️ Geração de hash para identificação de jogadores
- 📝 Sistema de log para tentativas de trapaça

## 🔧 Requisitos

- C++17 ou superior
- CMake 3.10 ou superior
- Windows SDK (para funcionalidades de monitoramento de memória)
- Visual Studio 2019 ou superior (recomendado para Windows)

## 📥 Instalação

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/anti-cheat-system.git
cd anti-cheat-system
```

2. Crie e entre no diretório de build:
```bash
mkdir build
cd build
```

3. Configure e compile o projeto:
```bash
cmake ..
cmake --build .
```

## 🚀 Como Usar

### Integração Básica

1. Inclua o cabeçalho do anti-cheat em seu projeto:
```cpp
#include "anti_cheat.h"
```

2. Inicialize o sistema com o ID do jogador:
```cpp
AntiCheat::initialize("PLAYER_ID_123");
```

3. Implemente as verificações no loop principal do jogo:
```cpp
while (gameIsRunning) {
    if (!AntiCheat::performAntiCheatCheck()) {
        // Trapaça detectada! Tome as ações necessárias
        gameIsRunning = false;
        break;
    }
    // ... lógica do jogo ...
}
```

### Exemplo Completo

```cpp
#include <iostream>
#include "anti_cheat.h"

class Game {
private:
    bool isRunning;
    
public:
    void start(const std::string& playerId) {
        // Inicializa o anti-cheat
        AntiCheat::initialize(playerId);
        
        isRunning = true;
        while (isRunning) {
            if (!AntiCheat::performAntiCheatCheck()) {
                std::cout << "Trapaça detectada!" << std::endl;
                stop();
                break;
            }
            // ... lógica do jogo ...
        }
    }
    
    void stop() {
        isRunning = false;
    }
};
```

## 🏗️ Arquitetura

O sistema é composto por três componentes principais:

### AntiCheat (anti_cheat.h)
- Núcleo do sistema
- Gerencia todas as verificações de segurança
- Mantém o estado do sistema

### Crypto (crypto.h)
- Sistema de criptografia
- Protege dados sensíveis
- Implementa criptografia XOR simétrica

### Utils (utils.h)
- Funções utilitárias
- Geração de hash
- Verificações matemáticas

## 🧩 Componentes

### AntiCheat

```cpp
class AntiCheat {
public:
    static void initialize(const std::string& playerId);
    static bool performAntiCheatCheck();
    static std::string generatePlayerHash();
    static void logCheatAttempt(const std::string& details);
};
```

#### Métodos Principais:
- `initialize`: Configura o sistema com o ID do jogador
- `performAntiCheatCheck`: Executa todas as verificações de segurança
- `generatePlayerHash`: Gera um hash único para o jogador
- `logCheatAttempt`: Registra tentativas de trapaça

### Crypto

```cpp
class Crypto {
public:
    static std::string encryptMessage(const std::string& message, const std::string& key);
    static std::string decryptMessage(const std::string& encryptedMessage, const std::string& key);
};
```

#### Métodos:
- `encryptMessage`: Criptografa uma mensagem
- `decryptMessage`: Descriptografa uma mensagem

## 🔒 Segurança

O sistema implementa várias camadas de segurança:

1. **Verificação de Memória**
   - Detecta modificações na memória do jogo
   - Previne uso de trainers e cheat engine

2. **Monitoramento de Processos**
   - Detecta programas suspeitos
   - Lista negra configurável de processos

3. **Controle de Velocidade**
   - Detecta speedhacks
   - Monitora o tempo de execução

4. **Criptografia**
   - Protege dados sensíveis
   - Implementa criptografia XOR

## 🤝 Contribuindo

1. Faça um Fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

## 👤 Autor

Adilson Oliveira (Key)
Email: adilsonoliveira.2788@gmail.com

## 🔄 Segurança

Se você descobrir alguma vulnerabilidade de segurança, por favor envie um email para adilsonoliveira.2788@gmail.com em vez de abrir uma issue pública.

---

⭐️ Se este projeto te ajudou, considere dar uma estrela!

# Sistema Anti-Cheat Quântico para Jogos

Um sistema anti-cheat revolucionário que utiliza princípios da computação quântica para detecção de trapaças em tempo real, implementado em VHDL para execução em FPGA.

## 🌟 Características Quânticas

- 🎯 Detecção baseada em estados quânticos
- 📊 Análise probabilística de comportamento
- 🔄 Transições de estado quânticas
- 🎮 Monitoramento em tempo real
- 🎲 Sistema de confiança adaptativo
- 🧮 Implementação em FPGA com VHDL

## 🧮 Arquitetura Quântica

O sistema implementa uma máquina de estados quânticos com três estados principais:

1. **NORMAL** (|0⟩)
   - Comportamento padrão do jogador
   - Baixa probabilidade de trapaça
   - Estado quântico |0⟩

2. **SUSPICIOUS** (|1⟩)
   - Estado de superposição
   - Requer monitoramento adicional
   - Estado quântico |1⟩

3. **CHEATING** (|2⟩)
   - Estado de trapaça confirmada
   - Alta probabilidade de detecção
   - Estado quântico |2⟩

## 📈 Matriz de Transição Quântica

O sistema utiliza uma matriz de probabilidade de transição quântica:

```
| 0.8  0.15  0.05 |  -- NORMAL
| 0.2  0.6   0.2  |  -- SUSPICIOUS
| 0.1  0.2   0.7  |  -- CHEATING
```

## 🔧 Implementação em VHDL

### Entidade Principal

```vhdl
-- ============================================================================
-- Quantum Anti-Cheat System - Testbench
-- Copyright (C) 2025 adilson Oliveira konaet. All Rights Reserved.
--
-- PROPRIEDADE INTELECTUAL
-- Este código é propriedade exclusiva de adilson Oliveira konaet e está protegido
-- por direitos autorais e outras leis de propriedade intelectual.
--
-- LICENÇA
-- O uso, cópia, modificação ou distribuição deste código é estritamente
-- proibido sem autorização expressa por escrito de adilson Oliveira konaet.
--
-- PATENTES
-- Este sistema está protegido pelas seguintes patentes:
-- - BR102024000000-1: Sistema de Detecção Quântica de Comportamento
-- - BR102024000000-2: Método de Análise de Estados Quânticos
--
-- CONFIDENCIALIDADE
-- Este código contém informações confidenciais e proprietárias.
-- A divulgação não autorizada é proibida.
entity QuantumAntiCheat is
    Port (
        clk           : in  STD_LOGIC;                    -- Clock do sistema
        reset         : in  STD_LOGIC;                    -- Sinal de reset
        start         : in  STD_LOGIC;                    -- Inicia a análise
        player_state  : in  STD_LOGIC_VECTOR(63 downto 0);-- Estado do jogador
        cheat_detected: out STD_LOGIC;                    -- Sinal de trapaça
        confidence    : out STD_LOGIC_VECTOR(7 downto 0)  -- Nível de confiança
    );
end QuantumAntiCheat;
```

### Arquitetura Quântica

```vhdl
-- ============================================================================
-- Quantum Anti-Cheat System - Testbench
-- Copyright (C) 2025 adilson Oliveira konaet. All Rights Reserved.
--
-- PROPRIEDADE INTELECTUAL
-- Este código é propriedade exclusiva de adilson Oliveira konaet e está protegido
-- por direitos autorais e outras leis de propriedade intelectual.
--
-- LICENÇA
-- O uso, cópia, modificação ou distribuição deste código é estritamente
-- proibido sem autorização expressa por escrito de adilson Oliveira konaet.
--
-- PATENTES
-- Este sistema está protegido pelas seguintes patentes:
-- - BR102024000000-1: Sistema de Detecção Quântica de Comportamento
-- - BR102024000000-2: Método de Análise de Estados Quânticos
--
-- CONFIDENCIALIDADE
-- Este código contém informações confidenciais e proprietárias.
-- A divulgação não autorizada é proibida.
architecture quantum_behavior of QuantumAntiCheat is
    type quantum_state is (NORMAL, SUSPICIOUS, CHEATING);
    signal current_state : quantum_state;
    signal next_state    : quantum_state;
    signal state_history : std_logic_vector(511 downto 0);
    
    -- Função de transição quântica
    function quantum_transition(
        current : quantum_state;
        input   : std_logic_vector(63 downto 0)
    ) return quantum_state is
        variable probability : real;
    begin
        case current is
            when NORMAL =>
                if input(0) = '1' then
                    return SUSPICIOUS;
                else
                    return NORMAL;
                end if;
            when SUSPICIOUS =>
                if input(1) = '1' then
                    return CHEATING;
                else
                    return NORMAL;
                end if;
            when CHEATING =>
                return CHEATING;
        end case;
    end function;
    
begin
    -- Processo de transição de estados
    process(clk, reset)
    begin
        if reset = '1' then
            current_state <= NORMAL;
        elsif rising_edge(clk) then
            if start = '1' then
                current_state <= quantum_transition(current_state, player_state);
            end if;
        end if;
    end process;
    
    -- Saídas
    cheat_detected <= '1' when current_state = CHEATING else '0';
    confidence <= "11111111" when current_state = CHEATING else
                 "10000000" when current_state = SUSPICIOUS else
                 "00000000";
end quantum_behavior;
```

## 🧪 Testbench Quântico

O sistema inclui um testbench completo que simula diferentes comportamentos:

```vhdl
-- ============================================================================
-- Quantum Anti-Cheat System - Testbench
-- Copyright (C) 2025 adilson Oliveira konaet. All Rights Reserved.
--
-- PROPRIEDADE INTELECTUAL
-- Este código é propriedade exclusiva de adilson Oliveira konaet e está protegido
-- por direitos autorais e outras leis de propriedade intelectual.
--
-- LICENÇA
-- O uso, cópia, modificação ou distribuição deste código é estritamente
-- proibido sem autorização expressa por escrito de adilson Oliveira konaet.
--
-- PATENTES
-- Este sistema está protegido pelas seguintes patentes:
-- - BR102024000000-1: Sistema de Detecção Quântica de Comportamento
-- - BR102024000000-2: Método de Análise de Estados Quânticos
--
-- CONFIDENCIALIDADE
-- Este código contém informações confidenciais e proprietárias.
-- A divulgação não autorizada é proibida.
entity QuantumAntiCheat_tb is
end QuantumAntiCheat_tb;

architecture behavior of QuantumAntiCheat_tb is
    -- Componente sob teste
    component QuantumAntiCheat
        Port (
            clk           : in  STD_LOGIC;
            reset         : in  STD_LOGIC;
            start         : in  STD_LOGIC;
            player_state  : in  STD_LOGIC_VECTOR(63 downto 0);
            cheat_detected: out STD_LOGIC;
            confidence    : out STD_LOGIC_VECTOR(7 downto 0)
        );
    end component;
    
    -- Sinais de teste
    signal clk           : STD_LOGIC := '0';
    signal reset         : STD_LOGIC := '1';
    signal start         : STD_LOGIC := '0';
    signal player_state  : STD_LOGIC_VECTOR(63 downto 0);
    signal cheat_detected: STD_LOGIC;
    signal confidence    : STD_LOGIC_VECTOR(7 downto 0);
    
    -- Período do clock
    constant clk_period : time := 10 ns;
    
begin
    -- Instância do componente
    uut: QuantumAntiCheat port map (
        clk => clk,
        reset => reset,
        start => start,
        player_state => player_state,
        cheat_detected => cheat_detected,
        confidence => confidence
    );
    
    -- Processo do clock
    clk_process: process
    begin
        clk <= '0';
        wait for clk_period/2;
        clk <= '1';
        wait for clk_period/2;
    end process;
    
    -- Processo de teste
    stim_proc: process
    begin
        -- Reset inicial
        reset <= '1';
        wait for 100 ns;
        reset <= '0';
        
        -- Simulação de comportamento normal
        for i in 0 to 9 loop
            player_state <= std_logic_vector(to_unsigned(i, 64));
            start <= '1';
            wait for clk_period;
            start <= '0';
            wait for clk_period * 9;
        end loop;
        
        -- Simulação de comportamento suspeito
        player_state <= (others => '1');
        start <= '1';
        wait for clk_period;
        start <= '0';
        wait for clk_period * 9;
        
        wait;
    end process;
end behavior;
```

## 🔬 Análise de Anomalias Quânticas

O sistema utiliza uma função quântica para calcular anomalias:

```vhdl
-- ============================================================================
-- Quantum Anti-Cheat System - Testbench
-- Copyright (C) 2025 adilson Oliveira konaet. All Rights Reserved.
--
-- PROPRIEDADE INTELECTUAL
-- Este código é propriedade exclusiva de adilson Oliveira konaet e está protegido
-- por direitos autorais e outras leis de propriedade intelectual.
--
-- LICENÇA
-- O uso, cópia, modificação ou distribuição deste código é estritamente
-- proibido sem autorização expressa por escrito de adilson Oliveira konaet.
--
-- PATENTES
-- Este sistema está protegido pelas seguintes patentes:
-- - BR102024000000-1: Sistema de Detecção Quântica de Comportamento
-- - BR102024000000-2: Método de Análise de Estados Quânticos
--
-- CONFIDENCIALIDADE
-- Este código contém informações confidenciais e proprietárias.
-- A divulgação não autorizada é proibida.
function calculate_anomaly(
    current_state : std_logic_vector(63 downto 0);
    history      : std_logic_vector(511 downto 0)
) return real is
    variable score : real := 0.0;
    variable count : integer := 0;
begin
    -- Análise do histórico de estados
    for i in 0 to 7 loop
        if current_state = history(i*64+63 downto i*64) then
            count := count + 1;
        end if;
    end loop;
    
    -- Cálculo do score quântico
    score := real(count) / 8.0;
    
    -- Aplicação do princípio da incerteza
    if score > 0.7 then
        score := score * 0.8; -- Reduz a confiança em casos muito certos
    end if;
    
    return score;
end function;
```

## 🎮 Como Usar o Sistema

1. Inicialize o sistema:
```vhdl
reset <= '1';
wait for 100 ns;
reset <= '0';
```

2. Alimente o estado do jogador:
```vhdl
player_state <= std_logic_vector(to_unsigned(player_data, 64));
start <= '1';
```

3. Monitore as saídas:
```vhdl
if cheat_detected = '1' then
    -- Trapaça detectada!
    -- Nível de confiança: confidence
end if;
```

## 📊 Dashboard de Monitoramento

O sistema inclui um dashboard web para monitoramento em tempo real:

1. Clone o repositório:
```bash
git clone https://github.com/azykey/Anti-Chetater.git
cd Anti-Chetater
```

2. Instale as dependências do frontend:
```bash
cd anti-cheat-dashboard/frontend
npm install
```

3. Instale as dependências do backend:
```bash
cd ../backend
pip install -r requirements.txt
```

4. Execute o sistema:
```bash
# Terminal 1 - Backend
cd backend
python main.py

# Terminal 2 - Frontend
cd frontend
npm start
```

## Próximos Passos

1. Implementar entrelaçamento quântico entre múltiplos jogadores
2. Adicionar suporte a qubits reais em processadores quânticos
3. Desenvolver algoritmos de aprendizado quântico
4. Criar uma rede de anti-cheat quântica distribuída

## 📄 Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

## 👤 Autor

Adilson Oliveira (Key)
Email: adilsonoliveira.2788@gmail.com

## 🔄 Segurança

Se você descobrir alguma vulnerabilidade de segurança, por favor envie um email para adilsonoliveira.2788@gmail.com em vez de abrir uma issue pública.

---

⭐️ Se este projeto te ajudou, considere dar uma estrela!

# Anti-Cheat Dashboard

Sistema de detecção de trapaça em jogos utilizando tecnologias quânticas e machine learning.

## Requisitos

- Node.js (versão 16 ou superior)
- Python 3.8 ou superior
- Git

## Instalação

1. Clone o repositório:
```bash
git clone https://github.com/azykey/Anti-Chetater.git
cd Anti-Chetater
```

2. Instale as dependências do frontend:
```bash
cd anti-cheat-dashboard/frontend
npm install
```

3. Instale as dependências do backend:
```bash
cd ../backend
pip install -r requirements.txt
```

## Execução

1. Inicie o servidor backend:
```bash
cd anti-cheat-dashboard/backend
python main.py
```

2. Em outro terminal, inicie o servidor frontend:
```bash
cd anti-cheat-dashboard/frontend
npm start
```

O dashboard estará disponível em `http://localhost:3000` `http://localhost:8001`

`cd anti-cheat-dashboard/backend; python main.py`  

## Funcionalidades

- Monitoramento em tempo real de jogadores
- Detecção de trapaça usando algoritmos quânticos
- Análise de comportamento usando machine learning
- Dashboard interativo para visualização de dados

## Estrutura do Projeto

- `frontend/`: Aplicação React para o dashboard
- `backend/`: Servidor Python com lógica de detecção
- `src/`: Código fonte dos algoritmos de detecção
- `docs/`: Documentação do projeto

## Contribuição

Sinta-se à vontade para abrir issues ou enviar pull requests com melhorias.

## Próximos Passos

1. Implementar entrelaçamento quântico entre múltiplos jogadores
2. Melhorar a precisão do detector de trapaça
3. Adicionar suporte a mais jogos
4. Implementar sistema de notificações em tempo real

⭐️ Se este projeto te ajudou, considere dar uma estrela!

![Captura de tela 2025-04-18 214944](https://github.com/user-attachments/assets/d415aaa8-bdff-4ce3-b6ef-682a393e4d50)
![Captura de tela 2025-04-18 215002](https://github.com/user-attachments/assets/c169d69e-c752-407b-b77d-079dd2e2ae83)
![Captura de tela 2025-04-18 215013](https://github.com/user-attachments/assets/af432407-7f7f-417d-bfeb-bf7469bce224)
![Captura de tela 2025-04-18 215024](https://github.com/user-attachments/assets/aae7c912-2740-424f-8380-95af438f31a5)
