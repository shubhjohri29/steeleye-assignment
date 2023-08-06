import { useState, useEffect } from "react";

// Data
import mockData from "../assets/data.json";
import timestamps from "../assets/timeStamps.json";

// Components
import Dropdown from "../component/dropdown/Dropdown";
import HeaderTitle from "../component/header-title/HeaderTitle";
import Search from "../component/search/Search";
import List from "../component/list/List";

// Styles
import styles from "./Dashboard.module.css";
import Card from "../component/card/Card";

const Dashboard = () => {
  const [currency, setCurrency] = useState("EUR");
  const [searchText, setSearchText] = useState("");
  const [selectedOrderDetails, setSelectedOrderDetails] = useState({});
  const [selectedOrderTimeStamps, setSelectedOrderTimeStamps] = useState({});

  const [filteredRows, setFilteredRows] = useState([...mockData.results]);

  function filterRows() {
    let filtered = []
    if (searchText) {
      const searchTerm = searchText.toLowerCase().trim();
      filtered = mockData.results.filter(
        (e)=>(e["&id"].toLowerCase().trim().includes(searchTerm))
      )
      console.log(searchTerm);
      // console.log(filtered);
    }else{
      filtered = [...mockData.results]
    }
    setFilteredRows(filtered)
  }
  useEffect(() => {
    filterRows();
  }, [searchText]);

  return (
    <div>
      <div className={styles.header}>
        <HeaderTitle primaryTitle="Orders" secondaryTitle={mockData.results.length + " orders"} />
        <div className={styles.actionBox}>
          <Search
            value={searchText}
            onChange={(e) => {setSearchText(e.target.value);filterRows()}}
          />
          <Dropdown
            options={["GBP", "USD", "JPY", "EUR"]}
            onChange={(e) => setCurrency(e.target.value)}
            selectedItem={currency}
          />
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.section}>
          <Card
            cardData={selectedOrderDetails}
            title="Selected Order Details"
          />
          <Card
            cardData={selectedOrderTimeStamps}
            title="Selected Order Timestamps"
          />
        </div>
        <List rows={filteredRows} currency={currency} timestamps={timestamps} setSelectedOrderTimeStamps={setSelectedOrderTimeStamps} setSelectedOrderDetails={setSelectedOrderDetails} searchText={searchText}/>
      </div>
    </div>
  );
};

export default Dashboard;
