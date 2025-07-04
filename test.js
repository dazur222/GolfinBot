console.log("test")


let key = "como-ganar-puedo"

console.log(keyToKeysArr(key))

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
