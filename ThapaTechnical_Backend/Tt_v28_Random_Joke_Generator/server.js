import https from "https";
import chalk from "chalk";

const getJoke = () => {
  const url = "https://official-joke-api.appspot.com/random_joke";

  https
    .get(url, (res) => {
      let data = "";

      res.on("data", (d) => {
        data += d;
      });

      res.on("end", () => {
        const joke = JSON.parse(data);
        console.log("---------Joke--------");
        console.log(chalk.green.bold(`${joke.setup}`));
        console.log(chalk.blue.bgRed.bold(`${joke.punchline}`));
      });
    })
    .on("error", (e) => {
      console.error(e);
    });
};

getJoke();
