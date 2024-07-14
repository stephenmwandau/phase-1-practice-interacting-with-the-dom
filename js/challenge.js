"use strict";

function _toConsumableArray(arr) {
    if (Array.isArray(arr)) {
        for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];
        return arr2;
    }
    return Array.from(arr);
}

var playing = true;

var timer = function() {
    return setInterval(function() {
        var counter = document.getElementById("counter");
        var currentCount = parseInt(counter.innerText);
        counter.innerText = currentCount + 1;
    }, 1000); // increment every second
};

var interval = timer();

var minus = document.getElementById("minus");
var plus = document.getElementById("plus");
var heart = document.getElementById("heart");
var pause = document.getElementById("pause");
var commentForm = document.getElementsByTagName("form")[0];

minus.addEventListener("click", function() {
    var counter = document.getElementById("counter");
    var currentCount = parseInt(counter.innerText);
    counter.innerText = currentCount - 1;
});

plus.addEventListener("click", function() {
    var counter = document.getElementById("counter");
    var currentCount = parseInt(counter.innerText);
    counter.innerText = currentCount + 1;
});

heart.addEventListener("click", function() {
    var counter = document.getElementById("counter");
    var currentCount = parseInt(counter.innerText);
    var likesList = document.querySelector(".likes");
    var likeItem;

    if ([].concat(_toConsumableArray(likesList.children)).map(function(item) {
        return parseInt(item.dataset.num);
    }).includes(currentCount)) {
        likeItem = document.querySelector('[data-num="' + currentCount + '"]');
        var likeCount = parseInt(likeItem.children[0].innerText);
        likeItem.innerHTML = currentCount + " has been liked <span>" + (likeCount + 1) + "</span> times";
    } else {
        likeItem = document.createElement("li");
        likeItem.setAttribute("data-num", currentCount);
        likeItem.innerHTML = currentCount + " has been liked <span>1</span> time";
        likesList.appendChild(likeItem);
    }
});

pause.addEventListener("click", function() {
    if (playing) {
        playing = false;
        clearInterval(interval);
        this.innerText = "resume";
    } else {
        playing = true;
        interval = timer();
        this.innerText = "pause";
    }

    [].concat(_toConsumableArray(document.getElementsByTagName("button"))).forEach(function(button) {
        if (button.id !== "pause") {
            button.disabled = !playing;
        }
    });
});

commentForm.addEventListener("submit", function(event) {
    event.preventDefault();
    var commentInput = this.children[0];
    var commentText = commentInput.value;
    commentInput.value = "";

    var commentsList = document.querySelector(".comments");
    var commentItem = document.createElement("p");
    commentItem.innerText = commentText;
    commentsList.appendChild(commentItem);
});
