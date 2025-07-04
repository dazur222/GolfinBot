
const { MongoClient } = require('mongodb');
const client = new MongoClient('mongodb://localhost:27017');

async function getConversations(){
  await client.connect()
  const db = client.db("golfinBot")
  const history = db.collection("history") 

  let data = await history.find().toArray()
  console.log("data")
  console.log(data)
 return data 
 
}
async function saveConversation(data){
  await client.connect();
  const db = client.db('golfinBot');
  const history = db.collection('history');

  history.insertOne(data)

}
let count = 0
async function promptProccesor(prompt) {
  let data = await getAllData()
 
  console.log("la data es ", data)
  prompt = removeAccents(prompt.toLowerCase())
  let ndea = ["No entendí tu pregunta, ¿Podrías reformularla?","Parece ser qué no te estoy entendiendo, otra vez.","La neta no te entiendo","Cérciorate de que estes hablando español","...","hyaol37","Yo también puedo decir cosas sin sentido, pero bueno empezemos otra vez"]

  for(let entry of data){
    for(let key in entry){
      if(key.includes("_id")) continue

      let pOfSim = 0.0
      let keysArr = keyToKeysArr(key)      
      console.log("el arreglo de las llaves es")
      console.log(keysArr)

      let elementP = 1/keysArr.length
      console.log(elementP)
      for(let element of keysArr ){

        if(prompt.includes(element)){
          pOfSim += elementP
          console.log(pOfSim)
        }
      }
      console.log(key)  
      console.log("el porcentaje de similaritud es",pOfSim)
      if(pOfSim >= 0.60){
        return entry[key]
      }
    }
  }
  count++
  if(count == 0 || count == ndea.length ) count =0

  return ndea[count] 
}


function keyToKeysArr(key){
    let keyArr = [""]

    let i = 0 
    let j = 0
    let temp = "" 
    for(let i = 0 ; i < key.length ; i++ ){
        if(key[i] == "-"){
            keyArr.push("")
            i++
            j++
        }
        keyArr[j] += key[i]
    }

    return keyArr
}


function removeAccents(str) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

async function addResponse(key,value){
  await client.connect();
  const db = client.db('golfinBot');
  const users = db.collection('data');

  let data = {[key] : value}
  const all = await users.insertOne(data)
  console.log(all);
  return all

}

async function getAllData() {
  await client.connect();
  const db = client.db('golfinBot');
  const users = db.collection('data');

  const all = await users.find().toArray(); // <- toArray is needed!
  console.log(all);
  return all
}

module.exports = {promptProccesor, addResponse,getAllData,saveConversation,getConversations}