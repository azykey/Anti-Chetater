@echo off
echo Compilando e simulando o Sistema Anti-Cheat Quântico...

:: Criar diretório de trabalho
if not exist work mkdir work

:: Compilar arquivos VHDL
vcom -work work src/quantum_anti_cheat.vhd
vcom -work work src/quantum_anti_cheat_tb.vhd

:: Simular
vsim -c -do "run -all; quit" work.QuantumAntiCheat_tb

echo Simulação concluída!
pause 