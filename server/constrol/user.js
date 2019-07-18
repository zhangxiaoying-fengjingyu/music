
// 测试接口

module.exports.Api = (req, res) => {
    res.end('server is running')
}

//登录接口

//创建数据库
const mysql = require('mysql');
const { createToken } = require('../utils/index')
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123321',
    database: 'qqmusic',
});
//数据库连接
connection.connect();

//登陆数据库
module.exports.Login = (req, res) => {
    console.log(req.body)
    //把前台传过来的数据，拼接SQL语句到数据库查询
    const { username, password } = req.body
    //sql语句
    const $sql = `select * from user where username='${username}' and password='${password}'`
    connection.query($sql, (error, results) => {
        if (error) {
            res.statusCode = 500
            res.json({
                code: 0,
                msg: error
            })
            return console.log(error)
        } else {
            if (results.length) {
                //console.log(results[0])//数据库里的东西,后台小黑板打印到的
                const token = createToken(results[0].mId)
                //console.log(token)
                const $save = `update user set token='${token}' where mId=${results[0].mId}`
                connection.query($save, (error, results) => {
                    if (error) {
                        return console.error(error)
                    }
                })
                res.statusCode = 200
                res.json({
                    code: 1,
                    msg: 'success',
                    token: token
                })
            } else {
                res.statusCode = 401
                res.json({
                    code: 0,
                    msg: '用户名密码不正确'
                })
                return console.log(error)
            }
        }
    });
}

//movie数据库

// module.exports.movie = (req, res) => {
//     const { name, imgUrl, describe, actor, start_time, end_time, score } = req.body
//      "insert into movie(`name`,`imgUrl`,`describe`,`actor`,`start_time`,`end_time`,`score`) VALUES('Alita: Battle Angel', '/images/movie/Battle Angel.jpg','故事发生在遥远的26世纪，外科医生依德（克里斯托弗·瓦尔兹 Christoph Waltz 饰）在垃圾场里捡到了只剩下头部的机械少女将她带回家中，给她装上了本来为自己已故的女儿所准备的义体，并取名阿丽塔（罗莎·萨拉扎尔 Rosa Salazar 饰）。苏醒后的阿丽塔对这个五彩斑斓但却暴力而又残酷的世界产生了浓厚的兴趣，在结识了青年雨果（基恩·约翰逊 Keean Johnson 饰）后，阿丽塔开始接触名为机动球的运动，并在比赛中展现出了惊人的格斗天赋。 在废铁城居民们的头顶，漂浮着巨大的浮空城市撒冷，废铁城居民们的一切劳作和付出，都是为了给撒冷提供继续运作的燃料。在大财阀维克特（马赫沙拉·阿里 Mahershala Ali 饰）所设立的机动球比赛中，最终获得冠军的人能够获得前往撒冷生活的资格，阿丽塔决定利用自己的格斗天赋参加比赛，却被卷入了一个巨大的阴谋之中。','罗莎·萨拉查 Rosa Salazar ,克里斯托弗·沃尔兹 Christoph Waltz ,基恩·约翰逊 Keean Johnson ,艾德·斯克林 Ed Skrein ','2019-02-05 10:00:00','2019-7-11 10:00:00', 6.4)",

//     "insert into movie(`name`,`imgUrl`,`describe`,`actor`,`start_time`,`end_time`,`score`) VALUES('The Best of Enemies', '/images/movie/best.jpg','STXfilms拿下塔拉吉·P·汉森和山姆洛·克威尔主演新片《最佳敌人》(The Best of Enemies)的北美发行权，Babou Ceesay(《侠盗一号》)、安妮·海切(《危险机密》)、韦斯·本特利(《美国恐怖故事》)、布鲁斯·麦克吉尔(《妙女神探》)、小约翰·加拉赫、尼克·西塞等参演。制片人罗宾·比塞尔(《饥饿游戏》《琼斯的自由国度》)首执导筒，并根据Osha Gray Davidson所著书籍改编剧本。 汉森饰演北卡罗来纳州达勒姆的民权活动家Ann Atwater，与3K党领导者C.P. Ellis(洛克威尔)进行了为时10年的斗争，直到1971年，两人同意共同主持一个为期两周的社区会议，以应对法院命令的学校废除种族隔离法令。这场会议改变了他们的生活.','塔拉吉·P·汉森 Taraji P. Henson ,山姆·洛克威尔 Sam Rockwell ,巴布·塞赛 Babou Ceesay ,尼克·西塞 Nick Searcy ','2019-04-05 10:00:00','2019-7-11 10:00:00', 8.4)",

//     "insert into movie(`name`,`imgUrl`,`describe`,`actor`,`start_time`,`end_time`,`score`) VALUES('Teen Spirit ', '/images/movie/teen.jpg','范宁扮演的一个来自欧洲小镇害羞女孩，梦想自己可以成为一名流行歌手，幸运的是在一个导师的帮助下，她逐渐接近了自己梦想。 ','艾丽·范宁 Elle Fanning ,丽贝卡·豪尔 Rebecca Hall ,米莉·布拉迪 Millie Brady ,伊丽莎白·贝林顿 Elizabeth Berrington','2018-09-07 10:00:00','2018-10-11 10:00:00', 6.4) ",

//      "insert into movie(`name`,`imgUrl`,`describe`,`actor`,`start_time`,`end_time`,`score`) VALUES('Of Fathers and Sons/Kinder des Kalifats ', '/images/movie/son.jpg','塔拉勒·德克回到了他的家乡，在那里他获得了一个激进的伊斯兰家庭的信任，并分享他们的日常生活长达两年多。他的照相机提供了一种极为罕见的洞察，了解在伊斯兰哈里发长大意味着什么,'阿布·乌萨马 Abu Osama ,艾曼·乌萨马 Ayman Osama ,乌萨马·乌萨马 Osama Osama ','2017-11-05 10:00:00','2017-7-11 10:00:00', 7.2) ",

//     "insert into movie(`name`,`imgUrl`,`describe`,`actor`,`start_time`,`end_time`,`score`) VALUES('反贪风暴4/P风暴 ', '/images/movie/storm.jpg','廉政公署收到报案人廖雨萍（周秀娜饰）的实名举报，举报正在坐牢的富二代曹元元（林峯饰）涉嫌行贿监狱里的监督沈济全（谭耀文饰）以及惩教员，首席调查主任陆志廉（古天乐饰）决定深入虎穴，卧底狱中。在监狱里，被陆志廉送入监狱的前警司黄文彬（林家栋饰）以及曹元元两大帮派势成水火，陆志廉趁机接近曹元元取得信任。同时监狱外的廉政公署总调查主任程德明（郑嘉颖饰）、国内反贪局行动处处长洪亮（丁海峰饰）也陆港联手，通力合作，最终成功破获贪腐行贿大案。','古天乐 Louis Koo ,郑嘉颖 Kevin Cheng ,林峯 Raymond Lam ,林家栋 Ka Tung Lam ','2019-04-04 10:00:00','2019-7-11 10:00:00',9.4)",
//     connection.query($musicList, function (error, results) {
//         if (error) {
//             return console.error(error)
//         }
//     })
// }

//断开连接
// connection.end();