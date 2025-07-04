const express = require('express')
let db = require("./db")

const app = express()
const path = require('path');
const { json } = require('stream/consumers');

app.use(express.static('public'))
app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.get("/sendPrompt", async (req, res) => {
    let prompt = req.query.prompt
    console.log("entramos ")
    console.log(prompt)
    let response =  await db.promptProccesor(prompt)

    console.log("la respuesta del parser es",response)

    let data = {response : response}

    res.json(data)

})

app.get("/addResponse", async (req, res) => {
    let key = req.query.key
    let response = req.query.response

    console.log("entramos ")
    let dbRes =  await db.addResponse(key,response) 

    console.log("la respuesta del parser es",dbRes)

    let data = {response : dbRes}

    res.json(data)

})

app.get("/getData", async (req, res) => {

    console.log("entramos ")
    let dbRes =  await db.getAllData()

    console.log("la respuesta del parser es",dbRes)

    let data = {response : dbRes}

    res.json(data)

})
app.post('/save', async (req,res) => {
    
    console.log(req.body)
    data = req.body
    db.saveConversation(data)
})

app.get('/getConvos',async (req,res) => {
    let data = await db.getConversations()
    res.json(data)
})
app.listen(3000, () => {
    console.log()
})