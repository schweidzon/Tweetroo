import express from 'express'
import cors from 'cors'

const app = express()

app.use(express.json())

app.use(cors())

const users = []

const tweets = []

app.post("/sign-up", (req, res) => {
	console.log(req.body)
	const newUser = req.body
	if (!newUser.username|| !newUser.avatar) {
		return res.status(400).send("Todos os campos são obrigatórios!")
	}

	users.push(newUser)
	res.status(201).send("Created")
	//res.status(201).send("Created")


})

app.post("/tweets", (req, res) => {

	if (users.length === 0) {
		return res.status(401).send({
			message: 'UNAUTHORIZED'
		});
	}
	const newTweet = req.body
	if (!newTweet.username || !newTweet.avatar) {
		return res.status(400).send("Todos os campos são obrigatórios!")
	}
	users.forEach((user) => {

		if (user.username === newTweet.username) {
			newTweet.avatar = user.avatar
		}
	})

	tweets.push(newTweet)

	//res.send(tweets.splice(0, tweets.length - 10))
	//res.status(201).send("Created")

})


app.get("/tweets", (req, res) => {
	res.send(tweets.splice(0, tweets.length - 10))
})

app.get("/tweets/:username", (req, res) => {
	res.send(tweets.filter((tweet) => req.params.username === tweet.username))
})

app.listen(5000, () => {
	console.log("Server on")
})

