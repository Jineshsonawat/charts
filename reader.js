const readline = require("readline");
const fs = require("fs");

const readInterface = readline.createInterface({
  input: fs.createReadStream("./abc.txt"),
  output: process.stdout,
  console: false,
});

const getAlphabet = (num) => {
  switch (num) {
    case 0:
      return "A";
    case 1:
      return "B";
    case 2:
      return "C";
    case 3:
      return "D";
    case 4:
      return "E";
    case 5:
      return "F";
    default:
      return "G";
  }
};

let data = [];

readInterface.on("line", function (line) {
  const [date, age, gender, ...tasks] = line.split(",");
  const represent = tasks.map((task, index) => {
    return {
      date,
      age,
      gender,
      name: getAlphabet(index),
      workTime: task,
    };
  });
  represent.forEach((task) =>
    fs.appendFile("Output.txt", JSON.stringify(task) + ",", (err) => {
      // In case of a error throw err.
      if (err) throw err;
    })
  );
});

console.log(data);
