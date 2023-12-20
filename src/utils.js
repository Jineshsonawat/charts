import data from "./Output";

export const getAgeFilter = (selectedAge) => {
  const splitValues = selectedAge.split("-");
  const firstElement = splitValues[0];
  let secondElement = splitValues[1];
  if (secondElement === undefined) {
    secondElement = Infinity;
  }
  return { firstElement, secondElement };
};

export const formatDate = (date) => {
  const splitValues = date.split("/");
  const day = splitValues[0];
  const month = splitValues[1];
  const year = splitValues[2];

  const newDate = `${month}/${day}/${year}`;
  return newDate;
};

export const modifiedUserData = data.map((item) => ({
  ...item,
  workTime: Math.round(item.workTime / 60),
  date: formatDate(item.date),
}));
