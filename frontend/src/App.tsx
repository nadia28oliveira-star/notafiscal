import { useState } from 'react'
import { GerarNotaForm } from './GerarNotaForm'
import { NotaEmitida } from './NotaEmitida'
import type { NotaFiscal } from './types'

export default function App() {
  const [nota, setNota] = useState<NotaFiscal | null>(null)

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="brand">
          <div className="brand-mark" aria-hidden>
            L
          </div>
          <div>
            <h1>Ledger</h1>
            <p>Emissão de notas fiscais</p>
          </div>
        </div>
        <span className="badge">Ambiente interno</span>
      </header>

      <main className="layout">
        <GerarNotaForm onGenerated={setNota} />
        <NotaEmitida nota={nota} />
      </main>

      <footer className="footer">Campos obrigatórios validados no cliente e no servidor.</footer>
    </div>
  )
}
