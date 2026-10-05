package com.notafiscal.nota;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public class NotaFiscalResponse {

    private Long id;
    private Long numero;
    private String serie;
    private String emitenteCnpj;
    private String emitenteRazaoSocial;
    private String destinatarioDocumento;
    private String destinatarioNome;
    private String descricao;
    private BigDecimal valor;
    private LocalDateTime dataEmissao;
    private StatusNotaFiscal status;
    private String codigoVerificacao;

    public static NotaFiscalResponse from(NotaFiscal nota) {
        NotaFiscalResponse response = new NotaFiscalResponse();
        response.id = nota.getId();
        response.numero = nota.getNumero();
        response.serie = nota.getSerie();
        response.emitenteCnpj = nota.getEmitenteCnpj();
        response.emitenteRazaoSocial = nota.getEmitenteRazaoSocial();
        response.destinatarioDocumento = nota.getDestinatarioDocumento();
        response.destinatarioNome = nota.getDestinatarioNome();
        response.descricao = nota.getDescricao();
        response.valor = nota.getValor();
        response.dataEmissao = nota.getDataEmissao();
        response.status = nota.getStatus();
        response.codigoVerificacao = nota.getCodigoVerificacao();
        return response;
    }

    public Long getId() {
        return id;
    }

    public Long getNumero() {
        return numero;
    }

    public String getSerie() {
        return serie;
    }

    public String getEmitenteCnpj() {
        return emitenteCnpj;
    }

    public String getEmitenteRazaoSocial() {
        return emitenteRazaoSocial;
    }

    public String getDestinatarioDocumento() {
        return destinatarioDocumento;
    }

    public String getDestinatarioNome() {
        return destinatarioNome;
    }

    public String getDescricao() {
        return descricao;
    }

    public BigDecimal getValor() {
        return valor;
    }

    public LocalDateTime getDataEmissao() {
        return dataEmissao;
    }

    public StatusNotaFiscal getStatus() {
        return status;
    }

    public String getCodigoVerificacao() {
        return codigoVerificacao;
    }
}
