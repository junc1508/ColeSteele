const form = document.querySelector('#searchForm');
const display = document.querySelector('#display');
form.addEventListener('submit', async function (e) {
    e.preventDefault();
    clear(display);
    const searchTerm = form.elements.query.value;
    const config = { params: { q: searchTerm } }
    const res = await axios.get(`https://api.tvmaze.com/search/shows?`, config);
    makeImages(res.data);
    form.elements.query.value = '';
    console.dir(display);
})

const makeImages = (results) => {
    for (let result of results) {
        //not every show has a img.medium => no image
        if (result.show.image) {
            const img = document.createElement('img');
            img.src = result.show.image.medium;
            display.append(img);
        }

    }
}

//clear the previous search result images when doing a new search.
const clear = (element) => {
    while (element.firstChild) {
        element.removeChild(element.lastChild);
    }
}