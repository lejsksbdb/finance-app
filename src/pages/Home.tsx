import { useFinance } from '../context/FinanceContext'
import type { Transaction } from '../types/Transaction'

export function Home() {
  const { transactions } = useFinance()

  const totalIncome = transactions
    .filter((t: Transaction) => t.type === 'income')
    .reduce((sum: number, t: Transaction) => sum + t.amount, 0)

  const totalExpense = transactions
    .filter((t: Transaction) => t.type === 'expense')
    .reduce((sum: number, t: Transaction) => sum + t.amount, 0)

  const balance = totalIncome - totalExpense

  return (
    <div style={{ padding: 16 }}>
      <h1>📊 Dashboard Financeiro</h1>

      {/* RESUMO */}
      <div style={{ display: 'flex', gap: 16, marginBottom: 24 }}>
        <div style={{ background: '#e6fffa', padding: 16, borderRadius: 8 }}>
          <strong>Entradas</strong>
          <p style={{ color: 'green' }}>R$ {totalIncome.toFixed(2)}</p>
        </div>

        <div style={{ background: '#fff5f5', padding: 16, borderRadius: 8 }}>
          <strong>Saídas</strong>
          <p style={{ color: 'red' }}>R$ {totalExpense.toFixed(2)}</p>
        </div>

        <div style={{ background: '#edf2ff', padding: 16, borderRadius: 8 }}>
          <strong>Saldo</strong>
          <p style={{ color: balance >= 0 ? 'green' : 'red' }}>
            R$ {balance.toFixed(2)}
          </p>
        </div>
      </div>

      {/* LISTA */}
      <h2>🧾 Transações</h2>

      {transactions.length === 0 && <p>Nenhuma transação cadastrada</p>}

      {transactions.map((t: Transaction) => (
        <div
          key={t.id}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: 8,
            borderBottom: '1px solid #ddd',
            color: t.type === 'income' ? 'green' : 'red',
          }}
        >
          <span>{t.description}</span>
          <span>
            {t.type === 'income' ? '+' : '-'} R$ {t.amount.toFixed(2)}
          </span>
        </div>
      ))}
    </div>
  )
}
