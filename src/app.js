import express from 'express'
import cors from 'cors'

const app = express()

app.use(express.json())

app.use(cors())

const users = []

const tweets = [
	
]

app.post("/sign-up", (req, res) => {
	const newUser = req.body
	console.log(newUser)
	users.push(newUser)
	res.send("Ok")

	
})

app.post("/tweets", (req, res) => {
	if(users.length === 0) {
		return res.status(400).send({
			message: 'UNAUTHORIZED'
		 });
	}
	
	const newTweet = req.body
	users.forEach((user) => {
		if(user.username === newTweet.username) {
			
			newTweet.avatar = user.avatar
		}
	})

	tweets.push(newTweet)

	if(tweets.length > 10) {
		res.send(tweets.slice(-10))
	} else {
		res.send(tweets)
	}
})


app.get("/tweets", (req,res) => {
    res.send(tweets)
})

app.listen(5000, () => {
    console.log("Server on")
})