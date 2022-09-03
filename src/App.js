import "./App.css";
import React, { useState, useEffect } from "react";
import Select from "react-select";
import Card from "./SummaryCard";

function App() {
  const locationList = [
    { value: "AB", label: "Alberta" },
    { value: "BC", label: "British Columbia" },
    { value: "canada", label: "Canada" },
    { value: "MB", label: "Manitoba" },
    { value: "NB", label: "New Brunswick" },
    { value: "NL", label: "Newfoundland and Labrador" },
    { value: "NT", label: "Northwest Territories" },
    { value: "NS", label: "Nova Scotia" },
    { value: "NU", label: "Nunavut" },
    { value: "ON", label: "Ontario" },
    { value: "PE", label: "Prince Edward Island" },
    { value: "QC", label: "Quebec" },
    { value: "SK", label: "Saskatchewan" },
    { value: "YT", label: "Yukon" },
  ];

  const [activeLocation, setActiveLocation] = useState("canada");
  const [lastUpdated, setlastUpdated] = useState("");
  const [summaryData, setSummaryData] = useState({});

  const baseUrl = "https://api.opencovid.ca";
  const getVersion = async () => {
    const res = await fetch(`${baseUrl}/version`);
    const data = await res.json();
    setlastUpdated(data.version);
  };

  useEffect(() => {
    getVersion();
  }, [activeLocation]);

  return (
    <div className="App">
      <h1>COVID 19 Dashboard </h1>
      <div className="dashboard-container">
        
      <div className="dashboard-menu ">
          <Select
            options={locationList}
            onChange={(selectedOption) =>
              setActiveLocation(selectedOption.value)
            }
            defaultValue={locationList.filter(
              (options) => options.value == activeLocation
            )}
            className="dashboard-select"
          />
          <p classNa me="update-date">
            Last Updated : {lastUpdated}
          </p>
        </div>

        <div className="dashboard-timeseries"></div>
        <div className="dashboard-summary">
          <Card title="Total Cases" value={summaryData.cumulative_cases} />
          <Card
            title="Total Recovered"
            value={summaryData.cumulative_recovered}
          />
          <Card title="Total Deaths" value={summaryData.cumulative_deaths} />
          <Card
            title="Total Vaccinated"
            value={summaryData.cumulative_avaccine}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
