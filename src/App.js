import { useState } from "react";
import "./App.css";
import { modifiedUserData } from "./utils.js";

import {
  ResponsiveContainer,
  LineChart,
  XAxis,
  YAxis,
  Line,
  BarChart,
  Bar,
  Tooltip,
} from "recharts";

function App() {
  const [selectedGender, setSelectedGender] = useState("All");
  const [selectedAge, setSelectedAge] = useState("All");
  const [startDate, setStartDate] = useState("All");
  const [endDate, setEndDate] = useState("All");

  function getAgeData(event) {
    setSelectedAge(event.target.value);
  }
  function getGenderData(event) {
    setSelectedGender(event.target.value);
  }

  function getStartDate(event) {
    if (event.target.value.length === 0) {
      setStartDate("All");
    } else {
      setStartDate(event.target.value);
    }
  }
  function getEndDate(event) {
    if (event.target.value.length === 0) {
      setEndDate("All");
    } else {
      setEndDate(event.target.value);
    }
  }

  const onBarClick = (arg) => {
    console.log(arg);
  };

  const filteredData = modifiedUserData
    .filter((item) => {
      if (selectedGender === "All") {
        return true;
      } else {
        return item.gender === selectedGender;
      }
    })
    .filter((item) => {
      if (selectedAge === "All") {
        return true;
      } else {
        return item.age === selectedAge;
      }
    })
    .filter((item) => {
      const givenDate = new Date(item.date);
      const userStartDate = new Date(startDate);
      userStartDate.setHours(0, 0, 0);

      if (startDate === "All") {
        return true;
      } else {
        return givenDate >= userStartDate;
      }
    })
    .filter((item) => {
      const givenDate = new Date(item.date);
      const userEndDate = new Date(endDate);

      if (endDate === "All") {
        return true;
      } else {
        return givenDate < userEndDate;
      }
    });

  console.log(filteredData);

  const reducedData = filteredData.reduce((acc, curr) => {
    if (acc[curr.name]) {
      acc[curr.name].workTime += curr.workTime;
    } else {
      acc[curr.name] = { workTime: curr.workTime };
    }
    return acc;
  }, {});

  const convertFilteredData = Object.keys(reducedData)
    .map((category) => {
      return {
        name: category,
        workTime: reducedData[category].workTime,
      };
    })
    .sort((a, b) => {
      const nameA = a.name.toUpperCase(); // ignore upper and lowercase
      const nameB = b.name.toUpperCase(); // ignore upper and lowercase
      if (nameA < nameB) {
        return 1;
      }
      if (nameA > nameB) {
        return -1;
      }

      // names must be equal
      return 0;
    });

  return (
    <div>
      <div className="flex-direction-row">
        <fieldset className="filter-w">
          <legend>Filters</legend>
          <label>Select Age: </label>
          <select id="age " onChange={getAgeData}>
            <option value="All">All</option>
            <option value="15-25">15 - 25</option>
            <option value=">25">Greater than 25</option>
          </select>

          <label> Select Gender: </label>
          <select id="gender" onChange={getGenderData}>
            <option value="All">All</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </fieldset>
        <fieldset className="filter-w">
          <legend>Select Data Range</legend>
          <label>
            Start Date :- <input type="date" onChange={getStartDate} />
          </label>
          <label>
            End Date :- <input type="date" onChange={getEndDate} />
          </label>
        </fieldset>
      </div>
      <div className="chart">
        <section>
          <h1>Bar Charts</h1>
          <ResponsiveContainer width={600} aspect={3}>
            <BarChart data={convertFilteredData} layout="vertical">
              <YAxis dataKey="name" type="category" />
              <Tooltip />
              <XAxis type="number" dataKey="workTime" />
              <Bar dataKey="workTime" onClick={onBarClick} />
            </BarChart>
          </ResponsiveContainer>
        </section>
        <section>
          <h1>Line Charts</h1>
          <ResponsiveContainer width={600} aspect={3}>
            <LineChart data={filteredData}>
              <Line dataKey="workTime" />
              <Tooltip />
              <XAxis dataKey="date" type="category" />
              <YAxis />
            </LineChart>
          </ResponsiveContainer>
        </section>
      </div>
    </div>
  );
}

export default App;
