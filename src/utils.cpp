#include "utils.h"
#include <sstream>
#include <iomanip>
#include <cmath>

// Implementação própria de hash simples
std::string calculateHash(const std::string& input) {
    // Implementação simples de hash para demonstração
    // Em um ambiente de produção, use uma função de hash criptográfica adequada
    std::stringstream ss;
    size_t hash = 0;
    
    for (char c : input) {
        hash = hash * 31 + c;
    }
    
    ss << std::hex << std::setw(16) << std::setfill('0') << hash;
    return ss.str();
}

// Função para verificar se um número é primo
bool isPrime(int num) {
    if (num <= 1) return false;
    if (num <= 3) return true;
    
    if (num % 2 == 0 || num % 3 == 0) return false;
    
    for (int i = 5; i * i <= num; i += 6) {
        if (num % i == 0 || num % (i + 2) == 0) {
            return false;
        }
    }
    return true;
} 