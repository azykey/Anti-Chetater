#include <iostream>
#include <string>
#include <thread>
#include <chrono>
#include "anti_cheat.h"

class Game {
private:
    int playerScore;
    bool isRunning;

    void gameLoop() {
        while (isRunning) {
            // Verifica anti-cheat a cada segundo
            if (!AntiCheat::performAntiCheatCheck()) {
                std::cout << "Jogo encerrado devido a tentativa de trapaça!" << std::endl;
                isRunning = false;
                return;
            }

            // Simulação de gameplay
            playerScore += 10;
            std::cout << "Pontuação atual: " << playerScore << std::endl;

            // Espera 1 segundo
            std::this_thread::sleep_for(std::chrono::seconds(1));
        }
    }

public:
    Game() : playerScore(0), isRunning(true) {}

    void start(const std::string& playerId) {
        // Inicializa o anti-cheat
        AntiCheat::initialize(playerId);
        
        std::cout << "=== Jogo Iniciado ===" << std::endl;
        std::cout << "Jogador: " << playerId << std::endl;
        std::cout << "Hash do Jogador: " << AntiCheat::generatePlayerHash() << std::endl;
        std::cout << "===================" << std::endl;

        // Inicia o loop do jogo
        gameLoop();
    }

    void stop() {
        isRunning = false;
    }
};

int main() {
    std::cout << "=== Sistema Anti-Cheat para Jogos ===" << std::endl;
    std::cout << "Desenvolvido por Adilson Oliveira (Key)" << std::endl;

    // Cria uma instância do jogo
    Game game;
    
    // Inicia o jogo com o ID do jogador
    game.start("JOGADOR_123");

    return 0;
} 