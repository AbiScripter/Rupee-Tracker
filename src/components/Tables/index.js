import { Button, Space, Table, Tag, Select, Input } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
const { Search } = Input;
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
    title: "Category",
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
  const originalArr = [...currAccount.incomes, ...currAccount.expenses];
  const [movementsArr, setMovementsArr] = useState([]);
  const [filterValue, setFilterValue] = useState("all");
  const [category, setCategory] = useState("");

  useEffect(() => {
    setMovementsArr(originalArr);
  }, [currAccount]);

  console.log(movementsArr);

  movementsArr.forEach((trans) => {
    console.log(trans.createdAt.slice(0, 14));
  });

  //! Sort
  const hanldeSortAmount = () => {
    const updatedArr = [...movementsArr].sort((a, b) => b.amount - a.amount);
    setMovementsArr(updatedArr);
    // console.log(updatedArr);
  };

  const handleSortDate = () => {
    const updatedArr = [...movementsArr].sort(
      (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
    );

    setMovementsArr(updatedArr);
  };

  const handleNoSort = () => {
    setFilterValue("all");
    setCategory("");
    setMovementsArr(originalArr);
  };

  //!Filter
  const handleFilterChange = (value) => {
    setFilterValue(value);
    const filteredArr = [...originalArr].filter((trans) => {
      if (value === "all") return originalArr;
      return trans.type === value;
    });

    setMovementsArr(filteredArr);
  };

  const handleCategoryChange = (value) => {
    setCategory(value);
    const filteredArr = [...originalArr].filter((trans) => {
      // if (value === "all") return originalArr;
      return trans.tag === value;
    });

    setMovementsArr(filteredArr);
  };

  const onSearch = (value) => {
    console.log(value);
    const filteredArr = [...originalArr].filter((trans) =>
      trans.source.includes(value)
    );
    console.log(filteredArr);
    setMovementsArr(filteredArr);
  };

  return (
    <div>
      <div>
        <Button onClick={hanldeSortAmount}>Sort By Amount</Button>
        <Button onClick={handleSortDate}>Sort By Date</Button>

        <label>Filter By Type : </label>
        <Select
          value={filterValue}
          style={{ width: 120 }}
          onChange={handleFilterChange}
          options={[
            { value: "all", label: "All" },
            { value: "income", label: "Income" },
            { value: "expense", label: "Expenses" },
          ]}
        />

        <label>Filter By Category : </label>
        <Select
          value={category}
          style={{ width: 120 }}
          onChange={handleCategoryChange}
          options={[
            { value: "salary", label: "Salary" },
            { value: "investment", label: "Investment" },
            { value: "freelance", label: "Freelance" },
            { value: "business", label: "Business" },
            { value: "rental", label: "Rental" },
            { value: "houseing", label: "Housing" },
            { value: "groceries", label: "Groceries" },
            { value: "healthcare", label: "HealthCare" },
            { value: "debt", label: "Debt" },
            { value: "entertainment", label: "Entertainment" },
            { value: "education", label: "Education" },
            { value: "personal", label: "Personal" },
          ]}
        />
        <Search
          placeholder="input search text"
          allowClear
          onSearch={onSearch}
          enterButton
          style={{ width: 250 }}
        />
        <Button onClick={handleNoSort}>Clear Sort and Filter</Button>
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
