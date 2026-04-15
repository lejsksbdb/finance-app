import { createContext, useContext, useState } from 'react'
import type { Transaction } from '../types/Transaction'

interface FinanceContextData {
  transactions: Transaction[]
  addTransaction: (transaction: Transaction) => void
}

const FinanceContext = createContext<FinanceContextData>(
  {} as FinanceContextData
)

export function FinanceProvider({ children }: { children: React.ReactNode }) {
  const [transactions, setTransactions] = useState<Transaction[]>([])

  function addTransaction(transaction: Transaction) {
    setTransactions(prev => [...prev, transaction])
  }

  return (
    <FinanceContext.Provider value={{ transactions, addTransaction }}>
      {children}
    </FinanceContext.Provider>
  )
}

export function useFinance() {
  return useContext(FinanceContext)
}
