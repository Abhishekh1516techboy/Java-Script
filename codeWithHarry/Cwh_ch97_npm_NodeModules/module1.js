// common js...
const hello = () => {
    console.log("Hello i am hello function in module1");
}

const goodMorning = (name) => {
    console.log("good Moring " + name);
}

module.exports = { hello, goodMorning };
