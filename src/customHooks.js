import { modifiedUserData } from "./utils.js";
import { useState } from "react";

const useFIlter = () => {
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
      const nameA = a.name.toUpperCase();
      const nameB = b.name.toUpperCase();
      if (nameA < nameB) {
        return 1;
      }
      if (nameA > nameB) {
        return -1;
      }
      return 0;
    });

  return {
    getAgeData,
    getGenderData,
    getStartDate,
    getEndDate,
    convertFilteredData,
    filteredData,
  };
};

export { useFIlter };
