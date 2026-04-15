import { useFinance } from "../context/FinanceContext";

export default function Home() {
  const { transactions } = useFinance();

  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((acc, t) => acc + t.amount, 0);

  const expense = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, t) => acc + t.amount, 0);

  const balance = income - expense;

  return (
    <div style={{ padding: 24 }}>
      <h1>Resumo Financeiro</h1>

      {/* 🔹 Totais */}
      <div style={{ display: "flex", gap: 16, marginBottom: 24 }}>
        <div>
          <strong>Entradas</strong>
          <p style={{ color: "green" }}>R$ {income.toFixed(2)}</p>
        </div>

        <div>
          <strong>Saídas</strong>
          <p style={{ color: "red" }}>R$ {expense.toFixed(2)}</p>
        </div>

        <div>
          <strong>Saldo</strong>
          <p>R$ {balance.toFixed(2)}</p>
        </div>
      </div>

      {/* 🔹 Lista de transações */}
      <h2>Transações</h2>

      {transactions.length === 0 && <p>Nenhuma transação cadastrada</p>}

      <table width="100%" cellPadding={8}>
        <thead>
          <tr>
            <th align="left">Descrição</th>
            <th>Tipo</th>
            <th>Categoria</th>
            <th>Valor</th>
            <th>Data</th>
          </tr>
        </thead>

        <tbody>
          {transactions.map((t) => (
            <tr key={t.id}>
              <td>{t.description}</td>
              <td>{t.type === "income" ? "Entrada" : "Saída"}</td>
              <td>{t.category}</td>
              <td
                style={{
                  color: t.type === "income" ? "green" : "red",
                }}
              >
                R$ {t.amount.toFixed(2)}
              </td>
              <td>{t.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
