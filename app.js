$(document).ready(() => {
	let APIdata = {
		technology: {},
		business: {},
		sports: {},
		science: {},
	}
	const cardsContainer = $('#card-container')

	$('#search-button').on('click', () => {
		const search = $('#search-input').val()
		searchShow(search)
	})
	function searchShow(query) {
		const newsURL = `https://gnews.io/api/v4/search?q=${query}&lang=en&country=us&max=10&apikey=d167cebfbff9d15c53589ede3e3f8798`

		fetch(newsURL)
			.then((res) => res.json())
			.then((res) => {
				//it checks if the articles property exists in the response object by checking if it is an array using
				if (Array.isArray(res.articles)) {
					const result = res.articles.map((article) => article.title)
					runResult(result)
				} else {
					alert(`nothing was found for this search please try again.`)
					//$('#search-input').val('')
				}
			})
			.catch((error) => {
				console.error('Error:', error)
			})
	}
	function runResult(result) {
		const list = $('#resultList')
		list.empty()
		result.forEach((results) => {
			const listRen = $('<li>').text(results)
			list.append(listRen)
		})
	}

	function callNavAPI() {
		fetchTechnologyData()
			.then((response) => {
				APIdata.technology = response
				renderArticles(APIdata.technology)
			})
			.catch((error) => {
				//console.error('Error fetching technology data:', error)
			})
		fetchBusinessData()
			.then((response) => {
				APIdata.business = response
			})
			.catch((error) => {
				console.error('Error fetching business data:', error)
			})
		fetchScienceData()
			.then((response) => {
				APIdata.science = response
			})
			.catch((error) => {
				console.error('Error fetching science data:', error)
			})
		fetchSportData()
			.then((response) => {
				APIdata.sports = response
			})
			.catch((error) => {
				console.error('Error fetching sports data:', error)
			})
	}
	callNavAPI()
	function fetchTechnologyData() {
		const technologyURL =
			'https://gnews.io/api/v4/search?q=technology&lang=en&country=us&max=10&apikey=d167cebfbff9d15c53589ede3e3f8798'
		return fetch(technologyURL).then((res) => res.json())
	}
	function fetchBusinessData() {
		const businessURL =
			'https://gnews.io/api/v4/search?q=business&lang=en&country=us&max=10&apikey=d167cebfbff9d15c53589ede3e3f8798'
		return fetch(businessURL).then((res) => res.json())
	}

	function fetchScienceData() {
		const scienceURL =
			'https://gnews.io/api/v4/search?q=science&&lang=en&country=us&max=10&apikey=d167cebfbff9d15c53589ede3e3f8798'
		return fetch(scienceURL).then((res) => res.json())
	}
	function fetchSportData() {
		const sportsURL =
			'https://gnews.io/api/v4/search?q=sport&&lang=en&country=us&max=10&apikey=d167cebfbff9d15c53589ede3e3f8798'
		return fetch(sportsURL).then((res) => res.json())
	}
	function renderArticles(category) {
		cardsContainer.append(APIdata[category].text)
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

	function renderArticles(data) {
		if (Array.isArray(data.articles)) {
			const limitCardShow = data.articles.slice(0, 6)
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
	}
})
