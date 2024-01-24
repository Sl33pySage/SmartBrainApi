const express = require("express");
const app = express();
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const knex = require("knex");

const register = require("./controllers/register");
const signin = require("./controllers/signin");
const profile = require("./controllers/profile");
const image = require("./controllers/image");

const db = knex({
	client: "pg",
	connection: {
		host: "127.0.0.1",
		// port: 3306,
		user: "postgres",
		password: "Brienne",
		database: "smart-brain",
	},
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
	res.send("success");
});

app.post("/signin", signin.handleSignin(db, bcrypt));
app.post("/register", (req, res) => {
	register.handleRegister(req, res, db, bcrypt);
});
app.get("/profile/:id", (req, res) => {
	profile.handleProfileGet(req, res, db);
});
app.put("/image", (req, res) => {
	image.handleImage(req, res, db);
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
