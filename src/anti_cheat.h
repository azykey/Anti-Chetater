#ifndef ANTI_CHEAT_H
#define ANTI_CHEAT_H

#include <string>
#include <vector>
#include <ctime>
#include <iostream>
#include "crypto.h"
#include "utils.h"

class AntiCheat {
private:
    static const std::string GAME_KEY;
    static std::string PLAYER_ID;
    static std::vector<std::string> memoryChecks;
    static std::vector<std::string> processChecks;
    static time_t lastCheckTime;

    // Verifica se há modificações na memória
    static bool checkMemoryIntegrity();

    // Verifica processos suspeitos
    static bool checkSuspiciousProcesses();

    // Verifica velocidade do jogo
    static bool checkGameSpeed();

public:
    static void initialize(const std::string& playerId);
    static bool performAntiCheatCheck();
    static std::string generatePlayerHash();
    static void logCheatAttempt(const std::string& details);
};

#endif // ANTI_CHEAT_H 