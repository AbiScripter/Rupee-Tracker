import { Space, Table, Tag } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const columns = [
  {
    title: "Source",
    dataIndex: "source",
    key: "source",
  },
  {
    title: "Amount",
    dataIndex: "amount",
    key: "amount",
  },
  {
    title: "Tag",
    dataIndex: "tag",
    key: "tag",
  },
  {
    title: "Created At",
    dataIndex: "createdAt",
    key: "createdAt",
  },
  {
    title: "Type",
    dataIndex: "type",
    key: "type",
  },
];

const DataTable = () => {
  const currAccount = useSelector((state) => state.account);
  // console.log(currAccount);
  const originalArr = [...currAccount.incomes, ...currAccount.expenses];
  const [movementsArr, setMovementsArr] = useState([]);

  useEffect(() => {
    setMovementsArr(originalArr);
  }, [currAccount]);

  // console.log(movementsArr);

  const hanldeSortAmount = () => {
    const updatedArr = [...movementsArr].sort((a, b) => b.amount - a.amount);
    setMovementsArr(updatedArr);
    // console.log(updatedArr);
  };

  const handleNoSort = () => {
    setMovementsArr(originalArr);
  };
  return (
    <div>
      <div>
        <button onClick={handleNoSort}>No Sort</button>
        <button onClick={hanldeSortAmount}>Sort By Amount</button>
      </div>
      <Table dataSource={movementsArr} columns={columns} />
    </div>
  );
};

export default DataTable;

// const dataSource = [
//   {
//     key: "1",
//     source: "Mike",
//     amount: 32,
//     tag: "10 Downing Street",
//     type: "10 Downing Street",
//   },
// ];
