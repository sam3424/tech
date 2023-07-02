$(document).ready(() => {
$('#search-button').on('click', (element) => {
const search = $('#search-input').val()

searchShow(search)
})
function searchShow(query){
const newsURL = `https://gnews.io/api/v4/search?q=${query}&lang=en&&token=2c005be8de40753b9940ea41130ce571`
               
        fetch(newsURL)
            .then((res) => res.json())
            .then((res) => {
               if (Array.isArray(res.articles)) {
          const result = res.articles.map((article) => article.title);
          runResult(result)
          console.log(result, "we got the response");
        } else {
          console.log("No articles found.");
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }
  //display result on page.
  function runResult(result){
const list=$('#resultList')
list.empty()
  result.forEach(results => {
const listRen=$('<li>').text(results)
list.append(listRen)
  })
};

const cardURL =
	'https://gnews.io/api/v4/search?q=technology&&lang=en&&token=2c005be8de40753b9940ea41130ce571'

fetch(cardURL)
	.then((response) => response.json())
	.then((data) => {
renderArticles(data.articles)
  })
function renderArticles(data) {
	const cardsContainer = $('#card-container')

	data.forEach((dat) => {

		const div = $('<div></div>')
		div.addClass('card')
		const image = $('<img>')
		image.addClass('card-img')
		image.attr('src', dat.image)

		const name = $('<h6></h6>')
		name.text(`${dat.title}`)

		const readMore = $('<button></button>')
			.addClass('read-more-button')
			.text('Read More')
    
		
readMore.click(() =>{
  readMore.text(`Read More: ${dat.description}`)
      // Open a new page when the button is clicked
      window.open(dat.url, '_blank');

}
)
		div.append(image, name, readMore)
		cardsContainer.append(div)
	})
}
    })
