#include <iostream>
#include <string>
#include "crypto.h"
#include "utils.h"
#include "license.h"

// Função para calcular a função Zeta de Riemann
double zetaFunction(double s) {
    if (!License::isValid()) {
        return 0.0;
    }

    double result = 1.0;
    std::vector<int> primes;
    int n = 2;

    while (primes.size() < 10) {
        if (isPrime(n)) {
            primes.push_back(n);
            result *= 1.0 / (1.0 - std::pow(n, -s));
        }
        ++n;
    }

    return result;
}

int main() {
    std::cout << "Bem-vindo ao Tutorial de Criptografia e Anti-Cheating!" << std::endl;
    std::cout << "Desenvolvido por Adilson Oliveira (Key)" << std::endl;
    std::cout << "Propriedade Intelectual Protegida - Todos os direitos reservados" << std::endl;

    // Verificar e mostrar informações da licença
    if (!License::isValid()) {
        return 1;
    }
    License::showLicenseInfo();

    // Calcular e exibir o resultado da função Zeta de Riemann
    double s;
    std::cout << "\nDigite um valor para 's': ";
    std::cin >> s;

    double zetaResult = zetaFunction(s);
    std::cout << "Valor da Função Zeta de Riemann para s = " << s << ": " << zetaResult << std::endl;

    // Criptografia Simétrica
    std::string message;
    std::cout << "\nDigite uma mensagem para criptografar: ";
    std::cin.ignore();
    std::getline(std::cin, message);

    std::string key;
    std::cout << "Digite uma chave para criptografia: ";
    std::getline(std::cin, key);

    std::string encryptedMessage = Crypto::encryptMessage(message, key);
    std::cout << "Mensagem criptografada: " << encryptedMessage << std::endl;

    std::string hash = calculateHash(encryptedMessage);
    std::cout << "Hash da mensagem criptografada: " << hash << std::endl;

    std::string decryptedMessage = Crypto::decryptMessage(encryptedMessage, key);
    std::cout << "Mensagem descriptografada: " << decryptedMessage << std::endl;

    // Fim
    std::cout << "\nFim do Tutorial." << std::endl;
    std::cout << "© 2024 Adilson Oliveira (Key) - Todos os direitos reservados" << std::endl;

    return 0;
} 