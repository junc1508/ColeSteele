const express = require('express');
const app = express();
//incoming request triggers app.use(0)
// app.use((req, res) => {
//     console.log('we got a new request');
//     //response in string
//     // res.send('Hello! We get your request! This is the response');
//     // res.send({ color: 'red' });
//     // res.send('<h1>This is my webpage!<h1>')
// })
//starts the server
app.listen(3000, () => {
    console.log('listening to port 3000');
})

// /cats => 'meow'
// dogs => 'woof'
// / => '/'
app.get('/', (req, res) => {
    res.send('This is the home page!!!');
})
// generic pattern 
// it will match the subreddit string and anything that matches the pattern
//get the path info fro req.param
app.get('/r/:subreddit', (req, res) => {
    const { subreddit } = req.params;
    res.send(`<h1>Browsing ${subreddit}<h1>`);
});
app.get('/r/:subreddit/:postId', (req, res) => {
    const { subreddit, postId } = req.params;
    res.send(`<h1>Viewing ${postId} on ${subreddit}<h1>`);
});


//query string
//path is /search and we construct th rest later in callback
app.get('/search', (req, res) => {
    const { q, color } = req.query;
    if (!q) {
        res.send('NOTHING FOUND IF NOTHING IS SEARCHED!');
    }
    res.send(`<h1>Search for ${q} and ${color} </h1>`);

})


app.get('/cats', (req, res) => {
    res.send('meow');
});

app.get('/dogs', (req, res) => {
    res.send('woof');
})

app.post('/cats', (req, res) => {
    res.send('This is a Post request');
})

app.get('*', (req, res) => {
    res.send("I don't know that path");
})