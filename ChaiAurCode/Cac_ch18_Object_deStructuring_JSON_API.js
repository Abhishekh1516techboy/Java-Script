// de-Structuring...
const course = {
    coursename: "js in Hindi",
    price: 499,
    teacherName: "Hitest Sir",
};
console.log("entries: ", Object.entries(course))
console.log("keys: ", Object.keys(course))
console.log("Values: ", Object.values(course))

const { teacherName: tn } = course;
console.log("destructuring: ", tn);

// API...
// {
//     "name": "hitesh",
//     "courseName": "javaScript",
//     "price": "free,"
// }

// [
//     {},
//     {},
//     {},
// ]