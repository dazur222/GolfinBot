
async function getAllData(){
    try{
        let promesa =  await fetch("/getData")
        let response = await promesa.json()
    

        
        document.getElementById("allData").innerText = JSON.stringify(response)
    }
    catch(e){
        console.log(e)
    }
}

async function saveConversation(){
   let convo = document.getElementById("chat").children

   console.log(convo)
   
   let msgArr = []
   for(let msg of convo){
    msgArr.push(msg.innerText)
    console.log(msg.innerText)
   }
   console.log(msgArr)
   let date = new Date()
   console.log(date)

   let name = document.getElementById('title').innerText

   let data = {
        name : name,
        date : date,
        conversation : msgArr
   }

  try{
    let promesa = await fetch("/save",{
        method : "POST",
        headers : {'Content-Type' : 'application/json'},
        body : JSON.stringify(data)
    })

    let response = await promesa.json()

    console.log(response)
  }
  catch(e){
    console.log("hola")
    console.log(e)
  }

}

async function getConversations(){
}


document.addEventListener("DOMContentLoaded", async () => {
    console.log("hola")

        let promesa = await fetch("/getConvos")
        let chats = await promesa.json()

        console.log(chats)
        let chat = document.getElementById("chat")
        
        let header = document.getElementById("chatHistoryList")
        for(let chat of chats){
            let btn = document.createElement("button")
            btn.innerText = chat['name']
            btn.className = "btns"
            btn.addEventListener('click',() => {
               showConversation(chat) 
            })
            header.appendChild(btn)


        }
}) 
function newConversation(){
    document.getElementById("chat").innerHTML  = ` 
      <div class="message bot">FAQ<br>
      ¿Qué es golfin?<br>
    ¿Cómo se juega <br>
  ¿Cómo puedo jugar con amigos?</div>
  `
}
function showConversation(chat){
    let newChat = document.createElement("div")
    newChat.className = "chat-messages"
    newChat.id = chat['date'] 

    insertMessages(newChat,chat)

    let ogChat = document.getElementById("chat")
    ogChat.innerHTML = newChat.innerHTML 
}

function insertMessages(chat,chatData){

        let i = 0
        for(let message of chatData['conversation']){

            if(i%2== 1){

                const userMsg = document.createElement('div');
                userMsg.className = 'message user';

                userMsg.textContent = message;
                chat.appendChild(userMsg);
            }
            else{

                const botMsg = document.createElement('div');
                botMsg.className = 'message bot';

                botMsg.textContent = message;
                chat.appendChild(botMsg);
            }

            i++
        }
}


async function sendPrompt(prompt){
    console.log(prompt)
    try{
        let promesa =  await fetch(`/sendPrompt?prompt=${prompt}`)
        let response = await promesa.json()
        
        return response
    }
    catch(e){
        console.log(e)
    }
}


async function addResponse(){
        let key = document.getElementById("key").value
        let response = document.getElementById("response").value

    try{
        console.log(`/addResponse?key=${key}&response=${response}`)
        let promesa =  await fetch(`/addResponse?key=${key}&response=${response}`)
        let res = await promesa.json()
      
        return res
    }
    catch(e){
        console.log(e)
    }
}