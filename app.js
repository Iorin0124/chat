const http = require('http');
const server = http.createServer();
const fs = require('fs');
const socketio = require('socket.io');

server.on('request',function(req,res) {
  fs.readFile('./client/index.html','utf8',function(err,data){
    if(err){
    res.writeHead(404,{'Content-Type':'text/plain'});
    res.write('page not found!');
    return res.end();
  }
  res.writeHead(200,{'Content-Type':'text/html'});
  res.write(data);
  res.end();
  });
});


const port = 3000;
server.listen(port,function(){
  console.log('server runing on port ' + port);
});

const io = socketio.listen(server);
io.sockets.on('connection' , function(socket){
  socket.on('message' , function(chatdata){
    console.log("サーバ受け取り" + chatdata.name + chatdata.comment);  //受け取ったチャット内容
    io.sockets.emit('from_server' , { name:chatdata.name , comment:chatdata.comment });
  });
});
