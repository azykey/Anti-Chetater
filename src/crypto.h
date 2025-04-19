#ifndef CRYPTO_H
#define CRYPTO_H

#include <string>

class Crypto {
public:
    static std::string encryptMessage(const std::string& message, const std::string& key);
    static std::string decryptMessage(const std::string& encryptedMessage, const std::string& key);
};

#endif // CRYPTO_H 