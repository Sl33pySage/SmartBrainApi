const express = require("express");
const app = express();
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

const database = {
	users: [
		{
			id: "123",
			name: "John",
			email: "john@example.com",
			password: "cookies",
			entries: 0,
			joined: new Date(),
		},
		{
			id: "124",
			name: "Sally",
			email: "sally@example.com",
			password: "bananas",
			entries: 0,
			joined: new Date(),
		},
	],
	login: [
		{
			id: "987",
			hash: "",
			email: "john@example.com",
		},
	],
};

app.get("/", (req, res) => {
	res.send(database.users);
});

app.post("/signin", (req, res) => {
	if (
		req.body.email === database.users[0].email &&
		req.body.password === database.users[0].password
	) {
		res.json(database.users[0]);
	} else {
		res.status(400).json("error logging in");
	}
});

app.post("/register", (req, res) => {
	const { email, name } = req.body;
	database.users.push({
		id: "125",
		name: name,
		email: email,
		entries: 0,
		joined: new Date(),
	});
	res.json(database.users[database.users.length - 1]);
});

app.get("/profile/:id", (req, res) => {
	const { id } = req.params;
	let found = false;
	database.users.forEach((user) => {
		if (user.id === id) {
			found = true;
			return res.json(user);
		}
	});
	if (!found) {
		res.status(400).json("Not Found");
	}
});

app.put("/image", (req, res) => {
	const { id } = req.body;
	let found = false;
	database.users.forEach((user) => {
		if (user.id === id) {
			found = true;
			user.entries++;
			return res.json(user.entries);
		}
	});
	if (!found) {
		res.status(400).json("Not Found");
	}
});

app.listen(3000, () => {
	console.log("listening on port 3000");
});

/*  

    / --> res = this is working
    /signin --> POST = success/fail
    /register --> POST = user
    /profile:userid --> GET = user
    /image --> PUT = user
    
*/