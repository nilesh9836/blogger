import db from "../../main";

db.collection("users").add({
	name: "nilesh",
	email: "abc@gmail.com",
	password: "123err"
});
console.log(db.collection("users").get())

