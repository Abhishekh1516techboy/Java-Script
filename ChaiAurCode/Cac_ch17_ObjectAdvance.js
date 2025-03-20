// Object singelton...
// const tinderUser = new Object();
const tinderUser = {};
tinderUser.id = "10055";
tinderUser.name = "Abhishekh";
tinderUser.isLoggedIn = true;

console.log("TinderUser: ", tinderUser, "\n");
console.table(tinderUser);
const registerUser = {
    email: "abhishekhkumar1516@gmail.com",
    Address: {
        permanentAddress: {
            city: "jehanabad",
            ps: "paras bigha",
            po: "jamuk",
            pin: 804429,
        },
        LocalAddress: {
            city: "Patna",
            ps: "parsa Bazar",
            po: "kurthaul",
            pin: 804453,
        },
    },
    phone: 6204609187,
}

console.log("RegisterUser: ", registerUser, "\n");
console.table(registerUser)
console.log("RegisterUser Address: ", registerUser.Address, "\n");
console.table(registerUser.Address)
console.log("RegisterUser PermanentAddress: ", registerUser.Address.permanentAddress);
console.table(registerUser.Address.permanentAddress);
console.log("RegisterUser LocalAddress: ", registerUser.Address.LocalAddress);
console.table(registerUser.Address.LocalAddress)

const obj1 = { 1: "a", 2: "b" };
const obj2 = { 3: "c", 4: "d" };

const obj3 = Object.assign({}, obj1, obj2); // assign method...
console.log("Assign methiod: ", obj3);

console.log("dot Operator: ", { ...obj1, ...obj2 },"\n"); //.dot Operator...

const users = [
    {
        id: 1,
        email: "technologyfire@gmail.com"
    },
    {
        id: 1,
        email: "technologyfire@gmail.com"
    },
    {
        id: 1,
        email: "technologyfire@gmail.com"
    },
];
console.log("Users: ",users,"\n");
console.log("Users first: ",users[0]);
console.log("users first email: ",users[0].email);

console.log("\ntinderUser: ",tinderUser);
console.log("tinderUser Key: ",Object.keys(tinderUser));
console.log("tinderUser Values: ",Object.values(tinderUser));
console.log("tinderUser Entries: ",Object.entries(tinderUser));