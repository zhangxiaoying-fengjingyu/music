const md5 = require('md5')
module.exports.createToken = (uid) => {
    //因为md5('message')===>message为字符串，所以用JSON.stringify
    const token = JSON.stringify({
        iss: 'bwwz',
        uid: '1',
        time: new Date().getTime()
    })
    return md5(token)
}