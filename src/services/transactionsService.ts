import type { Transaction } from '../types/Transaction';

const STORAGE_KEY = '@finance-app:transactions';

export function getTransactions(): Transaction[] {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

export function saveTransaction(transaction: Transaction) {
  const transactions = getTransactions();
  transactions.push(transaction);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
}

export function deleteTransaction(id: string) {
  const transactions = getTransactions().filter(
    transaction => transaction.id !== id
  );
  localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
}

export function getBalance() {
  const transactions = getTransactions();

  return transactions.reduce(
    (acc, transaction) => {
      if (transaction.type === 'income') {
        acc.income += transaction.amount;
        acc.total += transaction.amount;
      } else {
        acc.expense += transaction.amount;
        acc.total -= transaction.amount;
      }
      return acc;
    },
    { income: 0, expense: 0, total: 0 }
  );
}
