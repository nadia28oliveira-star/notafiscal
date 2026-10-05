export type StatusNotaFiscal = 'EMITIDA'

export type NotaFiscal = {
  id: number
  numero: number
  serie: string
  emitenteCnpj: string
  emitenteRazaoSocial: string
  destinatarioDocumento: string
  destinatarioNome: string
  descricao: string
  valor: number
  dataEmissao: string
  status: StatusNotaFiscal
  codigoVerificacao: string
}

export type GerarNotaFiscalPayload = {
  emitenteCnpj: string
  emitenteRazaoSocial: string
  destinatarioDocumento: string
  destinatarioNome: string
  descricao: string
  valor: number
}

export type ApiValidationError = {
  detail?: string
  errors?: Record<string, string>
}
