import { useMemo, useState } from 'react'
import type { FormEvent } from 'react'
import { ApiError, gerarNotaFiscal } from './api'
import { formatCnpj, formatDocumento, formatCurrencyInput, onlyDigits, parseCurrencyInput } from './format'
import type { NotaFiscal } from './types'

type FormState = {
  emitenteCnpj: string
  emitenteRazaoSocial: string
  destinatarioDocumento: string
  destinatarioNome: string
  descricao: string
  valor: string
}

const INITIAL_FORM: FormState = {
  emitenteCnpj: '',
  emitenteRazaoSocial: '',
  destinatarioDocumento: '',
  destinatarioNome: '',
  descricao: '',
  valor: '',
}

type Props = {
  onGenerated: (nota: NotaFiscal) => void
}

export function GerarNotaForm({ onGenerated }: Props) {
  const [form, setForm] = useState<FormState>(INITIAL_FORM)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitError, setSubmitError] = useState('')
  const [loading, setLoading] = useState(false)

  const isValid = useMemo(() => {
    const valor = parseCurrencyInput(form.valor)
    return (
      onlyDigits(form.emitenteCnpj).length === 14 &&
      form.emitenteRazaoSocial.trim().length > 0 &&
      [11, 14].includes(onlyDigits(form.destinatarioDocumento).length) &&
      form.destinatarioNome.trim().length > 0 &&
      form.descricao.trim().length > 0 &&
      valor !== null &&
      valor >= 0.01
    )
  }, [form])

  function setField<K extends keyof FormState>(key: K, value: string) {
    setForm((current) => ({ ...current, [key]: value }))
    setErrors((current) => {
      const next = { ...current }
      delete next[key]
      return next
    })
  }

  function validate(): Record<string, string> {
    const next: Record<string, string> = {}
    if (onlyDigits(form.emitenteCnpj).length !== 14) {
      next.emitenteCnpj = 'Informe o CNPJ com 14 dígitos.'
    }
    if (!form.emitenteRazaoSocial.trim()) {
      next.emitenteRazaoSocial = 'Informe a razão social.'
    }
    const destDoc = onlyDigits(form.destinatarioDocumento)
    if (![11, 14].includes(destDoc.length)) {
      next.destinatarioDocumento = 'Informe CPF (11) ou CNPJ (14).'
    }
    if (!form.destinatarioNome.trim()) {
      next.destinatarioNome = 'Informe o nome do destinatário.'
    }
    if (!form.descricao.trim()) {
      next.descricao = 'Informe a descrição da nota.'
    }
    const valor = parseCurrencyInput(form.valor)
    if (valor === null || valor < 0.01) {
      next.valor = 'Informe um valor maior que zero.'
    }
    return next
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    const nextErrors = validate()
    setErrors(nextErrors)
    setSubmitError('')
    if (Object.keys(nextErrors).length > 0) {
      return
    }

    const valor = parseCurrencyInput(form.valor)
    if (valor === null) {
      return
    }

    setLoading(true)
    try {
      const nota = await gerarNotaFiscal({
        emitenteCnpj: onlyDigits(form.emitenteCnpj),
        emitenteRazaoSocial: form.emitenteRazaoSocial.trim(),
        destinatarioDocumento: onlyDigits(form.destinatarioDocumento),
        destinatarioNome: form.destinatarioNome.trim(),
        descricao: form.descricao.trim(),
        valor,
      })
      onGenerated(nota)
    } catch (error) {
      if (error instanceof ApiError) {
        setErrors(error.errors)
        setSubmitError(error.message)
      } else {
        setSubmitError('Falha de conexão com o servidor.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <form className="card" onSubmit={handleSubmit} noValidate>
      <h2>Gerar nota fiscal</h2>
      <p className="hint">Preencha os campos obrigatórios para emitir a nota.</p>

      <p className="section-label">Emitente</p>
      <div className="grid-2">
        <div className={`field ${errors.emitenteCnpj ? 'invalid' : ''}`}>
          <label htmlFor="emitenteCnpj">CNPJ</label>
          <input
            id="emitenteCnpj"
            inputMode="numeric"
            autoComplete="off"
            placeholder="00.000.000/0000-00"
            value={form.emitenteCnpj}
            onChange={(event) => setField('emitenteCnpj', formatCnpj(event.target.value))}
          />
          {errors.emitenteCnpj ? <span className="field-error">{errors.emitenteCnpj}</span> : null}
        </div>
        <div className={`field ${errors.emitenteRazaoSocial ? 'invalid' : ''}`}>
          <label htmlFor="emitenteRazaoSocial">Razão social</label>
          <input
            id="emitenteRazaoSocial"
            placeholder="Empresa emissora Ltda"
            value={form.emitenteRazaoSocial}
            onChange={(event) => setField('emitenteRazaoSocial', event.target.value)}
          />
          {errors.emitenteRazaoSocial ? <span className="field-error">{errors.emitenteRazaoSocial}</span> : null}
        </div>
      </div>

      <p className="section-label">Destinatário</p>
      <div className="grid-2">
        <div className={`field ${errors.destinatarioDocumento ? 'invalid' : ''}`}>
          <label htmlFor="destinatarioDocumento">CPF ou CNPJ</label>
          <input
            id="destinatarioDocumento"
            inputMode="numeric"
            autoComplete="off"
            placeholder="000.000.000-00"
            value={form.destinatarioDocumento}
            onChange={(event) => setField('destinatarioDocumento', formatDocumento(event.target.value))}
          />
          {errors.destinatarioDocumento ? <span className="field-error">{errors.destinatarioDocumento}</span> : null}
        </div>
        <div className={`field ${errors.destinatarioNome ? 'invalid' : ''}`}>
          <label htmlFor="destinatarioNome">Nome</label>
          <input
            id="destinatarioNome"
            placeholder="Cliente ou empresa"
            value={form.destinatarioNome}
            onChange={(event) => setField('destinatarioNome', event.target.value)}
          />
          {errors.destinatarioNome ? <span className="field-error">{errors.destinatarioNome}</span> : null}
        </div>
      </div>

      <p className="section-label">Serviço</p>
      <div className={`field ${errors.descricao ? 'invalid' : ''}`}>
        <label htmlFor="descricao">Descrição</label>
        <textarea
          id="descricao"
          placeholder="Ex.: Consultoria financeira — competência outubro/2026"
          value={form.descricao}
          onChange={(event) => setField('descricao', event.target.value)}
        />
        {errors.descricao ? <span className="field-error">{errors.descricao}</span> : null}
      </div>

      <div className={`field ${errors.valor ? 'invalid' : ''}`} style={{ marginTop: 14, maxWidth: 240 }}>
        <label htmlFor="valor">Valor (R$)</label>
        <input
          id="valor"
          inputMode="numeric"
          placeholder="0,00"
          value={form.valor}
          onChange={(event) => setField('valor', formatCurrencyInput(event.target.value))}
        />
        {errors.valor ? <span className="field-error">{errors.valor}</span> : null}
      </div>

      {submitError ? <div className="alert">{submitError}</div> : null}

      <div className="actions">
        <button className="btn btn-primary" type="submit" disabled={loading || !isValid}>
          {loading ? 'Emitindo...' : 'Emitir nota'}
        </button>
        <button
          className="btn btn-ghost"
          type="button"
          onClick={() => {
            setForm(INITIAL_FORM)
            setErrors({})
            setSubmitError('')
          }}
        >
          Limpar
        </button>
      </div>
    </form>
  )
}
