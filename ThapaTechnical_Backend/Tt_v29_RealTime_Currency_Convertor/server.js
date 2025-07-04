import https from "https";
import readline from "readline";
import chalk from "chalk";
import dotenv from "dotenv";

dotenv.config();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const url = `https://v6.exchangerate-api.com/v6/${process.env.apiKey}/latest/USD`;

const convertCurrency = (amount, rate) => {
  return (amount * rate).toFixed(2);
};

https
  .get(url, (res) => {
    let data = "";

    res.on("data", (d) => {
      data += d;
    });

    res.on("end", () => {
      try {
        const rates = JSON.parse(data).conversion_rates;

        rl.question("Enter the amount in USD: ", (amount) => {
          // Validate amount is a number
          if (isNaN(amount) || amount <= 0) {
            console.log(chalk.blue("Please enter a valid amount!"));
            rl.close();
            return;
          }

          rl.question(
            "Enter the target currency (e.g., INR, EUR, AED etc..): ",
            (currency) => {
              const rate = rates[currency.toUpperCase()];
              if (rate) {
                console.log(
                  chalk.green(
                    `${amount} USD is approximately ${convertCurrency(
                      amount,
                      rate
                    )} ${currency.toUpperCase()}`
                  )
                );
              } else {
                console.log(chalk.red("Invalid Currency Code!"));
              }
              rl.close();
            }
          );
        });
      } catch (error) {
        console.log(chalk.red("Error parsing API response:", error.message));
        rl.close();
      }
    });
  })
  .on("error", (error) => {
    console.log(chalk.red("Error fetching exchange rates:", error.message));
    rl.close();
  });
