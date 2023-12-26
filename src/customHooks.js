import { formatDateForLineChart, formatDateForBar } from "./utils.js";
import { useEffect, useMemo, useState } from "react";
// import data from "./Output";

import axios from "axios";
const useFIlter = () => {
  const [selectedGender, setSelectedGender] = useState("All");
  const [selectedAge, setSelectedAge] = useState("All");
  const [startDate, setStartDate] = useState("All");
  const [endDate, setEndDate] = useState("All");
  const [barName, setBarName] = useState("All");
  const [modifiedUserData, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "https://livequiz.lokeshjain318.repl.co/userData"
        );
        setData(
          res.data.map((item) => ({
            ...item,
            workTime: Math.round(item.workTime / 60),
            date: formatDateForBar(item.date),
          }))
        );
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

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
    setBarName(arg.name);
  };

  const filteredData = useMemo(
    () =>
      modifiedUserData
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
        }),
    [endDate, startDate, selectedGender, selectedAge, modifiedUserData]
  );

  console.log("filteredData", filteredData);

  const modifiedDateUserData = useMemo(
    () =>
      filteredData.map((item) => ({
        ...item,
        date: formatDateForLineChart(item.date),
      })),
    [filteredData]
  );

  const filterDataOnBarClick = useMemo(
    () =>
      modifiedDateUserData.filter((item) => {
        if (barName === "All") {
          return true;
        } else {
          return item.name === barName;
        }
      }),
    [modifiedDateUserData, barName]
  );

  const reducedData = useMemo(
    () =>
      filteredData.reduce((acc, curr) => {
        if (acc[curr.name]) {
          acc[curr.name].workTime += curr.workTime;
        } else {
          acc[curr.name] = { workTime: curr.workTime };
        }
        return acc;
      }, {}),
    [filteredData]
  );

  const convertFilteredData = useMemo(
    () =>
      Object.keys(reducedData)
        .map((category) => {
          return {
            name: category,
            workTime: reducedData[category].workTime,
          };
        })
        .sort((a, b) => {
          const nameA = a.name.toUpperCase();
          const nameB = b.name.toUpperCase();

          if (nameA < nameB) {
            return 1;
          }
          if (nameA > nameB) {
            return -1;
          }
          return 0;
        }),
    [reducedData]
  );

  return {
    getAgeData,
    getGenderData,
    getStartDate,
    getEndDate,
    convertFilteredData,
    filteredData,
    filterDataOnBarClick,
    onBarClick,
  };
};

export { useFIlter };
