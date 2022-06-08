/*
  
软件名：红包视频 一天3~5元  cron 建议设置每40分钟一次

跑一次5个视频，每日估计上限2W.

软件下载地址：应用商城（应用宝之类的）可以搜索下载

如提示Cannot find module 'axios'   依赖管理-NodeJs-axios

食用方法：抓包 我 得到结果 请求地址中包含 getUserById 

点进去改连接查看信息  点 请求 点右下角 预览 点下界面 把

umeng_token 、user_id 、device 值复制，然后拼成 umeng_token=xxx&user_id=xxx&device=xxx 

(不区分先后顺序) 

多号用 @ 隔开

*/
const $ = new Env('红包视频');

const notify = $.isNode() ? require('./sendNotify') : '';

const axios = require("axios");

let tz = ($.getval('tz') || '1'); 

$.message = ''

let app_hbsp_boby=''

if ($.isNode()) {

    app_hbsp_boby=process.env.hbsp_boby? process.env.hbsp_boby.split("@") : []

    //app_hbsp_boby = process.env.hbsp_boby? process.hbsp_boby.split("@") : []

} else {

    app_hbsp_boby=''

    $.message +="\n【微信运动榜提示】：无法获取变量"+'\n'

}

!(async () => {

    if (!app_hbsp_boby) {


        $.message += `\n【${$.name}提示】：请填写变量后再试吧`

    } else {

        console.log(`==================================================\n 脚本执行 - 北京时间(UTC+8): ${new Date(
        new Date().getTime() + new Date().getTimezoneOffset() * 60 * 1000 + 8 * 60 * 60 * 1000
    ).toLocaleString()} \n==================================================`);
    

        console.log(`我的邀请码：kk5527043`)
        console.log(`当result: 0 时说明金币已上限,请停止脚本运行`)
        console.log(`============== 共${app_hbsp_boby.length}个账号 ==============\n`)

        for (i = 0; i < app_hbsp_boby.length; i++) {

            if (app_hbsp_boby[i]) {

                hbsp_boby=app_hbsp_boby[i]

                hbsp_headers=JSON.parse(`{"content-type": "application/x-www-form-urlencoded","user-agent": "okhttp/3.10.0","content-length": ${hbsp_boby.length}}`)

                await hbsp_byq()

                $.index = i + 1;

                

                console.log(`\n开始【账号${$.index} 任务】`)

                //签到

               await hbsp_qd()

               //开视频箱子

               await hbsp_openBox()

               await $.wait(5000)

                for (let x = 0; x < 5; x++) {

                    $.index = x + 1

                    console.log(`\n第${x + 1}次看视频！`)

                    await hbsp_ksp()

                    await $.wait(15000)

                }

            }

        }

 message()

        

    }

})()

    .catch((e) => $.logErr(e))

    .finally(() => $.done())

//签到

async function hbsp_qd() {

    let hbsp_videoId=Math.ceil(Math.random()*100);

    //console.log(hbsp_videoId)

        let data = await axios({

                url:`https://hbapi.qudianyue.com/video?&t=${get_time()}&m=getGold`,

                headers: hbsp_headers,

                contentType:"application/x-www-form-urlencoded",

                method:"post",

                data:hbsp_boby+`&m=getGold&version=3.1.0&type=2&video_index=2`,

        })

        console.log(data.data)

        /*if(data.data.success==false){

            //{ failDesc: '今日宝物已经被抢光，请明天再来开启吧！', errorCode: 500, success: false }

            console.log(`\n【${$.name}--账号${i+1}开视频箱】：${data.data.failDesc}`);  

            $.message += `\n【${$.name}--账号${i+1}开视频箱】：${data.data.failDesc}`

        }else{

            console.log(`\n【${$.name}--账号${i+1}开视频箱】：获得 ${data.data.result}`);  

          $.message += `\n【${$.name}--账号${i+1}开视频箱】：获得 ${data.data.result}`

        }*/

}

//看视频

async function hbsp_ksp() {

    let hbsp_videoId=Math.ceil(Math.random()*50);

        let data = await axios({

                url:`https://hbapi.qudianyue.com/video?t=${get_time()}&m=getGold`,

                headers: hbsp_headers,

                contentType:"application/x-www-form-urlencoded",

                method:"post",

                data:hbsp_boby+`&m=getGold&version=3.1.0&videoId=${hbsp_videoId}&t=${times}`,

        })

       //console.log(data) 

        if(data.data.success==false){

            console.log(`\n【${$.name}--账号${i+1}看视频】：${data.data.failDesc}`);  

            $.message += `\n【${$.name}--账号${i+1}看视频】：${data.data.failDesc}`

        }else{

          console.log(`\n【${$.name}--账号${i+1}看视频】：获得 ${data.data.result} 金币`);  

          $.message += `\n【${$.name}--账号${i+1}看视频】：获得 ${data.data.result} 金币`

        }

}

//开视频箱子

async function hbsp_openBox() {

    let hbsp_videoId=Math.ceil(Math.random()*100);

    //console.log(hbsp_videoId)

        let data = await axios({

                url:`https://hbapi.qudianyue.com/video?&t=${get_time()}&m=openBox`,

                headers: hbsp_headers,

                contentType:"application/x-www-form-urlencoded",

                method:"post",

                data:hbsp_boby+`&m=openBox&code=ns4679336&version=3.1.0`,

        })

        //console.log(data.data)

        if(data.data.success==false){

            //{ failDesc: '今日宝物已经被抢光，请明天再来开启吧！', errorCode: 500, success: false }

            console.log(`\n【${$.name}--账号${i+1}开视频箱】：${data.data.failDesc}`);  

            $.message += `\n【${$.name}--账号${i+1}开视频箱】：${data.data.failDesc}`

        }else{

            console.log(`\n【${$.name}--账号${i+1}开视频箱】：获得 ${data.data.result}`);  

          $.message += `\n【${$.name}--账号${i+1}开视频箱】：获得 ${data.data.result}`

        }

}

function times() {

    return times=new Date().getTime();

}

function message() {

    if (tz == 1) { $.msg($.name, "", $.message) }

}

function get_time() {

            var date = new Date();

            var seperator1 = "-";

            var seperator2 = ":";

            //前十分钟时间

             var minutes=parseInt("10");  

          var   interTimes=minutes*60*1000;

          var interTimes=parseInt(interTimes);  

             date=new   Date(Date.parse(date)-interTimes);

            

            var month = date.getMonth() + 1;

            var strDate = date.getDate();

            var hour = date.getHours();

            var minutes = date.getMinutes();

            if (month >= 1 && month <= 9) {

                month = "0" + month;

            }

            if (strDate >= 0 && strDate <= 9) {

                strDate = "0" + strDate;

            }

            if (hour >= 0 && hour <= 9) {

                    hour = "0" + hour;

            }

            if (minutes >= 0 && minutes <= 9) {

                    minutes = "0" + minutes;

            }

            var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate

                    + " " + hour + seperator2 + minutes

                    + seperator2 + date.getSeconds();

            return new Date(currentdate).getTime()

        }

async function hbsp_byq() {

    let hbsp_videoId=Math.ceil(Math.random()*100);

    //console.log(hbsp_videoId)

        let data = await axios({

                url:`https://hbapi.qudianyue.com/video?&t=${times}&m=bindCode`,

                headers: hbsp_headers,

                contentType:"application/x-www-form-urlencoded",

                method:"post",

                data:hbsp_boby+`&m=bindCode&code=ns4679336&version=3.1.0`,

        })

}

function Env(name, opts) {

    class Http {

        constructor(env) {

            this.env = env

        }

        send(opts, method = 'GET') {

            opts = typeof opts === 'string' ? {

                url: opts

            } : opts

            let sender = this.get

            if (method === 'POST') {

                sender = this.post

            }

            return new Promise((resolve, reject) => {

                sender.call(this, opts, (err, resp, body) => {

                    if (err) reject(err)

                    else resolve(resp)

                })

            })

        }

        get(opts) {

            return this.send.call(this.env, opts)

        }

        post(opts) {

            return this.send.call(this.env, opts, 'POST')

        }

    }

    return new (class {

        constructor(name, opts) {

            this.name = name

            this.http = new Http(this)

            this.data = null

            this.dataFile = 'box.dat'

            this.logs = []

            this.isMute = false

            this.isNeedRewrite = false

            this.logSeparator = '\n'

            this.startTime = new Date().getTime()

            Object.assign(this, opts)

            this.log('', `🔔${this.name

                }, 开始!`)

        }

        isNode() {

            return 'undefined' !== typeof module && !!module.exports

        }

        isQuanX() {

            return 'undefined' !== typeof $task

        }

        isSurge() {

            return 'undefined' !== typeof $httpClient && 'undefined' === typeof $loon

        }

        isLoon() {

            return 'undefined' !== typeof $loon

        }

        isShadowrocket() {

            return 'undefined' !== typeof $rocket

        }

        toObj(str, defaultValue = null) {

            try {

                return JSON.parse(str)

            } catch {

                return defaultValue

            }

        }

        toStr(obj, defaultValue = null) {

            try {

                return JSON.stringify(obj)

            } catch {

                return defaultValue

            }

        }

        getjson(key, defaultValue) {

            let json = defaultValue

            const val = this.getdata(key)

            if (val) {

                try {

                    json = JSON.parse(this.getdata(key))

                } catch { }

            }

            return json

        }

        setjson(val, key) {

            try {

                return this.setdata(JSON.stringify(val), key)

            } catch {

                return false

            }

        }

        getScript(url) {

            return new Promise((resolve) => {

                this.get({

                    url

                }, (err, resp, body) => resolve(body))

            })

        }

        runScript(script, runOpts) {

            return new Promise((resolve) => {

                let httpapi = this.getdata('@chavy_boxjs_userCfgs.httpapi')

                httpapi = httpapi ? httpapi.replace(/\n/g, '').trim() : httpapi

                let httpapi_timeout = this.getdata('@chavy_boxjs_userCfgs.httpapi_timeout')

                httpapi_timeout = httpapi_timeout ? httpapi_timeout * 1 : 20

                httpapi_timeout = runOpts && runOpts.timeout ? runOpts.timeout : httpapi_timeout

                const [key, addr] = httpapi.split('@')

                const opts = {

                    url: `http: //${addr}/v1/scripting/evaluate`,

                    body: {

                        script_text: script,

                        mock_type: 'cron',

                        timeout: httpapi_timeout

                    },

                    headers: {

                        'X-Key': key,

                        'Accept': '*/*'

                    }

                }

                this.post(opts, (err, resp, body) => resolve(body))

            }).catch((e) => this.logErr(e))

        }

        loaddata() {

            if (this.isNode()) {

                this.fs = this.fs ? this.fs : require('fs')

                this.path = this.path ? this.path : require('path')

                const curDirDataFilePath = this.path.resolve(this.dataFile)

                const rootDirDataFilePath = this.path.resolve(process.cwd(), this.dataFile)

                const isCurDirDataFile = this.fs.existsSync(curDirDataFilePath)

                const isRootDirDataFile = !isCurDirDataFile && this.fs.existsSync(rootDirDataFilePath)

                if (isCurDirDataFile || isRootDirDataFile) {

                    const datPath = isCurDirDataFile ? curDirDataFilePath : rootDirDataFilePath

                    try {

                        return JSON.parse(this.fs.readFileSync(datPath))

                    } catch (e) {

                        return {}

                    }

                } else return {}

            } else return {}

        }

        writedata() {

            if (this.isNode()) {

                this.fs = this.fs ? this.fs : require('fs')

                this.path = this.path ? this.path : require('path')

                const curDirDataFilePath = this.path.resolve(this.dataFile)

                const rootDirDataFilePath = this.path.resolve(process.cwd(), this.dataFile)

                const isCurDirDataFile = this.fs.existsSync(curDirDataFilePath)

                const isRootDirDataFile = !isCurDirDataFile && this.fs.existsSync(rootDirDataFilePath)

                const jsondata = JSON.stringify(this.data)

                if (isCurDirDataFile) {

                    this.fs.writeFileSync(curDirDataFilePath, jsondata)

                } else if (isRootDirDataFile) {

                    this.fs.writeFileSync(rootDirDataFilePath, jsondata)

                } else {

                    this.fs.writeFileSync(curDirDataFilePath, jsondata)

                }

            }

        }

        lodash_get(source, path, defaultValue = undefined) {

            const paths = path.replace(/[(d+)]/g, '.$1').split('.')

            let result = source

            for (const p of paths) {

                result = Object(result)[p]

                if (result === undefined) {

                    return defaultValue

                }

            }

            return result

        }

        lodash_set(obj, path, value) {

            if (Object(obj) !== obj) return obj

            if (!Array.isArray(path)) path = path.toString().match(/[^.[]]+/g) || []

            path

                .slice(0, -1)

                .reduce((a, c, i) => (Object(a[c]) === a[c] ? a[c] : (a[c] = Math.abs(path[i + 1]) >> 0 === +path[i + 1] ? [] : {})), obj)[

                path[path.length - 1]

            ] = value

            return obj

        }

        getdata(key) {

            let val = this.getval(key)

            // 如果以 @

            if (/^@/.test(key)) {

                const [, objkey, paths] = /^@(.*?).(.*?)$/.exec(key)

                const objval = objkey ? this.getval(objkey) : ''

                if (objval) {

                    try {

                        const objedval = JSON.parse(objval)

                        val = objedval ? this.lodash_get(objedval, paths, '') : val

                    } catch (e) {

                        val = ''

                    }

                }

            }

            return val

        }

        setdata(val, key) {

            let issuc = false

            if (/^@/.test(key)) {

                const [, objkey, paths] = /^@(.*?).(.*?)$/.exec(key)

                const objdat = this.getval(objkey)

                const objval = objkey ? (objdat === 'null' ? null : objdat || '{}') : '{}'

                try {

                    const objedval = JSON.parse(objval)

                    this.lodash_set(objedval, paths, val)

                    issuc = this.setval(JSON.stringify(objedval), objkey)

                } catch (e) {

                    const objedval = {}

                    this.lodash_set(objedval, paths, val)

                    issuc = this.setval(JSON.stringify(objedval), objkey)

                }

            } else {

                issuc = this.setval(val, key)

            }

            return issuc

        }

        getval(key) {

            if (this.isSurge() || this.isLoon()) {

                return $persistentStore.read(key)

            } else if (this.isQuanX()) {

                return $prefs.valueForKey(key)

            } else if (this.isNode()) {

                this.data = this.loaddata()

                return this.data[key]

            } else {

                return (this.data && this.data[key]) || null

            }

        }

        setval(val, key) {

            if (this.isSurge() || this.isLoon()) {

                return $persistentStore.write(val, key)

            } else if (this.isQuanX()) {

                return $prefs.setValueForKey(val, key)

            } else if (this.isNode()) {

                this.data = this.loaddata()

                this.data[key] = val

                this.writedata()

                return true

            } else {

                return (this.data && this.data[key]) || null

            }

        }

        initGotEnv(opts) {

            this.got = this.got ? this.got : require('got')

            this.cktough = this.cktough ? this.cktough : require('tough-cookie')

            this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar()

            if (opts) {

                opts.headers = opts.headers ? opts.headers : {}

                if (undefined === opts.headers.Cookie && undefined === opts.cookieJar) {

                    opts.cookieJar = this.ckjar

                }

            }

        }

        get(opts, callback = () => { }) {

            if (opts.headers) {

                delete opts.headers['Content-Type']

                delete opts.headers['Content-Length']

            }

            if (this.isSurge() || this.isLoon()) {

                if (this.isSurge() && this.isNeedRewrite) {

                    opts.headers = opts.headers || {}

                    Object.assign(opts.headers, {

                        'X-Surge-Skip-Scripting': false

                    })

                }

                $httpClient.get(opts, (err, resp, body) => {

                    if (!err && resp) {

                        resp.body = body

                        resp.statusCode = resp.status

                    }

                    callback(err, resp, body)

                })

            } else if (this.isQuanX()) {

                if (this.isNeedRewrite) {

                    opts.opts = opts.opts || {}

                    Object.assign(opts.opts, {

                        hints: false

                    })

                }

                $task.fetch(opts).then(

                    (resp) => {

                        const {

                            statusCode: status,

                            statusCode,

                            headers,

                            body

                        } = resp

                        callback(null, {

                            status,

                            statusCode,

                            headers,

                            body

                        }, body)

                    },

                    (err) => callback(err)

                )

            } else if (this.isNode()) {

                this.initGotEnv(opts)

                this.got(opts)

                    .on('redirect', (resp, nextOpts) => {

                        try {

                            if (resp.headers['set-cookie']) {

                                const ck = resp.headers['set-cookie'].map(this.cktough.Cookie.parse).toString()

                                if (ck) {

                                    this.ckjar.setCookieSync(ck, null)

                                }

                                nextOpts.cookieJar = this.ckjar

                            }

                        } catch (e) {

                            this.logErr(e)

                        }

                        // this.ckjar.setCookieSync(resp.headers['set-cookie'].map(Cookie.parse).toString())

                    })

                    .then(

                        (resp) => {

                            const {

                                statusCode: status,

                                statusCode,

                                headers,

                                body

                            } = resp

                            callback(null, {

                                status,

                                statusCode,

                                headers,

                                body

                            }, body)

                        },

                        (err) => {

                            const {

                                message: error,

                                response: resp

                            } = err

                            callback(error, resp, resp && resp.body)

                        }

                    )

            }

        }

        post(opts, callback = () => { }) {

            const method = opts.method ? opts.method.toLocaleLowerCase() : 'post'

            // 如果指定了请求体, 但没指定`Content-Type`, 则自动生成

            if (opts.body && opts.headers && !opts.headers['Content-Type']) {

                opts.headers['Content-Type'] = 'application/x-www-form-urlencoded'

            }

            if (opts.headers) delete opts.headers['Content-Length']

            if (this.isSurge() || this.isLoon()) {

                if (this.isSurge() && this.isNeedRewrite) {

                    opts.headers = opts.headers || {}

                    Object.assign(opts.headers, {

                        'X-Surge-Skip-Scripting': false

                    })

                }

                $httpClient[method](opts, (err, resp, body) => {

                    if (!err && resp) {

                        resp.body = body

                        resp.statusCode = resp.status

                    }

                    callback(err, resp, body)

                })

            } else if (this.isQuanX()) {

                opts.method = method

                if (this.isNeedRewrite) {

                    opts.opts = opts.opts || {}

                    Object.assign(opts.opts, {

                        hints: false

                    })

                }

                $task.fetch(opts).then(

                    (resp) => {

                        const {

                            statusCode: status,

                            statusCode,

                            headers,

                            body

                        } = resp

                        callback(null, {

                            status,

                            statusCode,

                            headers,

                            body

                        }, body)

                    },

                    (err) => callback(err)

                )

            } else if (this.isNode()) {

                this.initGotEnv(opts)

                const {

                    url,

                    ..._opts

                } = opts

                this.got[method](url, _opts).then(

                    (resp) => {

                        const {

                            statusCode: status,

                            statusCode,

                            headers,

                            body

                        } = resp

                        callback(null, {

                            status,

                            statusCode,

                            headers,

                            body

                        }, body)

                    },

                    (err) => {

                        const {

                            message: error,

                            response: resp

                        } = err

                        callback(error, resp, resp && resp.body)

                    }

                )

            }

        }

        /**

         *

         * 示例:$.time('yyyy-MM-dd qq HH:mm:ss.S')

         *    :$.time('yyyyMMddHHmmssS')

         *    y:年 M:月 d:日 q:季 H:时 m:分 s:秒 S:毫秒

         *    其中y可选0-4位占位符、S可选0-1位占位符，其余可选0-2位占位符

         * @param {string} fmt 格式化参数

         * @param {number} 可选: 根据指定时间戳返回格式化日期

         *

         */

        time(fmt, ts = null) {

            const date = ts ? new Date(ts) : new Date()

            let o = {

                'M+': date.getMonth() + 1,

                'd+': date.getDate(),

                'H+': date.getHours(),

                'm+': date.getMinutes(),

                's+': date.getSeconds(),

                'q+': Math.floor((date.getMonth() + 3) / 3),

                'S': date.getMilliseconds()

            }

            if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))

            for (let k in o)

                if (new RegExp('(' + k + ')').test(fmt))

                    fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length))

            return fmt

        }

        /**

         * 系统通知

         *

         * > 通知参数: 同时支持 QuanX 和 Loon 两种格式, EnvJs根据运行环境自动转换, Surge 环境不支持多媒体通知

         *

         * 示例:

         * $.msg(title, subt, desc, 'twitter://')

         * $.msg(title, subt, desc, { 'open-url': 'twitter://', 'media-url': 'https://github.githubassets.com/images/modules/open_graph/github-mark.png' })

         * $.msg(title, subt, desc, { 'open-url': 'https://bing.com', 'media-url': 'https://github.githubassets.com/images/modules/open_graph/github-mark.png' })

         *

         * @param {*} title 标题

         * @param {*} subt 副标题

         * @param {*} desc 通知详情

         * @param {*} opts 通知参数

         *

         */

        msg(title = name, subt = '', desc = '', opts) {

            const toEnvOpts = (rawopts) => {

                if (!rawopts) return rawopts

                if (typeof rawopts === 'string') {

                    if (this.isLoon()) return rawopts

                    else if (this.isQuanX()) return {

                        'open-url': rawopts

                    }

                    else if (this.isSurge()) return {

                        url: rawopts

                    }

                    else return undefined

                } else if (typeof rawopts === 'object') {

                    if (this.isLoon()) {

                        let openUrl = rawopts.openUrl || rawopts.url || rawopts['open-url']

                        let mediaUrl = rawopts.mediaUrl || rawopts['media-url']

                        return {

                            openUrl,

                            mediaUrl

                        }

                    } else if (this.isQuanX()) {

                        let openUrl = rawopts['open-url'] || rawopts.url || rawopts.openUrl

                        let mediaUrl = rawopts['media-url'] || rawopts.mediaUrl

                        return {

                            'open-url': openUrl,

                            'media-url': mediaUrl

                        }

                    } else if (this.isSurge()) {

                        let openUrl = rawopts.url || rawopts.openUrl || rawopts['open-url']

                        return {

                            url: openUrl

                        }

                    }

                } else {

                    return undefined

                }

            }

            if (!this.isMute) {

                if (this.isSurge() || this.isLoon()) {

                    $notification.post(title, subt, desc, toEnvOpts(opts))

                } else if (this.isQuanX()) {

                    $notify(title, subt, desc, toEnvOpts(opts))

                }

            }

            if (!this.isMuteLog) {

                let logs = ['', '==============📣系统通知📣==============']

                logs.push(title)

                subt ? logs.push(subt) : ''

                desc ? logs.push(desc) : ''

                console.log(logs.join('\n'))

                this.logs = this.logs.concat(logs)

            }

        }

        log(...logs) {

            if (logs.length > 0) {

                this.logs = [...this.logs, ...logs]

            }

            console.log(logs.join(this.logSeparator))

        }

        logErr(err, msg) {

            const isPrintSack = !this.isSurge() && !this.isQuanX() && !this.isLoon()

            if (!isPrintSack) {

                this.log('', `❗️${this.name

                    }, 错误!`, err)

            } else {

                this.log('', `❗️${this.name

                    }, 错误!`, err.stack)

            }

        }

        wait(time) {

            return new Promise((resolve) => setTimeout(resolve, time))

        }

        done(val = {}) {

            const endTime = new Date().getTime()

            const costTime = (endTime - this.startTime) / 1000

            this.log('', `🔔${this.name

                }, 结束!🕛${costTime}秒`)

            this.log()

            if (this.isSurge() || this.isQuanX() || this.isLoon()) {

                $done(val)

            }

        }

    })(name, opts)

}
