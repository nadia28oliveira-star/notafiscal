package com.notafiscal.nota;

public class NotaFiscalNaoEncontradaException extends RuntimeException {

    public NotaFiscalNaoEncontradaException(Long id) {
        super("Nota fiscal não encontrada: " + id);
    }
}
