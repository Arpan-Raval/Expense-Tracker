import React, { useState, useEffect } from "react";
import "./ExpenseTracker.css"; // Import CSS for styling

const ExpenseTracker = () => {
  const [transactions, setTransactions] = useState(
    JSON.parse(localStorage.getItem("transactions")) || []
  );
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  const addTransaction = (type) => {
    if (!description || !amount) return;

    const newTransaction = {
      id: Date.now(),
      description,
      amount: parseFloat(amount),
      type,
    };

    setTransactions([...transactions, newTransaction]);
    setAmount("");
    setDescription("");
  };

  const deleteTransaction = (id) => {
    setTransactions(
      transactions.filter((transaction) => transaction.id !== id)
    );
  };

  const getBalance = () => {
    return transactions.reduce(
      (acc, transaction) =>
        transaction.type === "income"
          ? acc + transaction.amount
          : acc - transaction.amount,
      0
    );
  };

  return (
    <div className="container">
    <div className="main">
      <h2>💰 Expense Tracker</h2>
      <h3 className="balance">Balance: ₹{getBalance()}</h3>

      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <button className="add-income" onClick={() => addTransaction("income")}>
        + Income
      </button>
      <button className="add-expense" onClick={() => addTransaction("expense")}>
        - Expense
      </button>

      <h3>📜 Transaction History</h3>
    </div>
      <ul className="transactions">
        {transactions.map((transaction) => (
          <li
            key={transaction.id}
            className={transaction.type === "income" ? "income" : "expense"}
          >
            {transaction.description}: ₹{transaction.amount} ({transaction.type}
            )
            <button
              className="delete-btn"
              onClick={() => deleteTransaction(transaction.id)}
            >
              ❌
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExpenseTracker;
