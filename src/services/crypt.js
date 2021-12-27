let arrIntMsg
let arrKey
let arrMod
let arrCryptMsg
let maxNum = 256

const cryptData = (data) => {
    arrIntMsg = []
    arrKey = []
    arrMod = []
    arrCryptMsg = []
    utfToArrInt(data)
    return [arrIntMsg, arrKey, arrMod, arrCryptMsg]
}

const utfToArrInt = (message) => {
    for (const index in message) {
        arrIntMsg.push(message.charCodeAt(index))
    }
    generateArrKey()
}

const generateArrKey = () => {
    for (let i = 0; i < arrIntMsg.length; i++) {
        arrKey.push(Math.round(Math.random() * maxNum))
    }
    generateArrMod()
}

const generateArrMod = () => {
    arrIntMsg.map((item, index) => (
        arrMod.push((item + arrKey[index]) % maxNum)
    ))
    concatenateHex()
}

const concatenateHex = () => {
    arrMod.map((item, index) => {
        let key = arrKey[index].toString(16)
        let mod = item.toString(16)
        if(key.length !== 2){
            key = '0' + key
        }
        if(mod.length !== 2){
            mod = '0' + mod
        }
        arrCryptMsg.push(key + mod)
        return null
    })
}

const decryptData = (data) => {
    arrCryptMsg = []
    arrKey = []
    arrMod = []
    arrIntMsg = []
    const arrChar = defragHex(data)
    return [arrCryptMsg, arrKey, arrMod, arrIntMsg, arrChar]
}

const defragHex = (data) => {
    const arrChar = []
    for(let i = 0; i < data.length; i += 4){
        const key = parseInt(data.substring(i, i+2), 16)
        const mod = parseInt(data.substring(i+2, i+4), 16)
        let asciiCode = mod - key
        arrCryptMsg.push(data.substring(i, i+4))
        arrKey.push(key)
        arrMod.push(mod)
        if(asciiCode < 0){
            asciiCode = 256 + asciiCode
        }
        arrIntMsg.push(asciiCode)
        arrChar.push(String.fromCharCode(asciiCode))
    }
    return arrChar
}

const toExport = {cryptData, decryptData}

export default toExport