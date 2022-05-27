let stompClient = null;

function setConnected(connected) {
    document.getElementById('connect').disabled = connected;
    document.getElementById('disconnect').disabled = !connected;
    document.getElementById('conversationDiv').style.visibility
        = connected ? 'visible' : 'hidden';

    document.getElementById('author').innerHTML = '';
    document.getElementById('response').innerHTML = '';
    document.getElementById('timestamp').innerHTML = '';
}

function connect() {
    const socket = new SockJS('/chat');
    stompClient = Stomp.over(socket);
    stompClient.connect({}, frame => {
        setConnected(true);
        console.log('Connected: ' + frame);
        stompClient.subscribe('/topic/messages', msg => showMessageOutput(JSON.parse(msg.body)));
    });
}

function disconnect() {
    if (stompClient != null) {
        stompClient.disconnect();
    }
    setConnected(false);
    console.log("Disconnected");
}

function sendMessage(fromId, contentId) {
    const from = document.getElementById(fromId).value;
    const content = document.getElementById(contentId).value;

    stompClient.send("/app/chat", {},
        JSON.stringify({'from': from, 'content': content}));

    document.getElementById(contentId).value = '';
}

function showMessageOutput(msg) {
    // ------------- Author -------------
    const author = document.getElementById('author');
    const pAuthor = document.createElement('p');

    const authorName = `${msg.from}: `;
    pAuthor.appendChild(document.createTextNode(authorName));
    author.appendChild(pAuthor);

    // ------------- Response -------------
    const response = document.getElementById('response');
    const pResponse = document.createElement('p');
    pResponse.style.wordWrap = 'break-word';

    const chatMsg = `${msg.content}`;
    pResponse.appendChild(document.createTextNode(chatMsg));
    response.appendChild(pResponse);

    // ------------- Timestamp -------------
    const timestamp = document.getElementById('timestamp');
    const pTimestamp = document.createElement('p');

    const timestampMark = ` (${msg.timestamp})`;
    pTimestamp.appendChild(document.createTextNode(timestampMark));
    timestamp.appendChild(pTimestamp);
}