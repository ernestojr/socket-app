const $events = document.getElementById('events');
const newItem = (content) => {
    const item = document.createElement('li');
    item.innerText = content;
    return item;
};
const id = Date.now();
$events.appendChild(newItem(`ID: ${id}`));
const opts = {
    query: `id=${id}`,
};
const socket = io(opts);
socket.on('connect', () => {
    $events.appendChild(newItem('connected'));
});

/**
 * Subcribe to socket event.
 **/ 

socket.on('notification', (payload) => {
    $events.appendChild(newItem(JSON.stringify(payload)));
});

socket.on('disconnect', () => {
    $events.appendChild(newItem('disconnected'));
});
