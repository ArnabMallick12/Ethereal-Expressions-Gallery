document.getElementById('send-btn').addEventListener('click', function() {
  var messageInput = document.getElementById('message-input');
  var message = messageInput.value.trim();
  if (message !== '') {
    var chatBox = document.getElementById('chat-box');
    var newMessage = document.createElement('div');
    newMessage.textContent = message;
    chatBox.appendChild(newMessage);
    messageInput.value = '';
    chatBox.scrollTop = chatBox.scrollHeight; // Auto scroll to bottom
  }
});
