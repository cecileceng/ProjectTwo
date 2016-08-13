var socket = io();
$('form').submit(function() {
    socket.emit('chat message', $('#m').val());
    $('#m').val('');
    return false;
});

//stored as variable, hopefully we can polulate whit varialbe from localstorage with code from github username
var tempUsername = "UT Coding Bootcamp";
var tempUserMessage = tempUsername + " says: ";

//function for child length function of message UL.
function removeOldListItem() {
	var messageChild = $('#messages').children().length;
    //test length.
    //if more than 6, remove first message before appending new message to bottom.
    if (messageChild>9){
    	var list = document.getElementById("messages");
    	//remove child 0, then what was index 1 becomes index 0, and we remove that too. Leave both.
    	list.removeChild(list.childNodes[0]);
    	// list.removeChild(list.childNodes[0]);
    }
    console.log(messageChild);
}

//chat function. append new message to messages ul element
socket.on('chat message', function(msg) {
	removeOldListItem();
	// $('#messages').append($('<li>').text(tempUserMessage));
    $('#messages').append($('<li>').text(msg));
});
