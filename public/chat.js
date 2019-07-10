var socketUser = io.connect('http://localhost:8080');

var message = document.getElementById('usermsg');
var user = document.getElementById('username');
var btn = document.getElementById('send');
var output = document.getElementById('output');
var feedback = document.getElementById('feedback');


//Pushing chats to the server
btn.addEventListener('click', function(){

    if((user.value!== "") && (message.value!== "")){
        socketUser.emit('chat',{
            message: message.value,
            user: user.value
        });
            user.value = '';
            message.value = '';
    }else{
        alert('Please enter some content')
    }

});

message.addEventListener('keypress',function(){
    socketUser.emit('typing', user.value);
})

//Listening for events

socketUser.on('chat', function(data){
    feedback.innerHTML = "";
    output.innerHTML += `<p><strong> ${data.user}</strong> : ${data.message}</p>`
})

socketUser.on('typing', function(data){
    feedback.innerHTML = `${data} is typing...`;
})


