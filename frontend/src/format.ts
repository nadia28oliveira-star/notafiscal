export function onlyDigits(value: string): string {
  return value.replace(/\D/g, '')
}

export function formatCnpj(value: string): string {
  const digits = onlyDigits(value).slice(0, 14)
  return digits
    .replace(/^(\d{2})(\d)/, '$1.$2')
    .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
    .replace(/\.(\d{3})(\d)/, '.$1/$2')
    .replace(/(\d{4})(\d)/, '$1-$2')
}

export function formatDocumento(value: string): string {
  const digits = onlyDigits(value).slice(0, 14)
  if (digits.length <= 11) {
    return digits
      .replace(/^(\d{3})(\d)/, '$1.$2')
      .replace(/^(\d{3})\.(\d{3})(\d)/, '$1.$2.$3')
      .replace(/\.(\d{3})(\d)/, '.$1-$2')
  }
  return formatCnpj(digits)
}

export function formatCurrencyInput(value: string): string {
  const digits = onlyDigits(value)
  if (!digits) {
    return ''
  }
  const amount = Number(digits) / 100
  return amount.toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}

export function parseCurrencyInput(value: string): number | null {
  const digits = onlyDigits(value)
  if (!digits) {
    return null
  }
  return Number(digits) / 100
}

export function formatMoney(value: number): string {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })
}

export function formatDateTime(iso: string): string {
  return new Date(iso).toLocaleString('pt-BR', {
    dateStyle: 'short',
    timeStyle: 'short',
  })
}

export function formatNumeroNota(numero: number, serie: string): string {
  return `${String(numero).padStart(6, '0')}-${serie}`
}
