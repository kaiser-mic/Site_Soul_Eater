-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 15/07/2025 às 04:48
-- Versão do servidor: 10.4.32-MariaDB
-- Versão do PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `site_rpg`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `fichas`
--

CREATE TABLE `fichas` (
  `id` int(11) NOT NULL,
  `id_usuario` int(11) DEFAULT NULL,
  `nome` varchar(50) NOT NULL,
  `aparencia` text DEFAULT NULL,
  `personalidade` text DEFAULT NULL,
  `historia` text DEFAULT NULL,
  `weapon_form` text DEFAULT NULL,
  `forca` int(11) NOT NULL,
  `destreza` int(11) NOT NULL,
  `constituicao` int(11) NOT NULL,
  `inteligencia` int(11) NOT NULL,
  `sabedoria` int(11) NOT NULL,
  `carisma` int(11) NOT NULL,
  `atletismo` int(11) NOT NULL,
  `furtividade` int(11) NOT NULL,
  `vigor` int(11) NOT NULL,
  `medicina` int(11) NOT NULL,
  `sobrevivencia` int(11) NOT NULL,
  `performance` int(11) NOT NULL,
  `intimidacao` int(11) NOT NULL,
  `prestidigitacao` int(11) NOT NULL,
  `conhecimento` int(11) NOT NULL,
  `percepcao` int(11) NOT NULL,
  `persuasao` int(11) NOT NULL,
  `acrobacia` int(11) NOT NULL,
  `resistencia` int(11) NOT NULL,
  `investigacao` int(11) NOT NULL,
  `intuicao` int(11) NOT NULL,
  `enganacao` int(11) NOT NULL,
  `habilidade` text DEFAULT NULL,
  `nivel_resonancia` int(11) NOT NULL,
  `sanidade` int(11) NOT NULL,
  `vida` int(11) NOT NULL,
  `tipo` varchar(6) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `fichas`
--

INSERT INTO `fichas` (`id`, `id_usuario`, `nome`, `aparencia`, `personalidade`, `historia`, `weapon_form`, `forca`, `destreza`, `constituicao`, `inteligencia`, `sabedoria`, `carisma`, `atletismo`, `furtividade`, `vigor`, `medicina`, `sobrevivencia`, `performance`, `intimidacao`, `prestidigitacao`, `conhecimento`, `percepcao`, `persuasao`, `acrobacia`, `resistencia`, `investigacao`, `intuicao`, `enganacao`, `habilidade`, `nivel_resonancia`, `sanidade`, `vida`, `tipo`) VALUES
(5, 2, 'paulo nunes', 'loiro', 'goleador', 'grande futebolista do gremio', 'chuteira', 12, 12, 8, 8, 10, 12, 5, 2, 2, 0, 3, 4, 5, 2, 0, 1, 4, 3, 0, 0, 1, 2, 'chute insano: chuta insanamente pro gol', 0, 100, 1903, 'mestre'),
(6, 2, '112', '12312', '123123', '1322131', '123213', 8, 8, 8, 8, 8, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, '13123', 0, 12312, 123, 'mestre');

-- --------------------------------------------------------

--
-- Estrutura para tabela `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `usuario` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `senha` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `usuarios`
--

INSERT INTO `usuarios` (`id`, `usuario`, `email`, `senha`) VALUES
(2, 'nicolas', 'nicolas@gmail.com', '$2b$10$IhKLJP7bzkGB8zjfpNzK5uaaGVk7bTkUCWPLow816nsCXrYXEYRLC');

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `fichas`
--
ALTER TABLE `fichas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_usuario` (`id_usuario`);

--
-- Índices de tabela `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `usuario` (`usuario`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `fichas`
--
ALTER TABLE `fichas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de tabela `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Restrições para tabelas despejadas
--

--
-- Restrições para tabelas `fichas`
--
ALTER TABLE `fichas`
  ADD CONSTRAINT `fichas_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
