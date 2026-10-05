package com.notafiscal.nota;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Digits;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

import java.math.BigDecimal;

public class GerarNotaFiscalRequest {

    @NotBlank(message = "CNPJ do emitente é obrigatório")
    @Pattern(regexp = "\\d{14}", message = "CNPJ do emitente deve ter 14 dígitos")
    private String emitenteCnpj;

    @NotBlank(message = "Razão social do emitente é obrigatória")
    @Size(max = 180, message = "Razão social deve ter no máximo 180 caracteres")
    private String emitenteRazaoSocial;

    @NotBlank(message = "Documento do destinatário é obrigatório")
    @Pattern(regexp = "\\d{11}|\\d{14}", message = "Documento do destinatário deve ser CPF (11 dígitos) ou CNPJ (14 dígitos)")
    private String destinatarioDocumento;

    @NotBlank(message = "Nome do destinatário é obrigatório")
    @Size(max = 180, message = "Nome do destinatário deve ter no máximo 180 caracteres")
    private String destinatarioNome;

    @NotBlank(message = "Descrição é obrigatória")
    @Size(max = 500, message = "Descrição deve ter no máximo 500 caracteres")
    private String descricao;

    @NotNull(message = "Valor é obrigatório")
    @DecimalMin(value = "0.01", message = "Valor deve ser maior que zero")
    @Digits(integer = 13, fraction = 2, message = "Valor deve ter no máximo 2 casas decimais")
    private BigDecimal valor;

    public String getEmitenteCnpj() {
        return emitenteCnpj;
    }

    public void setEmitenteCnpj(String emitenteCnpj) {
        this.emitenteCnpj = emitenteCnpj;
    }

    public String getEmitenteRazaoSocial() {
        return emitenteRazaoSocial;
    }

    public void setEmitenteRazaoSocial(String emitenteRazaoSocial) {
        this.emitenteRazaoSocial = emitenteRazaoSocial;
    }

    public String getDestinatarioDocumento() {
        return destinatarioDocumento;
    }

    public void setDestinatarioDocumento(String destinatarioDocumento) {
        this.destinatarioDocumento = destinatarioDocumento;
    }

    public String getDestinatarioNome() {
        return destinatarioNome;
    }

    public void setDestinatarioNome(String destinatarioNome) {
        this.destinatarioNome = destinatarioNome;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public BigDecimal getValor() {
        return valor;
    }

    public void setValor(BigDecimal valor) {
        this.valor = valor;
    }
}
