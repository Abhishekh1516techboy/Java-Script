async function harry () {

    let patnaWeather = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("Patna 13 Aug");
        }, 2000)
    });

    let delhiWeather = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("Delhi 13 Aug");
        }, 5000);
    });

    console.log("Fetching Patna Weather plz wait...")
    let patnaW = await patnaWeather;
    console.log("Weather Fetched " + patnaW)


    console.log("Fetching Delhi Weather plz wait...")
    let delhiW = await delhiWeather;
    console.log("Weather Fetched " + delhiW)


    return [patnaW, delhiW];
};

harry();
// harry().then((value) => {
//     console.log(value);
// });