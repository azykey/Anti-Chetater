-- ============================================================================
-- Quantum Anti-Cheat System - Testbench
-- Copyright (C) 2024 adilson Oliveira konaet. All Rights Reserved.
--
-- PROPRIEDADE INTELECTUAL
-- Este código é propriedade exclusiva de adilson Oliveira konaet e está protegido
-- por direitos autorais e outras leis de propriedade intelectual.
--
-- LICENÇA
-- O uso, cópia, modificação ou distribuição deste código é estritamente
-- proibido sem autorização expressa por escrito de adilson Oliveira konaet.
--
-- PATENTES
-- Este sistema está protegido pelas seguintes patentes:
-- - BR102024000000-1: Sistema de Detecção Quântica de Comportamento
-- - BR102024000000-2: Método de Análise de Estados Quânticos
--
-- CONFIDENCIALIDADE
-- Este código contém informações confidenciais e proprietárias.
-- A divulgação não autorizada é proibida.
-- ============================================================================

library IEEE;
use IEEE.STD_LOGIC_1164.ALL;
use IEEE.NUMERIC_STD.ALL;
use IEEE.MATH_REAL.ALL;

entity QuantumAntiCheat_tb is
end QuantumAntiCheat_tb;

architecture Behavioral of QuantumAntiCheat_tb is
    component QuantumAntiCheat
        Port (
            clk           : in  STD_LOGIC;
            reset         : in  STD_LOGIC;
            start         : in  STD_LOGIC;
            player_state  : in  STD_LOGIC_VECTOR(63 downto 0);
            cheat_detected: out STD_LOGIC;
            confidence    : out STD_LOGIC_VECTOR(7 downto 0)
        );
    end component;

    signal clk           : STD_LOGIC := '0';
    signal reset         : STD_LOGIC := '1';
    signal start         : STD_LOGIC := '0';
    signal player_state  : STD_LOGIC_VECTOR(63 downto 0) := (others => '0');
    signal cheat_detected: STD_LOGIC;
    signal confidence    : STD_LOGIC_VECTOR(7 downto 0);

    constant clk_period : time := 10 ns;
    
begin
    uut: QuantumAntiCheat port map (
        clk => clk,
        reset => reset,
        start => start,
        player_state => player_state,
        cheat_detected => cheat_detected,
        confidence => confidence
    );

    -- Clock generator
    clk_process: process
    begin
        clk <= '0';
        wait for clk_period/2;
        clk <= '1';
        wait for clk_period/2;
    end process;

    -- Stimulus process
    stim_proc: process
    begin
        -- Reset
        reset <= '1';
        wait for 100 ns;
        reset <= '0';
        wait for 100 ns;

        -- Simulação de comportamento normal
        for i in 0 to 9 loop
            player_state <= std_logic_vector(to_unsigned(i, 64));
            start <= '1';
            wait for clk_period;
            start <= '0';
            wait for clk_period * 9;
        end loop;

        -- Simulação de comportamento suspeito
        for i in 0 to 4 loop
            player_state <= std_logic_vector(to_unsigned(100 + i, 64));
            start <= '1';
            wait for clk_period;
            start <= '0';
            wait for clk_period * 9;
        end loop;

        -- Simulação de trapaça
        for i in 0 to 4 loop
            player_state <= std_logic_vector(to_unsigned(1000 + i, 64));
            start <= '1';
            wait for clk_period;
            start <= '0';
            wait for clk_period * 9;
        end loop;

        wait;
    end process;
end Behavioral; 