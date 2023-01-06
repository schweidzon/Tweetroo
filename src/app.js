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
	const newTweet = req.body
	users.forEach((user) => {
		if(user.username === newTweet.username) {
			
			newTweet.avatar = user.avatar
		}
	})
	console.log(newTweet)
	tweets.push(newTweet)

	res.send(tweets)
})


app.get("/tweets", (req,res) => {
    res.send(tweets)
})

app.listen(5000, () => {
    console.log("Server on")
})