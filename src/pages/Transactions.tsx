import { useState } from 'react';
import Layout from '../components/Layout';

import { useFinance } from '../context/FinanceContext';

export default function Transactions() {
  const { transactions, addTransaction } = useFinance();

  const newLocal = useState('');
  const [description, setDescription] = newLocal;
  const [amount, setAmount] = useState('');
  const [type, setType] = useState<'income' | 'expense'>('income');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');

  const handleAddTransaction = (e: React.FormEvent) => {
    e.preventDefault();
    const amountNum = parseFloat(amount);
    if (!description || amountNum <= 0) return;

    addTransaction({
      id: crypto.randomUUID(),
      description,
      amount: amountNum,
      type,
      category,
      date
    });

    // Limpar formulário
    setDescription('');
    setAmount('');
    setCategory('');
    setDate('');
    setType('income');
  };

  return (
    <Layout>
      {/* Formulário para adicionar transação */}
      <div className="bg-white shadow-md rounded-xl p-4 mb-4">
        <h2 className="text-gray-500 text-sm mb-2">Adicionar Transação</h2>
        <form onSubmit={handleAddTransaction} className="flex flex-col gap-2">
          <input
            type="text"
            placeholder="Descrição"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border rounded-xl p-2"
            required
          />
          <input
            type="number"
            placeholder="Valor"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="border rounded-xl p-2"
            required
          />
          
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Categoria"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="border rounded-xl p-2 flex-1"
              required
            />
            <div className="flex flex-col gap-1 w-1/3">
              <label htmlFor="date" className="sr-only">Data</label>
              <input
                id="date"
                type="date"
                title="Data da transação"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="border rounded-xl p-2 w-1/3"
                required
              />
            </div>
          </div>

          <label htmlFor="type" className="sr-only">Tipo de Transação</label>
          <select
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value as 'income' | 'expense')}
            className="border rounded-xl p-2"
            title="Tipo de transação"
          >
            <option value="income">Receita</option>
            <option value="expense">Despesa</option>
          </select>
          <button
            type="submit"
            className="bg-blue-500 text-white rounded-xl p-2 mt-2"
          >
            Adicionar
          </button>
        </form>
      </div>

      <div className="bg-white shadow-md rounded-xl p-4">
        <h2 className="text-gray-500 text-sm mb-2">Transações Recentes</h2>
        <ul className="divide-y divide-gray-100">
          {transactions.map((t) => (
            <li key={t.id} className="py-2 flex justify-between items-center">
              <div>
                <p className="font-medium">{t.description}</p>
                <p className="text-xs text-gray-400">{t.category} • {t.date}</p>
              </div>
              <span className={t.type === 'income' ? 'text-green-500' : 'text-red-500'}>
                {t.type === 'income' ? '+' : '-'} R${' '}
                {t.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  );
}
