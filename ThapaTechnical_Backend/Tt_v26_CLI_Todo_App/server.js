import readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const todos = [];

const showMenu = () => {
  console.log("==========================================");
  console.log("\tCommand Line ToDo-App");
  console.log("==========================================");
  console.log("\n 1: Add a Task: ");
  console.log("\n 2: View Task's: ");
  console.log("\n 3: Exit: ");

  rl.question("Choose an option: ", handleInput);
};

const handleInput = (option) => {
  if (Number(option) === 1) {
    rl.question("Enter the Task: ", (task) => {
      todos.push(task);
      console.log("Task added: ", task);
      showMenu();
    });
  } else if (Number(option) === 2) {
    if (todos.length === 0) {
      console.log("You have no Task!");
      showMenu();
      return 0;
    }
    console.log("\n Your ToDO Lists:");
    todos.forEach((task, idx) => {
      console.log(`${idx + 1}. ${task}\n`);
    });
    showMenu();
  } else if (Number(option) === 3) {
    console.log("Exit Successfully!");
    rl.close();
  } else {
    console.log("Invalid Input Plz Choose correct Options!");
    showMenu();
  }
};

showMenu();
