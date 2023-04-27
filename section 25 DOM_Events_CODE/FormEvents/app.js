
const form = document.querySelector('#tweetForm');
const tweet = document.querySelector('#tweet');
const list = document.querySelector('#list');
form.addEventListener('submit', function (e) {
    e.preventDefault();
    const tweetName = tweet.value;
    const newLI = document.createElement('li');
    newLI.innerText = tweetName;
    list.append(newLI);
    // reset the form input to empty
    input.value = '';
})
