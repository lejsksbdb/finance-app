import type { Transaction } from "../types/Transaction";

export const transactionsMock: Transaction[] = [
  {
    id: "1",
    description: "Salário",
    amount: 3000,
    type: "income",
    category: "Trabalho",
    date: "2026-01-01",
  },
  {
    id: "2",
    description: "Mercado",
    amount: 450,
    type: "expense",
    category: "Alimentação",
    date: "2026-01-05",
  },
];
