export const getAgeFilter = (selectedAge) => {
  const splitValues = selectedAge.split("-");
  const firstElement = splitValues[0];
  let secondElement = splitValues[1];
  if (secondElement === undefined) {
    secondElement = Infinity;
  }
  return { firstElement, secondElement };
};

export const formatDateForBar = (dateString) => {
  const splitValues = dateString.split("/");
  const day = splitValues[0];
  const month = splitValues[1];
  const year = splitValues[2];

  const newDate = `${month}/${day}/${year}`;
  return newDate;
};

export const formatDateForLineChart = (dateString) => {
  const convertedDate = new Date(dateString);
  const monthName = convertedDate.toLocaleString("default", { month: "short" });
  const date = convertedDate.getDate();

  const formattedDate = `${date}-${monthName}`;
  return formattedDate;
};
