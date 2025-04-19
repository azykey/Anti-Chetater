#include <iostream>
#include <string>
#include "../src/crypto.h"
#include "../src/utils.h"
#include "../src/license.h"

void testLicense() {
    std::cout << "\n=== Testando Sistema de Licença ===" << std::endl;
    bool isValid = License::isValid();
    std::cout << "Status da Licença: " << (isValid ? "VÁLIDA" : "INVÁLIDA") << std::endl;
}

void testEncryption() {
    std::cout << "\n=== Testando Criptografia ===" << std::endl;
    std::string message = "Mensagem secreta do Adilson Oliveira";
    std::string key = "chave_secreta_do_key";

    std::string encrypted = Crypto::encryptMessage(message, key);
    std::string decrypted = Crypto::decryptMessage(encrypted, key);

    std::cout << "Mensagem original: " << message << std::endl;
    std::cout << "Mensagem criptografada: " << encrypted << std::endl;
    std::cout << "Mensagem descriptografada: " << decrypted << std::endl;
    std::cout << "Teste de criptografia: " << (message == decrypted ? "PASSOU" : "FALHOU") << std::endl;
}

void testHash() {
    std::cout << "\n=== Testando Hash ===" << std::endl;
    std::string message = "Teste de hash do Adilson Oliveira";
    std::string hash = calculateHash(message);
    
    std::cout << "Mensagem: " << message << std::endl;
    std::cout << "Hash: " << hash << std::endl;
}

void testPrimeNumbers() {
    std::cout << "\n=== Testando Números Primos ===" << std::endl;
    int numbers[] = {2, 3, 4, 5, 6, 7, 8, 9, 10};
    
    for (int num : numbers) {
        std::cout << num << " é primo? " << (isPrime(num) ? "SIM" : "NÃO") << std::endl;
    }
}

int main() {
    std::cout << "=== Iniciando Testes do Projeto Cripto Anti-Cheater ===" << std::endl;
    std::cout << "Desenvolvido por Adilson Oliveira (Key)" << std::endl;

    testLicense();
    testEncryption();
    testHash();
    testPrimeNumbers();

    std::cout << "\n=== Fim dos Testes ===" << std::endl;
    return 0;
} 