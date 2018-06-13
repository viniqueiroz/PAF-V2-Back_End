-- phpMyAdmin SQL Dump
-- version 4.7.7
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: 01-Mar-2018 às 16:57
-- Versão do servidor: 10.1.30-MariaDB
-- PHP Version: 7.2.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `paf`
--
CREATE DATABASE IF NOT EXISTS `paf` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `paf`;

-- --------------------------------------------------------

--
-- Estrutura da tabela `area`
--

CREATE TABLE `area` (
  `id` int(11) NOT NULL,
  `area` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `area`
--

INSERT INTO `area` (`id`, `area`) VALUES
(1, 'CP'),
(2, 'EM');

-- --------------------------------------------------------

--
-- Estrutura da tabela `categoria`
--

CREATE TABLE `categoria` (
  `id` int(255) NOT NULL,
  `categoria` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estrutura da tabela `fornecedor`
--

CREATE TABLE `fornecedor` (
  `id` int(255) NOT NULL,
  `fornecedor` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estrutura da tabela `movimentacao`
--

CREATE TABLE `movimentacao` (
  `id` int(11) NOT NULL,
  `movimentacao` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `movimentacao`
--

INSERT INTO `movimentacao` (`id`, `movimentacao`) VALUES
(1, 'EXPEDIÇÃO'),
(2, 'RECEBIMENTO');

-- --------------------------------------------------------

--
-- Estrutura da tabela `planejamento`
--

CREATE TABLE `planejamento` (
  `id` int(11) NOT NULL,
  `idCategoria` int(255) NOT NULL,
  `idFornecedor` int(255) NOT NULL,
  `idProduto` int(255) NOT NULL,
  `idTransportadora` int(255) NOT NULL,
  `idMovimentacao` int(255) NOT NULL,
  `idRegistroOperacional` int(255) NOT NULL,
  `os_po_remessa` int(255) NOT NULL,
  `dataPlanejamento` varchar(255) NOT NULL,
  `horaPlanejamento` varchar(255) NOT NULL,
  `quantidade` float NOT NULL,
  `idUnidadeMedida` int(255) NOT NULL,
  `idArea` int(255) NOT NULL,
  `ordem` int(255) NOT NULL,
  `idStatus` int(255) NOT NULL,
  `observacao` varchar(255) NOT NULL,
  `data_operacao` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `idUsuario` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estrutura da tabela `privilegio`
--

CREATE TABLE `privilegio` (
  `idPrivilegio` int(11) NOT NULL,
  `nomePrivilegio` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `privilegio`
--

INSERT INTO `privilegio` (`idPrivilegio`, `nomePrivilegio`) VALUES
(1, 'Administrador'),
(2, 'Funcionário');

-- --------------------------------------------------------

--
-- Estrutura da tabela `produto`
--

CREATE TABLE `produto` (
  `id` int(255) NOT NULL,
  `produto` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estrutura da tabela `registro_operacional`
--

CREATE TABLE `registro_operacional` (
  `id` int(11) NOT NULL,
  `idPlanejamento` int(11) NOT NULL,
  `notaFiscal` int(255) NOT NULL,
  `placa` varchar(255) NOT NULL,
  `dataEntrada` varchar(255) DEFAULT NULL,
  `horaEntrada` varchar(255) DEFAULT NULL,
  `pesoEntrada` float DEFAULT '0',
  `dataSaida` varchar(255) DEFAULT NULL,
  `horaSaida` varchar(255) DEFAULT NULL,
  `pesoSaida` float DEFAULT '0',
  `pesoEstimado` float DEFAULT NULL,
  `pesoFinal` float DEFAULT NULL,
  `tempoOperacao` varchar(255) DEFAULT NULL,
  `idUserOpInicio` int(11) DEFAULT NULL,
  `idUserOpFinal` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estrutura da tabela `statusUsuario`
--

CREATE TABLE `statusUsuario` (
  `id` int(11) NOT NULL,
  `nomeStatus` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `statusUsuario`
--

INSERT INTO `statusUsuario` (`id`, `nomeStatus`) VALUES
(2, 'PENDENTE'),
(3, 'EM OPERAÇÃO'),
(4, 'CONCLUSO'),
(5, 'FINALIZADO');

-- --------------------------------------------------------

--
-- Estrutura da tabela `transportadora`
--

CREATE TABLE `transportadora` (
  `id` int(255) NOT NULL,
  `transportadora` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estrutura da tabela `unidademed`
--

CREATE TABLE `unidademed` (
  `idUnit` int(11) NOT NULL,
  `sigla` varchar(100) NOT NULL,
  `descricao` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `unidademed`
--

INSERT INTO `unidademed` (`idUnit`, `sigla`, `descricao`) VALUES
(1, 'M', 'Metro'),
(2, 'l', 'Litro'),
(3, 'UND', 'Unidade'),
(4, 'TN', 'Tonelada'),
(5, 'KG', 'Kilograma'),
(6, 'M³', 'Metro Cubico'),
(7, 'Nm', 'Nanômetro');

-- --------------------------------------------------------

--
-- Estrutura da tabela `usuario`
--

CREATE TABLE `usuario` (
  `idUsuario` int(11) NOT NULL,
  `nome` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `senha` varchar(255) NOT NULL,
  `idStatus` int(11) NOT NULL,
  `idPrivilegio` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `usuario`
--

INSERT INTO `usuario` (`idUsuario`, `nome`, `email`, `senha`, `idStatus`, `idPrivilegio`) VALUES
(1, 'teste', 'teste@teste.com', '40bd001563085fc35165329ea1ff5c5ecbdbbeef', 1, 1),
(2, 'Gugu', 'gug@gug.com', 'bc34801422fb2bf02e54b0ed838056be57574643', 1, 2),
(3, 'vini', 'vini@THE.KID', '40bd001563085fc35165329ea1ff5c5ecbdbbeef', 1, 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `area`
--
ALTER TABLE `area`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `categoria`
--
ALTER TABLE `categoria`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `fornecedor`
--
ALTER TABLE `fornecedor`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `movimentacao`
--
ALTER TABLE `movimentacao`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `planejamento`
--
ALTER TABLE `planejamento`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `privilegio`
--
ALTER TABLE `privilegio`
  ADD PRIMARY KEY (`idPrivilegio`);

--
-- Indexes for table `produto`
--
ALTER TABLE `produto`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `registro_operacional`
--
ALTER TABLE `registro_operacional`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `statusUsuario`
--
ALTER TABLE `statusUsuario`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `transportadora`
--
ALTER TABLE `transportadora`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `unidademed`
--
ALTER TABLE `unidademed`
  ADD PRIMARY KEY (`idUnit`),
  ADD UNIQUE KEY `ucSigla` (`sigla`);

--
-- Indexes for table `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`idUsuario`),
  ADD UNIQUE KEY `uc_usuario` (`email`),
  ADD KEY `idPrivilegio` (`idPrivilegio`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `area`
--
ALTER TABLE `area`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `categoria`
--
ALTER TABLE `categoria`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `fornecedor`
--
ALTER TABLE `fornecedor`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `movimentacao`
--
ALTER TABLE `movimentacao`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `planejamento`
--
ALTER TABLE `planejamento`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `privilegio`
--
ALTER TABLE `privilegio`
  MODIFY `idPrivilegio` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `produto`
--
ALTER TABLE `produto`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `registro_operacional`
--
ALTER TABLE `registro_operacional`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `statusUsuario`
--
ALTER TABLE `statusUsuario`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `transportadora`
--
ALTER TABLE `transportadora`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `unidademed`
--
ALTER TABLE `unidademed`
  MODIFY `idUnit` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `usuario`
--
ALTER TABLE `usuario`
  MODIFY `idUsuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Limitadores para a tabela `usuario`
--
ALTER TABLE `usuario`
  ADD CONSTRAINT `idPrivilegio` FOREIGN KEY (`idPrivilegio`) REFERENCES `privilegio` (`idPrivilegio`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
