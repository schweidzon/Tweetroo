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
	if (!newUser.username|| !newUser.avatar || typeof newUser.username !== "string" || typeof newUser.avatar !== "string") {
		return res.status(400).send("Todos os campos são obrigatórios!")
	}

	users.push(newUser)
	res.status(201).send("Created")
	//res.status(201).send("Created")


})

app.post("/tweets", (req, res) => {	
	const header = req.headers
	console.log(header.user)

	if (users.length === 0) {
		return res.status(401).send({
			message: 'UNAUTHORIZED'
		});
	}
	const newTweet = req.body
	newTweet.username = header.user

	if (!newTweet.username || !newTweet.tweet || typeof newTweet.tweet !== "string") {
		return res.status(400).send("Todos os campos são obrigatórios!")
	}
	users.forEach((user) => {

		if (user.username === newTweet.username) {
			newTweet.avatar = user.avatar
		}
	})
	console.log(newTweet)

	tweets.push(newTweet)

	//res.send(tweets.splice(0, tweets.length - 10))
	res.status(201).send("Created")

})


app.get("/tweets", (req, res) => {
	 const {page} = (req.query)
	 
	 const reversedTweets = [...tweets]
	 
	 if(!page && reversedTweets.length > 10) {		
		return res.send(reversedTweets.reverse().slice(0, 10))	
	}

	
	
	 if(page && page <= 0) {
		console.log(page)
		return res.status(400).send("Informe uma página válida!")
	}

	if(page && page >= 1) {

		return res.send((reversedTweets.reverse().splice(0, page * 10)))
	} 
	  
	if(tweets.length <= 10) {
		return res.send(reversedTweets.reverse())
	}
})

app.get("/tweets/:username", (req, res) => {
	res.send(tweets.filter((tweet) => req.params.username === tweet.username))
})

app.listen(5000, () => {
	console.log("Server on")
})

