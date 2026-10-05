package com.notafiscal.nota;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.HexFormat;
import java.util.List;

@Service
public class NotaFiscalService {

    private static final String SERIE_PADRAO = "1";
    private static final ZoneId FUSO = ZoneId.of("America/Sao_Paulo");
    private static final SecureRandom RANDOM = new SecureRandom();

    private final NotaFiscalRepository repository;

    public NotaFiscalService(NotaFiscalRepository repository) {
        this.repository = repository;
    }

    @Transactional
    public NotaFiscal gerar(GerarNotaFiscalRequest request) {
        long proximoNumero = repository.findTopBySerieOrderByNumeroDesc(SERIE_PADRAO)
                .map(nota -> nota.getNumero() + 1)
                .orElse(1L);

        NotaFiscal nota = new NotaFiscal();
        nota.setNumero(proximoNumero);
        nota.setSerie(SERIE_PADRAO);
        nota.setEmitenteCnpj(request.getEmitenteCnpj());
        nota.setEmitenteRazaoSocial(request.getEmitenteRazaoSocial().trim());
        nota.setDestinatarioDocumento(request.getDestinatarioDocumento());
        nota.setDestinatarioNome(request.getDestinatarioNome().trim());
        nota.setDescricao(request.getDescricao().trim());
        nota.setValor(request.getValor());
        nota.setDataEmissao(LocalDateTime.now(FUSO));
        nota.setStatus(StatusNotaFiscal.EMITIDA);
        nota.setCodigoVerificacao(gerarCodigoVerificacao());
        return repository.save(nota);
    }

    @Transactional(readOnly = true)
    public List<NotaFiscal> listar() {
        return repository.findAllByOrderByDataEmissaoDesc();
    }

    @Transactional(readOnly = true)
    public NotaFiscal buscar(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new NotaFiscalNaoEncontradaException(id));
    }

    private String gerarCodigoVerificacao() {
        byte[] bytes = new byte[8];
        RANDOM.nextBytes(bytes);
        return HexFormat.of().withUpperCase().formatHex(bytes);
    }
}
