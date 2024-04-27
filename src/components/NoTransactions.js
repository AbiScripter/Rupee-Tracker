import React from "react";
import transactions from "../assets/transactions.svg";
function NoTransactions() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        flexDirection: "column",
        marginBottom: "2rem",
      }}
    >
      <img
        alt="no-transactions"
        src={transactions}
        style={{ margin: "4rem" }}
        className="no-transactions-img"
      />
      <p className="no-transactions-text" style={{ textAlign: "center" }}>
        You Have No Transactions Currently
      </p>
    </div>
  );
}

export default NoTransactions;
