import { formatCnpj, formatDateTime, formatDocumento, formatMoney, formatNumeroNota } from './format'
import type { NotaFiscal } from './types'

type Props = {
  nota: NotaFiscal | null
}

export function NotaEmitida({ nota }: Props) {
  if (!nota) {
    return (
      <aside className="card empty-state">
        <div>
          <strong>Nenhuma nota emitida nesta sessão</strong>
          <p>A prévia da nota aparece aqui depois da emissão.</p>
        </div>
      </aside>
    )
  }

  return (
    <aside className="card invoice" aria-live="polite">
      <div className="invoice-head">
        <div>
          <p className="invoice-kicker">Nota fiscal</p>
          <h2>{formatNumeroNota(nota.numero, nota.serie)}</h2>
        </div>
        <span className="status-pill">{nota.status}</span>
      </div>

      <div className="invoice-grid">
        <div>
          <h3>Emitente</h3>
          <p>{nota.emitenteRazaoSocial}</p>
          <p className="hint">CNPJ {formatCnpj(nota.emitenteCnpj)}</p>
        </div>
        <div>
          <h3>Destinatário</h3>
          <p>{nota.destinatarioNome}</p>
          <p className="hint">{formatDocumento(nota.destinatarioDocumento)}</p>
        </div>
      </div>

      <div className="invoice-item">
        <h3>Descrição</h3>
        <p>{nota.descricao}</p>
      </div>

      <div className="invoice-total">
        <span>Total da nota</span>
        <strong>{formatMoney(nota.valor)}</strong>
      </div>

      <div className="invoice-foot">
        <span>Emissão {formatDateTime(nota.dataEmissao)}</span>
        <span>Verificação {nota.codigoVerificacao}</span>
      </div>
    </aside>
  )
}
