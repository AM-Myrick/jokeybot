const SlackBot = require("slackbots");
const axios = require("axios");
const jokeURL = "https://08ad1pao69.execute-api.us-east-1.amazonaws.com/dev/random_joke"
const dadJokeURL = "https://icanhazdadjoke.com/"

const bot = new SlackBot({
    token: process.env.TOKEN,
    name: "jokeybot"
})

bot.on("message", function(data) {
    if (data.type !== "message") {
        return;
    }
    handleMessage(data.text);
});

const handleMessage = (message) => {
    const config = {
        headers: {
            accept: "application/json"
        }
    }
    switch(message) {
        case "!joke":
            axios.get(jokeURL)
                .then(res => sendJoke(res.data))
                .catch(err => {
                    console.log(err);
                });
                break;
        case "!dadJoke":
            axios.get(dadJokeURL, config)
                .then(res => sendDadJoke(res.data))
                .catch(err => {
                    console.log(err);
                });
                break;
        default:
            return;
    }
}

const sendJoke = (joke) => {
    const setup = "`" + joke.setup + "`";
    const punchline = "`" + joke.punchline + "`";
    console.log(joke)

    bot.postMessageToChannel("testchannel", setup);

    setTimeout(function() {
        bot.postMessageToChannel("testchannel", punchline)
    }, 2000);
}

const sendDadJoke = (dadJoke) => {
    console.log(dadJoke)
    bot.postMessageToChannel("testchannel", "`" + dadJoke.joke + "`");
}