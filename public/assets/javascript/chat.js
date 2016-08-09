var socket = io();
$('form').submit(function() {
    socket.emit('chat message', $('#m').val());
    $('#m').val('');
    return false;
});

//function for child length function of message UL.
function removeOldListItem() {
	var messageChild = $('#messages').children().length;
    //test length.
    //if more than 6, remove first message before appending new message to bottom.
    if (messageChild>5){
    	var list = document.getElementById("messages");
    	list.removeChild(list.childNodes[0]);
    }
    console.log(messageChild);
}

//chat function. append new message to messages ul element
socket.on('chat message', function(msg) {
	removeOldListItem();
    $('#messages').append($('<li>').text(msg));
});
