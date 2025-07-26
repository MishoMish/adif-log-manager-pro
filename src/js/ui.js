// UI Utilities Module
function formatDate(date) {
    if (date.length !== 8) return date;
    return `${date.slice(0, 4)}-${date.slice(4, 6)}-${date.slice(6, 8)}`;
}

function formatTime(time) {
    if (time.length < 4) return time;
    return `${time.slice(0, 2)}:${time.slice(2, 4)}`;
}
