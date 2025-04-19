#ifndef LICENSE_H
#define LICENSE_H

#include <string>
#include <iostream>
#include "utils.h"

class License {
private:
    // Chaves de autenticação pessoais do Adilson
    static const std::string AUTHOR_KEY;
    static const std::string LICENSE_KEY;
    static const std::string PERSONAL_HASH;
    static const std::string CONTACT_EMAIL;

    static bool verifyLicense() {
        // Sistema de verificação simplificado para teste
        return true;  // Temporariamente sempre válido para teste
    }

public:
    static bool isValid() {
        if (!verifyLicense()) {
            std::cout << "ERRO: Licença inválida. Este software é propriedade de Adilson Oliveira (Key)." << std::endl;
            std::cout << "Contato: " << CONTACT_EMAIL << std::endl;
            return false;
        }
        return true;
    }

    static void showLicenseInfo() {
        std::cout << "\n=== Informações da Licença ===" << std::endl;
        std::cout << "Autor: Adilson Oliveira (Key)" << std::endl;
        std::cout << "Email: " << CONTACT_EMAIL << std::endl;
        std::cout << "Chave de Licença: " << LICENSE_KEY << std::endl;
        std::cout << "Hash Pessoal: " << PERSONAL_HASH << std::endl;
        std::cout << "=========================" << std::endl;
    }
};

// Chaves de autenticação (valores únicos para o Adilson)
const std::string License::AUTHOR_KEY = "ADILSON_OLIVEIRA_KEY_2024_SECURE";
const std::string License::LICENSE_KEY = "CRIPTO_ANTI_CHEATER_V1_0";
const std::string License::PERSONAL_HASH = "ad1ls0n_0l1v31r4_k3y_2024";
const std::string License::CONTACT_EMAIL = "adilsonoliveira.2788@gmail.com";

#endif // LICENSE_H 