const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

function addTask() {
    if (inputBox.value === '') {
        alert("You must write something!");
    } else {
        let li = document.createElement("li");
        let currentDate = new Date();
        let dateString = getDateIndicator(currentDate);
        li.innerHTML = `${inputBox.value} <br><small class="date-indicator">${dateString}</small>`;
        listContainer.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
    }
    inputBox.value = "";
    saveData();
}

function getDateIndicator(date) {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    const twoDaysAgo = new Date(today);
    twoDaysAgo.setDate(today.getDate() - 2);

    const options = { weekday: 'long', month: 'long', day: 'numeric' };

    if (date.toDateString() === today.toDateString()) {
        return "Today: " + date.toLocaleDateString('en-US', options);
    } else if (date.toDateString() === yesterday.toDateString()) {
        return "Yesterday: " + date.toLocaleDateString('en-US', options);
    } else if (date.toDateString() === twoDaysAgo.toDateString()) {
        return "2 days ago: " + date.toLocaleDateString('en-US', options);
    } else {
        return date.toLocaleDateString('en-US', options);
    }
}

listContainer.addEventListener("click", function(e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData();
    } else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        saveData();
    }
}, false);

function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}

function showTask() {
    listContainer.innerHTML = localStorage.getItem("data");
}

showTask();
