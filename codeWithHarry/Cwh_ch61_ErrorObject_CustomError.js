try {
    console.log(harry);
    throw new ReferenceError("Harry variable is not Avaliable...") // custom error throw...
} catch (error) {
    console.log(error.name);
    console.log(error.message);
    // console.log(error.stack);
}

