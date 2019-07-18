/*
 * @Author: zhangxiaoying 
 * @Date: 2019-07-10 13:45:53 
 * @Last Modified by: zhangxiaoying
 * @Last Modified time: 2019-07-13 12:05:04
 */
const axios = require('axios')

//扒到的轮播图数据
module.exports.BannerList = (req, res) => {
    const token = req.headers.token;
    const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg?_=1562725287368&g_tk=5381&uin=0&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1'
    if (token) {
        axios.get(url, {
            headers: {
                Origin: 'https://y.qq.com',
                Referer: 'https://y.qq.com'
            }
        }).then((resault) => {
            //console.log(resault.data)
            res.json({
                code: 1,
                data: resault.data
            })
        })
    } else {
        res.status(401).json({
            code: 0,
            msg: '用户未登录'
        })
    }
}
//扒到的排行的数据
module.exports.TopList = (req, res) => {
    const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg?_=1562756459869&g_tk=5381&uin=0&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1'
    axios.get(url, {
        headers: {
            Origin: 'https://y.qq.com',
            Referer: 'https://y.qq.com'
        }
    }).then((resault) => {
        // console.log(resault.data.data.topList)
        res.json({
            code: 1,
            data: resault.data.data.topList
        })
    })
}