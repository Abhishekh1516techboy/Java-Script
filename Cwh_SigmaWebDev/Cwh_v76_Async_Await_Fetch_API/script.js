async function myData () {
    return new Promise((res, rej) => {
        console.log("i am promise full fill after 3.5 second")
        setTimeout(() => {
            res(244);
            console.log("i am full fill successfully")
        }, 3500)
    })
}

async function main () {
    console.log("helloo developer")
    let data = await myData()
    console.log(data)
    console.log("helloo Programmer")
}

main();
