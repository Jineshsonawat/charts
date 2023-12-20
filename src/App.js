import "./App.css";
import { useFilter } from "./customHooks";
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
  const onBarClick = (arg) => {
    console.log(arg);
  };

  const {
    getAgeData,
    getGenderData,
    getStartDate,
    getEndDate,
    convertFilteredData,
    filteredData,
  } = useFilter();

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
