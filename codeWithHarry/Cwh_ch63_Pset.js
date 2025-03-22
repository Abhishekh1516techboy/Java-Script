// Q2.
const loadScript = async (src) => {
    return new Promise((resolve, reject) => {
        let script = src;
        resolve(console.log(script));

    });
};

const main = async () => {
    let a = await loadScript("https://codewithharry.com");
    console.log(a);
}
main();