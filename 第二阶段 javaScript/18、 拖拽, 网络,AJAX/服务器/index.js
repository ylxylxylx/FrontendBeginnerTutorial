var express = require('express')
var bodyParser = require('body-parser')
var fs = require('fs')
var axios = require("axios")

var app = express()

app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended:false}))

app.get("/news",function(req,res){
	res.setHeader("Access-Control-Allow-Origin", "*")
	axios.get("https://news-at.zhihu.com/api/4/news/latest").then(data=>{
		console.log(data.data)
		res.json(data.data)
	})
})

//----------------注册--------------------
app.post('/register',function(request,response){
	console.log(request.body)
	response.setHeader("Access-Control-Allow-Origin", "*")
	
	//获取提交的用户名
	var userName= request.body.userName;
	
	//既然现在没有服务器,那我们可以用新注册的用户,生成一个对应的文档,文档中存放用户的信息,文件名就以用户名命名,这样在查询用户是否存在时,就可以转换成查询文件是否存在.
	
	//使用用户名拼接出对应的文件路径
	var filePath = 'users/' + userName + '.txt'
	
	//查询对应的用户是否存在
	fs.exists(filePath,function(result){
		if(result){
			//存在
//			response.send('用户名已存在,注册失败')
			//可以返回json对象
			response.json({
				result : 0 ,
				message : '用户名已存在,注册失败'
			})
		}else{
			//不存在,就创建用户
			//判断存放用户信息的文件夹是否存在
			fs.exists('users',function(result){
				if(!result){
					//不存在就创建
					fs.mkdirSync('users')
				}
				//创建存放用户信息的文件
				//request.body 转化为字符串再存
				fs.appendFile(filePath,JSON.stringify(request.body),function(error){
					if(error){
						response.json({
							___ ,
							message : '系统出错,请再次尝试'
						})
					}else{
						response.json({
							result : 1 ,
							message : '注册成功'
						})
					}
				})
			})
		}
	})
})

//----------------GET注册--------------------
app.get('/register', function (request, response) {
	response.setHeader("Access-Control-Allow-Origin", "*")
    console.log(request.query)
    var username = request.query.username;
    var filePath = 'users/' + username + '.txt'
    fs.exists(filePath, function (result) {
        if (result) {
            response.json({
                result: 0,
                message: '用户名已存在,注册失败'
            })
        } else {
            fs.exists('users', function (result) {
                if (!result) {
                    fs.mkdirSync('users')
                }
                fs.appendFile(filePath, JSON.stringify(request.query), function (error) {
                    if (error) {
                        response.json({
                            ___,
                            message: '系统出错,请再次尝试'
                        })
                    } else {
                        response.json({
                            result: 1,
                            message: '注册成功'
                        })
                    }
                })
            })
        }
    })
})




//----------------------登录----------------
app.post('/login',function(request,response){
	response.setHeader("Access-Control-Allow-Origin", "*")
	console.log(request.body)
	//获取用户名
	var userName = request.body.userName;
	//使用用户名拼接出对应的文件路径
	var filePath = 'users/' + userName + '.txt'
	//查询用户是否存在
	fs.exists(filePath,function(result){
		if(result){
			//用户名存在,再判断密码是否正确
			//读取用户数据
			fs.readFile(filePath,function(error,data){
				console.log(data)
				if(data){
					//读取数据成功, 解析数据
					var obj = JSON.parse(data)
					//判断密码是否正确
					if(obj.password == request.body.password ){
						
						//当登录成功时,把用户名设置到响应头中的cookie字段中,
						//当响应数据返回到浏览器时,就可以把响应头的cookie字段自动设置到浏览器的cookie中,不需要我们在浏览器端设置cookie了
						response.cookie('userName',userName)
						
						response.json({
							result : 1 ,
							message : '登录成功'
						})
					}else{
						response.json({
							result : 0 ,
							message : '密码错误,登录失败'
						})
					}
					
				}else{
					//读取数据失败
					response.json({
						result : 0 ,
						message : '系统出错,请重试!'
					})
				}
			})
			
		}else{
			//用户名不存在
			response.json({
				result : 0 ,
				message : '用户名不存在,请先注册!'
			})
		}
	})
})



//------------------退出登录------------------
app.get('/logout',function(request,response){
	//退出时,删除cookie信息
	//清理相应信息中的cookie字段,浏览器接收到相应数据之后,会自动把本地cookie中相应键值对删掉
	response.clearCookie('userName')
	response.send('退出成功')
})


//------------------上传头像------------------
//上传头像数据是放在formData对象中的,所以需要使用中间模块multer
var multer = require('multer')

//头像上传之后需要重命名,使用用户名设置头像名,避免重复,便于查找
//用户名需要从请求中的cookies中解析出来,使用cookie解析
//cookie解析用到了 cookie-parser 模块
var cookieParser = require('cookie-parser')
app.use(cookieParser())

//磁盘存储的参数设置
var options = multer.diskStorage({
	//设置头像图片存储的路径
	destination : 'public/headImg',
	//重定义头像图片的图片名
	filename : function(request,response,callback){
		console.log(request.cookies)
		callback(null,request.cookies.userName + '.jpg')
	}
})

//创建一个multer对象,设置图片磁盘存储的参数
//参数中对象的属性storage表示磁盘存储的属性设置
var form = multer({storage:options})

//处理请求之前,调用multer的single方法,处理form表单中name为headImg的输入框中的文件
app.post('/upload',form.single('headImg'), function(request,response){
	console.log(request.cookies)
	//在multer处理之后就已经把图片写入磁盘,所以在这里直接作出响应即可
	response.json({
		result : 1,
		message : '上传头像成功'
	})
})



//------------------提问------------------
app.post('/ask',function(request,response){
	//保存问题
	//用一个文件保存一个问题及其这个问题的回答
	//文件名以当前时间的毫秒数命名,避免重复
	//文件中存储的内容有: 问题 ,用户名,时间,文件名
	var now = new Date()
	var time = now.getTime() //转化为毫秒数
	//创建需要存储的对象
	var obj = {
		'ask' : request.body.ask ,
		'userName':request.cookies.userName,
		'date':now,
		'fileName':time
	}
	//拼接存放问题对象的文件路径
	var filePath = 'public/questions/' + time + '.txt'
	//判断文件夹路径是否存在
	fs.exists('public/questions',function(result){
		if(!result){
			fs.mkdirSync('public/questions')
		}
		//fs保存的数据需要是字符串格式,需要格式转化
		fs.appendFile(filePath,JSON.stringify(obj),function(error){
			if(error){
				response.json({
					result : 0,
					message:'系统错误,请重试!'
				})
			}else{
				response.json({
					result : 1,
					message:'提问成功!'
				})
			}
		})
	})
})

//------------------获取问答数据------------------
app.get('/questions',function(request,response){
	//判断存放问答信息的文件所在的文件夹目录是否存在
	fs.exists('public/questions',function(result){
		if(!result){
			response.json({
				result : 0,
				message:'没有数据!'
			})
		}else{
			//读取文件夹中的所有文件,得到一个数组
			fs.readdir('public/questions',function(error,files){
				//files 是一个数组,存放了文件夹下的所有文件的文件名
				console.log(files)
				if(error){
					response.json({
						result : 0,
						message:'系统错误,请重试!'
					})
				}else{
					//数组中的元素颠倒顺序,为了让最新的问题放在最上边, 得到一个新数组
					files = files.reverse()
					//声明一个新的数组,存放所有的问答信息
					var dataArray = []
					//遍历文件名数组,读取每一个文件的信息
					for(var i = 0 ; i < files.length; i++){
						//拼接每一个文件的路径
						var filePath = 'public/questions/' + files[i] 
						//异步读取文件
//						fs.readFile(filePath,function())
						//同步读取文件,
						var data = fs.readFileSync(filePath)
						//得到的数据是字符串,需要JSON解析
						data = JSON.parse(data)
						//把读取的对象放到数组中
						dataArray.push(data)
					}
					//得到所有数据所在的数组
					console.log(dataArray)
					//把数据返回给浏览器
					response.json({
						result : 1,
						message: dataArray
					})
				}
			})
		}
	})
})


//------------------回答------------------
app.post('/answer',function(request,response){
	//cookies字段中包含用户名和回答的问题所在的文件名
	console.log(request.cookies)
	var userName = request.cookies.userName;
	var fileName = request.cookies.fileName;
	//提交的答案
	var answer = request.body.answer;
	console.log(answer)
	//把答案保存到对应问题文件中
	//拼接问题文件的路径
	var filePath = 'public/questions/' + fileName + '.txt'
	//判断目标文件(问题所在的文件)是否存在
	fs.exists(filePath,function(result){
		if(result){
			//存在,就把问题信息读取出来
			fs.readFile(filePath,function(error,data){
				if(data){
					//读出信息是字符串格式,解码成json对象
					var obj = JSON.parse(data)
					console.log(obj)
					
					//判断这个对象中有没有answers这个属性,如果没有,说明之前没有人回答过这个问题
					if(!obj.answers){
						//给对象添加这个属性,值是一个数组,数组中的每一个元素(对象)是一个回答信息
						obj.answers = []
					}
					
					//组织回答的信息,放到一个对象中
					//回答的对象包含的信息: 答案,回答的用户,回答的时间,答案存放的文件名
					var answerObj = {
						'answer' : answer,
						'userName' : userName ,
						'date' : new Date(),
						'fileName' : fileName
					}
					
					//把这个答案对象,放入答案数组
					obj.answers.push(answerObj)
					
					//数据更新过后,重新写入问题文件,(覆盖原来的内容)
					fs.writeFile(filePath,JSON.stringify(obj), function(error){
						if(error){
							response.json({
						        result : 0,
						        message: '系统错误,请重试'
					        })
						}else{
							response.json({
						        result : 1,
						        message: '提交答案成功!'
					        })
						}
					})
				}else{
					response.json({
						result : 0,
						message: '系统错误,请重试'
					})
				}
			})
		}else{
			//文件不存在
			response.json({
				result : 0,
				message: '系统错误,请重试'
			})
		}
	})
})


//------------------获取用户列表------------------
app.get('/users', function (request, response) {
    //判断存放问答信息的文件所在的文件夹目录是否存在
    fs.exists('users', function (result) {
        if (!result) {
            response.json({
                result: 0,
                message: '没有注册信息'
            })
        } else {
            //读取文件夹中的所有文件,得到一个数组
            fs.readdir('users', function (error, files) {
                //files 是一个数组,存放了文件夹下的所有文件的文件名
                console.log(files)
                if (error) {
                    response.json({
                        result: 0,
                        message: '系统错误,请重试!'
                    })
                } else {
                    //声明一个新的数组,存放所有的问答信息
                    var dataArray = []
                    //遍历文件名数组,读取每一个文件的信息
                    for (var i = 0; i < files.length; i++) {
                        //拼接每一个文件的路径
                        var filePath = 'users/' + files[i]
                        //异步读取文件
                        //						fs.readFile(filePath,function())
                        //同步读取文件,
                        var data = fs.readFileSync(filePath)
                        //得到的数据是字符串,需要JSON解析
                        data = JSON.parse(data)
                        //把读取的对象放到数组中
                        dataArray.push(data)
                    }
                    //得到所有数据所在的数组
                    console.log(dataArray)
                    //把数据返回给浏览器
                    response.json({
                        result: 1,
                        message: dataArray
                    })
                }
            })
        }
    })
})


// 同源策略: 浏览器只允许使用ajax请求 相同协议, 相同域名(ip), 相同端口  服务器上的数据(也就是网页所在的服务器)
// 相同域  : 不同网页,文件,或资源所在的 协议,端口,ip,域名全都相同  (在同一个服务器中)
// 跨域请求: 一个服务器A中的网页去访问另一个服务器B中的接口/资源
// 浏览器出于安全性考虑, 默认禁止跨域请求, 如果直接跨域访问, 会出现以下警告, 并访问失败
// 已拦截跨源请求：同源策略禁止读取位于 http://127.0.0.1:3000/api 的远程资源。（原因：CORS 头缺少 'Access-Control-Allow-Origin'）

// 拦截跨域请求是在浏览器端实现, 而一些新版本的浏览器也并不是完全拦截, 而是按照正常访问流程把把资源数据请求下来, 然后浏览器会判断响应头(CORS 头)中是否包含'Access-Control-Allow-Origin'这个字段,或者这个字段值是不是当前请求所在的地址(http://127.0.0.1:5000), 如果是, 则可以使用响应数据, 否则,浏览器会拦截响应数据,把访问状态设置失败, 并发出警告

// 所以, 第一种实现跨域请求的方法: 在响应头中添加Access-Control-Allow-Origin 即可

console.log("目标服务器已启动, 地址是: http://127.0.0.1:3000 ")
app.get("/api", function(req,res){

  // 在响应对象res中添加响应头Access-Control-Allow-Origin 
  // 值可以写 * 表示允许所有的域名服务器访问这个接口/数据
  res.setHeader("Access-Control-Allow-Origin", "*")

  // 也可以写一个固定地址, 表示只允许对应地址跨域访问这个接口/数据
  // res.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:5000")

  // 也可以写一个地址白名单, 允许白名单中的地址访问到
  // var urlArray = ["http://127.0.0.1:5000", "http://127.0.0.1:6000", "http://127.0.0.1:4000", "http://192.168.211.56:5000", "http://192.168.211.58:5000","http://192.168.211.25:5000"]
  // 因为请求头中不能添加数组, 不能直接将白名单放入请求头, 所以要判断发起请求的源地址在不在白名单中, 如果在就设置请求头
  // var origin = req.header("Origin")
  // console.log(origin)
  // if(urlArray.indexOf(origin) >= 0){
  //   res.setHeader("Access-Control-Allow-Origin", origin)
  // }

  res.send("恭喜你,访问到了我的服务器")
})


app.listen(5000,function(){
	console.log('服务器正在运行,端口号5000')
})








