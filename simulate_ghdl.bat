@echo off
echo Compilando e simulando o Sistema Anti-Cheat Quântico usando GHDL...

:: Criar diretório de trabalho
if not exist work mkdir work

:: Compilar arquivos VHDL
ghdl -a --work=work src/quantum_anti_cheat.vhd
ghdl -a --work=work src/quantum_anti_cheat_tb.vhd

:: Elaborar o design
ghdl -e --work=work QuantumAntiCheat_tb

:: Simular
ghdl -r QuantumAntiCheat_tb --vcd=simulation.vcd

echo Simulação concluída! Gerado arquivo simulation.vcd
pause 