# Nota Fiscal

Aplicação para gerar nota fiscal: backend Spring Boot, banco relacional H2 (arquivo local) e frontend React.

## Como executar

Terminal 1 — API:

```
cd backend
.\mvnw.cmd spring-boot:run
```

Terminal 2 — interface:

```
cd frontend
npm install
npm run dev
```

Abra http://localhost:5173

A API fica em http://localhost:8080. O console H2 está em http://localhost:8080/h2-console (JDBC URL `jdbc:h2:file:./data/notafiscal`).

## Campos obrigatórios

- CNPJ e razão social do emitente
- CPF/CNPJ e nome do destinatário
- Descrição
- Valor maior que zero
