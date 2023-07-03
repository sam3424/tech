$(document).ready(() => {
	$('#search-button').on('click', (element) => {
		const search = $('#search-input').val()

		searchShow(search)
	})
	function searchShow(query){
		const newsURL = `https://gnews.io/api/v4/search?q=${query}&lang=en&country=us&max=10&apikey=d167cebfbff9d15c53589ede3e3f8798`

		fetch(newsURL)
			.then((res) => res.json())
			.then((res) => {
				if (Array.isArray(res.articles)) {
					const result = res.articles.map((article) => article.title)
					runResult(result)
					console.log(result, 'we got the response')
				} else {
					console.log('No articles found.')
				}
			})
			.catch((error) => {
				console.error('Error:', error)
			})
	}
	  function runResult(result){
	const list=$('#resultList')
	list.empty()
	  result.forEach(results => {
	const listRen=$('<li>').text(results)
	list.append(listRen)
	  })
	};
	let APIdata = {
		technology: {},
		business: {},
		sports: {},
		science: {},
	}

	
	function callNavAPI() {
		fetchBusinessData()
			.then((response) => {
				APIdata.business = response
			})
			.catch((error) => {
				console.error('Error fetching business data:', error)
			})
	fetchTechnologyData()
		.then((response) => {
			APIdata.technology = response
      renderArticles(APIdata.technology);
		})
		.catch((error) => {
			console.error('Error fetching technology data:', error)
		})

		fetchSportData()
			.then((response) => {
				APIdata.sports = response
			})
			.catch((error) => {
				console.error('Error fetching sports data:', error)
			})

				fetchScienceData()
					.then((response) => {
						APIdata.science = response
					})
					.catch((error) => {
						console.error('Error fetching science data:', error)
					})

	    }
	 callNavAPI()
	function fetchBusinessData() {
		const businessURL =
			'https://gnews.io/api/v4/search?q=business&lang=en&country=us&max=10&apikey=d167cebfbff9d15c53589ede3e3f8798'
		return fetch(businessURL).then((res) => res.json())
	}

	   function  fetchTechnologyData(){
	    const technologyURL =
				'https://gnews.io/api/v4/search?q=technology&lang=en&country=us&max=10&apikey=d167cebfbff9d15c53589ede3e3f8798'
	      return fetch(technologyURL).then((res) => res.json())

	    }
	    function fetchSportData(){
	const sportsURL =
		'https://gnews.io/api/v4/search?q=sport&&lang=en&country=us&max=10&apikey=d167cebfbff9d15c53589ede3e3f8798'
	    return fetch(sportsURL).then((res) => res.json())
	    }
	    function fetchScienceData(){
	    const scienceURL =
				'https://gnews.io/api/v4/search?q=science&&lang=en&country=us&max=10&apikey=d167cebfbff9d15c53589ede3e3f8798'
	        return fetch(scienceURL).then((res) => res.json())
	    }
	    function renderArticles(category) {
				//cardsContainer.empty()
				infoContainer.append(APIdata[category].text)
			}

	$('#Technology_id').on('click', () => {
    cardsContainer.empty()
		renderArticles(APIdata.technology)
	})

	$('#business_id').on('click', () => {
      cardsContainer.empty()
		renderArticles(APIdata.business)
	})

	$('#Science_id').on('click', () => {
   cardsContainer.empty()
	renderArticles(APIdata.sports)
			})

	$('#Sports_id').on('click', () => {
   cardsContainer.empty()
	renderArticles(APIdata.science)
	})

	//   cardShow()
	// function cardShow(){
	// 	const cardURL =
	// 		//'https://gnews.io/api/v4/search?q=technology&&lang=en&&token=2c005be8de40753b9940ea41130ce571'

	// 	fetch(cardURL)
	// 		.then((response) => response.json())
	// 		.then((data) => {
	// 	renderArticles(data.articles)
	// 	  })
	//   }
  const cardsContainer = $('#card-container')
	function renderArticles(data) {
		
		 const limitCardShow = data.articles.slice(0, 6);
		limitCardShow.forEach((dat) => {
			const div = $('<div></div>').addClass('card')
			const image = $('<img>').addClass('card-img').attr('src', dat.image)
			const name = $('<h6></h6>').text(dat.title)
			const readMore = $('<button></button>')
				.addClass('read-more-button')
				.text('Read More')

			readMore.click(() => {
				readMore.text(`Read More: `)
				window.open(dat.url, '_blank')
			})

			div.append(image, name, readMore)
			cardsContainer.append(div)
		})
	}
})