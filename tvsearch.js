const form = document.querySelector('#searchForm')

form.addEventListener('submit', async function (e) {
  e.preventDefault();
  const searchTerm = form.elements.q.value;
  // console.log(searchTerm)
  const res = await axios.get(`http://api.tvmaze.com/search/shows?q=${searchTerm}`)
  console.log(res.data[0].show.image.medium);
  makeImages(res.data)

  console.log('SUBMITTED!')
})

const makeImages = (shows) => {
  for (let result of shows) {
    const img = document.createElement('IMG');
    img.src = result.show.image.medium;
    document.body.append(img)
  }
}