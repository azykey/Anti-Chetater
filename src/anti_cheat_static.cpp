#include "anti_cheat.h"

// Inicialização das variáveis estáticas
const std::string AntiCheat::GAME_KEY = "ADILSON_GAME_SECURITY_2024";
std::string AntiCheat::PLAYER_ID = "";
std::vector<std::string> AntiCheat::memoryChecks;
std::vector<std::string> AntiCheat::processChecks;
time_t AntiCheat::lastCheckTime = 0; 