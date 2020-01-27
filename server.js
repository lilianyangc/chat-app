var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);


//We define a route handler / that gets called when we hit our website home.
app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});


io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
  });
});

io.emit('some event', { someProperty: 'some value', otherProperty: 'other value' }); // This will emit the event to all connected sockets

// send a message to everyone except for a certain emitting socket, we have the 
// broadcast flag for emitting from that socket:
io.on('connection', function(socket){
  socket.broadcast.emit('hi');
});

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});

//We make the http server listen on port 3000.
http.listen(3000, function(){
  console.log('listening on *:3000');
});






// var http = require('http')
//   , url = require('url')
//   , fs = require('fs')
//   , io = require('socket.io')
//   , server;


// server = http.createServer(function(req, res){
  
//   var path = url.parse(req.url).pathname;
//   switch (path){
//     case '/':
//       fs.readFile(__dirname + '/index.html', function(err, data){
//           if (err) return send404(res);
//           res.writeHead(200, {'Content-Type': path == 'json.js' ? 'text/javascript' : 'text/html'})
//           res.write(data, 'utf8');
//           res.end();
//       });
//       break;

//     default: send404(res);
//   }
// }),

// send404 = function(res){
//   res.writeHead(404);
//   res.write('404');
//   res.end();
// };

// server.listen(8080);

// socket.io, setup
// var io = io.listen(server);

// setup socket listeners here