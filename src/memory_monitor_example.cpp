#include "memory_monitor.cpp"

// Exemplo de uso do MemoryMonitor
int memory_monitor_main() {
    try {
        // Substitua pelo ID do processo do jogo
        MemoryMonitor monitor(1234);
        
        // Tira snapshot inicial
        monitor.TakeSnapshot("initial");
        
        // Aguarda algum tempo
        Sleep(5000);
        
        // Tira outro snapshot
        monitor.TakeSnapshot("after_delay");
        
        // Compara os snapshots
        auto differences = monitor.CompareSnapshots("initial", "after_delay");
        
        // Verifica por modificações suspeitas
        if (!differences.empty()) {
            std::cout << "Modificações de memória detectadas:" << std::endl;
            for (const auto& diff : differences) {
                std::cout << diff << std::endl;
            }
        }
        
        // Procura por padrões conhecidos de cheats
        std::vector<BYTE> cheatPattern = {0x90, 0x90, 0x90}; // Exemplo de padrão
        if (monitor.ScanForPattern(cheatPattern)) {
            std::cout << "Padrão de cheat detectado!" << std::endl;
        }
        
    } catch (const std::exception& e) {
        std::cerr << "Erro: " << e.what() << std::endl;
        return 1;
    }
    
    return 0;
}

int main() {
    return memory_monitor_main();
} 