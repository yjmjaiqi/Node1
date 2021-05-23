const { json } = require('express');
var express = require('express');
var router = express.Router();
const session = require('express-session');
var db = require('../mysql/mysql');
var md5 = require('md5');
router.use(session({
  secret:'sessiontest',
  resave:true,//强制保存session
  cookie:{
    maxAge:7*24*60*60*1000,//设置session有效期为一周
  },
  saveUninitialized:true//强制保存初始化session
}))

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});
router.get('/index', function(req, res, next) {
  res.render('index');
});
router.get('/login', function(req, res, next) {
  res.render('login');
});
router.get('/alter', function(req, res, next) {
  res.render('alter');
});
router.get('/contact',(req,res)=>{
  res.render('contact');
})
router.get('/indexs', function(req, res, next) {
  res.render('indexs')
});

router.get('/backstage',(req,res)=>{
  db.query("select * from article limit 1",(err,results,fields)=>{
    console.log(results);
    if(results!=""){
    res.render('backstage',{
      data:results
    })
  }else {
    console.log(err)
  }
  })
})
router.post('/backstage',(req,res)=>{
  db.query("select * from article where articleName like '%" + req.body.articlename +"%'",(err,results,fields)=>{
    console.log(results);
    if(results!=""){
    res.render('backstage',{
      data:results
    })
  }else {
    console.log(err)
  }
  })
})
let pas;
let pasm;
router.get('/del/:id',(req,res)=>{
  pasm = req.params.id;
  console.log(pasm)
  var sqls = "delete from article where articleId='"+pasm+"'";
  db.query("select * from article limit 1",(err,results,fields)=>{
    console.log(results);
    db.query(sqls,(err,result,field)=>{
      if(result!=""){
        console.log(result);
        res.redirect('/backstage');
      }else {
        res.render('info',{
          title:"删除失败",
          content:"",
          href:"backstage",
          hrefText:"后台管理页"
        })
      }
    })
  })
 
  
})
router.get('/backstage/:id',(req,res)=>{
  pas = req.params.id;
  res.render('uppage');
})
router.post('/uppage',(req,res)=>{
  var name = req.body.name;
  var author = req.body.author;
  var articleContent = req.body.Content;
  var time = req.body.time;
  var param = [
    name,
    author,
    articleContent,
    time
  ]
  console.log(pas);
  var sql = "update article set articleName=?,author=?,articleContent=?,alter_time=? where articleId='"+pas+"'";
  if(req.body.name!=""&&req.body.author!=""&&req.body.Content!=""&&req.body.time!=""){
     db.query(sql,param,(err,results,fields)=>{
    if(results!=""){
      console.log(results);
      res.redirect('/backstage');
    }else {
      console.log(err);
    }
  })
  }else {
    res.render('info',{
      title:"修改失败",
        content:"内容不能为空",
        href:"backstage",
        hrefText:"后台管理页"
    })
  }
})



router.post('/indexs',(req, res)=>{
  var name = req.body.name;
  var author = req.body.author;
  var articleContent = req.body.Content;
  var time = req.body.time;
  var param = [
    name,
    author,
    articleContent,
    time
  ]
  var sql = "insert into article(articleName,author,articleContent,create_time) values(?,?,?,?)";
  console.log(param);
  db.query(sql,param,(err,results,fields)=>{
    console.log(results);
    if(results!=""){
    res.redirect('/article');
    }else {
      res.render('indexs');
    }
  })
});

router.get('/exitLogin',(req,res)=>{
  res.render('info',{
    title:"退出登录成功",
    content:"即将进入登录页面",
    href:"login",
    hrefText:"登录页"
   })
})
router.get('/article',(req,res)=>{
  var sql = "select * from article order by articleId desc limit 2";
  db.query(sql,(err,result,fields)=>{
      console.log(result)
    res.render('article',{
      arr:result
    });
    })
  
})


router.post("/alter",(req,res)=>{
  var username = md5(req.body.username);
  var password = md5(req.body.password);
  var params = [
    username,
    password,
    req.body.phone
  ]
  var sql2 = 'update user set username=?,password=? where phone=?';
  db.query(sql2,params,(err,result,fields)=>{
    console.log(result);
    if(result!=""&&req.body.password==req.body.repassword){
      res.render('info',{
        title:"修改成功",
        content:"即将进入登录页面",
        href:"login",
        hrefText:"登录页"
       })
    }else {
      res.render('info',{
            title:"修改失败",
            content:"修改内容格式不符..",
            href:"alter",
            hrefText:"修改页"
        }
      )}
  })
})

router.post('/login',(req,res)=>{
  req.session.username=req.body.username;
  req.session.password=req.body.password;
  req.session.phone=req.body.phone;
  req.session.email=req.body.email;
  var username = md5(req.body.username);
  var password = md5(req.body.password);
  var paramse = [
    username,
    password
  ]
  var sql1 = 'select username,password from user where username=? and password=?';
  db.query(sql1,paramse,(err,result,fields)=>{ 
    console.log(result);
    if(result!=""){
      res.render('info',{
        title:"登录成功",
        content:"即将进入首页面",
        href:"about",
        hrefText:"首页"
       })
    }else {
      res.render('info',{
            title:"登录失败",
            content:"用户不存在或密码错误",
            href:"login",
            hrefText:"登录页"
        }
      )}
  })
})
router.post('/register',(req,res)=>{
  // 获取请求数据
  var username = md5(req.body.username);
  var password = md5(req.body.password);
  var paramses = [
  username,
  password,
  req.body.phone,
  req.body.email
  ]
  console.log(paramses)
  var params = [
    req.body.username,
    req.body.phone,
    req.body.email
  ]
  var sql = 'insert into user(username,password,phone,email) values(?,?,?,?)';
  var sql3 = 'select username,phone,email from user where username=? or phone=? or email=?';
  db.query(sql3,params,(err,results,fields)=>{
    if(results!=""){
      res.render('info',{
        title:"注册失败",
        content:"用户名手机号或邮箱已被注册或存在",
        href:"index",
        hrefText:"注册页"
       })
    }else if(req.body.password==req.body.repassword){
    db.query(sql,paramses,(err,result,fields)=>{
      console.log(result)
    })
    res.render('info',{
      title:"注册成功",
      content:"即将进入登录页面",
      href:"login",
      hrefText:"登录页"
     })
    }else {
      res.render('info',{
        title:"注册失败",
        content:"密码输入不一致",
        href:"index",
        hrefText:"注册页"
       })
    }
  })
})
router.get('/single',(req,res)=>{
  var user = md5(req.session.username)
  db.query("select phone,email from user where username=?",[user],(err,result,fields)=>{
    console.log(result)
    res.render('single',{
      username:req.session.username,
      password:req.session.password,
      arr:result
    });
  })
 
})
module.exports = router;
