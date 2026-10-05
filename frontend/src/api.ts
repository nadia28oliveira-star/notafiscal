import type { ApiValidationError, GerarNotaFiscalPayload, NotaFiscal } from './types'

export class ApiError extends Error {
  status: number
  errors: Record<string, string>

  constructor(message: string, status: number, errors: Record<string, string> = {}) {
    super(message)
    this.status = status
    this.errors = errors
  }
}

export async function gerarNotaFiscal(payload: GerarNotaFiscalPayload): Promise<NotaFiscal> {
  const response = await fetch('/api/notas-fiscais', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    let message = 'Não foi possível gerar a nota fiscal.'
    let errors: Record<string, string> = {}
    try {
      const body = (await response.json()) as ApiValidationError
      message = body.detail ?? message
      errors = body.errors ?? {}
    } catch {
      // keep default message
    }
    throw new ApiError(message, response.status, errors)
  }

  return (await response.json()) as NotaFiscal
}
