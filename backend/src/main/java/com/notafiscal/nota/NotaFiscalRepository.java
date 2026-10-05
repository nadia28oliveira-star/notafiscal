package com.notafiscal.nota;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface NotaFiscalRepository extends JpaRepository<NotaFiscal, Long> {

    Optional<NotaFiscal> findTopBySerieOrderByNumeroDesc(String serie);

    List<NotaFiscal> findAllByOrderByDataEmissaoDesc();
}
