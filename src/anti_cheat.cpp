#include "anti_cheat.h"
#include <iostream>

// Implementação das funções estáticas
const std::string AntiCheat::GAME_KEY = "ADILSON_GAME_SECURITY_2024";
std::string AntiCheat::PLAYER_ID = "";
std::vector<std::string> AntiCheat::memoryChecks;
std::vector<std::string> AntiCheat::processChecks;
time_t AntiCheat::lastCheckTime = 0;

// Implementação das funções de verificação
bool AntiCheat::checkMemoryIntegrity() {
    // Simulação de verificação de memória
    std::string memoryHash = calculateHash("MEMORY_CHECK_" + GAME_KEY);
    return memoryHash == calculateHash("MEMORY_CHECK_" + GAME_KEY);
}

bool AntiCheat::checkSuspiciousProcesses() {
    // Simulação de verificação de processos
    std::string processHash = calculateHash("PROCESS_CHECK_" + GAME_KEY);
    return processHash == calculateHash("PROCESS_CHECK_" + GAME_KEY);
}

bool AntiCheat::checkGameSpeed() {
    time_t currentTime = std::time(nullptr);
    double timeDiff = difftime(currentTime, lastCheckTime);
    lastCheckTime = currentTime;
    
    // Verifica se o jogo está rodando em velocidade normal
    return timeDiff >= 0.9 && timeDiff <= 1.1; // Esperado: 1 segundo
}

void AntiCheat::initialize(const std::string& playerId) {
    PLAYER_ID = playerId;
    lastCheckTime = std::time(nullptr);
    
    // Adiciona verificações de memória
    memoryChecks.push_back("GAME_MEMORY_1");
    memoryChecks.push_back("GAME_MEMORY_2");
    memoryChecks.push_back("GAME_MEMORY_3");
    
    // Adiciona verificações de processos
    processChecks.push_back("CHEAT_ENGINE");
    processChecks.push_back("ART_MONEY");
    processChecks.push_back("GAME_GUARDIAN");
}

bool AntiCheat::performAntiCheatCheck() {
    if (!checkMemoryIntegrity()) {
        std::cout << "ALERTA: Modificação de memória detectada!" << std::endl;
        return false;
    }

    if (!checkSuspiciousProcesses()) {
        std::cout << "ALERTA: Processo suspeito detectado!" << std::endl;
        return false;
    }

    if (!checkGameSpeed()) {
        std::cout << "ALERTA: Velocidade do jogo alterada!" << std::endl;
        return false;
    }

    return true;
}

std::string AntiCheat::generatePlayerHash() {
    std::string playerData = PLAYER_ID + "_" + GAME_KEY;
    return calculateHash(playerData);
}

void AntiCheat::logCheatAttempt(const std::string& details) {
    std::string encryptedLog = Crypto::encryptMessage(details, GAME_KEY);
    std::cout << "Tentativa de trapaça detectada: " << encryptedLog << std::endl;
} 