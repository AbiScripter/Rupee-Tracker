import { Button, Table, Select, Input } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./table.css";
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
  const user = useSelector((state) => state.user.user);
  const originalArr = [...user.incomes, ...user.expenses];
  const [movementsArr, setMovementsArr] = useState([]);
  const [filterValue, setFilterValue] = useState("all");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");
  const defaultTitle = () => "Transaction History";
  const tableProps = {
    title: defaultTitle,
    bordered: true,
  };

  useEffect(() => {
    setMovementsArr(originalArr);
  }, [user]);

  //! Sort

  const onSort = (value) => {
    setSort(value);
    if (value === "amount") {
      hanldeSortAmount();
    } else if (value === "date") {
      handleSortDate();
    } else {
      clearSortAndFilter();
    }
  };

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
    // console.log(value);
    const filteredArr = [...originalArr].filter((trans) =>
      trans.source.includes(value)
    );
    // console.log(filteredArr);
    setMovementsArr(filteredArr);
  };

  const clearSortAndFilter = () => {
    setFilterValue("all");
    setCategory("");
    setMovementsArr(originalArr);
  };

  return (
    <div className="table-section">
      <div className="table-filter-container">
        <div>
          <span>Sort</span>
          <Select
            value={sort}
            style={{ width: 120 }}
            onChange={onSort}
            options={[
              { value: "amount", label: "By Amount" },
              { value: "date", label: "By Date" },
              { value: "clear", label: "Clear Sort" },
            ]}
          />
        </div>

        <div>
          <span>Filter By Type</span>
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
        </div>
        <div>
          <span>Filter By Category</span>
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
        </div>
      </div>
      <div className="search-container">
        <Search
          placeholder="search by source"
          allowClear
          onSearch={onSearch}
          enterButton
          className="source-search"
        />
        <Button onClick={clearSortAndFilter}>Clear Sort and Filter</Button>
      </div>
      <Table
        {...tableProps}
        dataSource={movementsArr}
        columns={columns}
        pagination={false}
        // size="middle"
        className="table"
        scroll={{ x: 400 }}
      />
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
