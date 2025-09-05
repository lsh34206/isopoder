
const express = require('express');
const handlebars =  require("express-handlebars");
const hbs =  require("hbs");
const {ObjectId} =  require("mongodb");
const bcrypt = require("bcrypt");
const http = require("http");
const { Server } = require("socket.io");
const cookieParser =  require("cookie-parser");
const {v4:uuidv4} = require("uuid");
const mongodb_connection =  require("./services/db/mongodb-connection");
const session = require("express-session");
const { Socket } = require('dgram');
const writing = require("./services/board/writing");
const db_connect = require("./services/db/db_connect");
const login = require("./services/users/login");
const logout = require("./services/users/logout");
const join = require("./services/users/join");
const board_router = require("./services/board/router");
const board_comment = require("./services/board/comment");
const app=express();
const utils = require("./utils/utils");
const router = require('./services/board/router');
const server = http.createServer(app);
const io = new Server(server);
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(express.static("public"));
app.set("view engine","handlebars");
app.set("views",__dirname + "/views");
app.engine("handlebars", handlebars.engine({ defaultLayout: false,partialsDir:"./views/partials",helpers: {
    ifEq: function (a, b, options) {
      return (a === b) ? options.fn(true) : options.inverse(false);
    }
  } }));

app.use(session({
  secret: '6974',        // 세션 암호화 키 (노출 금지!)
  resave: false,                // 세션이 수정되지 않아도 다시 저장할지 여부
  saveUninitialized: false,     // 초기화되지 않은 세션 저장 여부
  cookie: {
    maxAge: 1000 * 60 * 60,     // 쿠키 만료 시간 (1시간)
    httpOnly: true              // JS로 쿠키 접근 차단
  }
}));

var collection;

app.get("/main", board_router.main);
app.get("/login", login.login);

app.get("/write", writing.write);

app.get("/board/free", board_router.default);

app.get("/join", join.join);
app.get("/caresheet", router.caresheet);
app.get("/logout",logout);

app.get("/comment_ok",board_comment.write);
app.post("/content_delete",writing.delete);
app.post("/comment_delete",board_comment.delete);

app.post("/board/free/:id",board_router.free_post);

app.get("/board/free/:id",board_router.free_get);

app.post("/write_ok", writing.write_ok);
app.post("/join_ok", join.join_ok);

app.post("/login_ok", login.login_ok);



server.listen(3000,async (req,res) =>{
   
});