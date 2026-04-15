import type { Transaction } from "../types/Transaction";

interface Props {
  transactions: Transaction[];
}

export default function MonthlyChart({ transactions }: Props) {
  return (
    <div className="p-4 border rounded-lg">
      <h2 className="font-semibold mb-2">Resumo mensal</h2>

      <p>Total de transações: {transactions.length}</p>
    </div>
  );
}
