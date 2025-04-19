cmake_minimum_required(VERSION 3.10)
project(ProjetoCriptoAntiCheater)

# Configuração do compilador
set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

# Adiciona diretório de código fonte
include_directories(src)

# Adiciona os arquivos fonte comuns
set(COMMON_SOURCES
    src/crypto.cpp
    src/utils.cpp
)

# Adiciona os arquivos de cabeçalho
set(HEADERS
    src/crypto.h
    src/utils.h
    src/license.h
    src/anti_cheat.h
)

# Executável principal
add_executable(game_example 
    src/game_example.cpp
    src/anti_cheat.cpp
    src/memory_monitor.cpp
    ${COMMON_SOURCES}
    ${HEADERS}
)

# Executável de teste
add_executable(riemann_zeta_crypto
    src/main.cpp
    ${COMMON_SOURCES}
    ${HEADERS}
)

# Executável de exemplo do monitor de memória
add_executable(memory_monitor_example
    src/memory_monitor_example.cpp
    src/memory_monitor.cpp
    ${COMMON_SOURCES}
    ${HEADERS}
)

# Configurações de compilação específicas para cada compilador
if(MSVC)
    target_compile_options(game_example PRIVATE /W4)
    target_compile_options(riemann_zeta_crypto PRIVATE /W4)
    target_compile_options(memory_monitor_example PRIVATE /W4)
else()
    target_compile_options(game_example PRIVATE -Wall -Wextra)
    target_compile_options(riemann_zeta_crypto PRIVATE -Wall -Wextra)
    target_compile_options(memory_monitor_example PRIVATE -Wall -Wextra)
endif()

# Include directories
target_include_directories(game_example PRIVATE src)
target_include_directories(riemann_zeta_crypto PRIVATE src)
target_include_directories(memory_monitor_example PRIVATE src) 