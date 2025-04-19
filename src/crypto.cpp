#include "crypto.h"
#include <algorithm>

std::string Crypto::encryptMessage(const std::string& message, const std::string& key) {
    std::string encrypted = message;
    for (size_t i = 0; i < message.length(); i++) {
        encrypted[i] = message[i] ^ key[i % key.length()];
    }
    return encrypted;
}

std::string Crypto::decryptMessage(const std::string& encryptedMessage, const std::string& key) {
    return encryptMessage(encryptedMessage, key); // XOR é simétrico
} 