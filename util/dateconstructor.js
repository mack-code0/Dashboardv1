let today = new Date()
const getDate = ()=>{
    return `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`
}

module.exports = getDate