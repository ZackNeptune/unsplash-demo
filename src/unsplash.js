const API_KEY = "ZBZ6234mURgA6pIATm32Dk0P1VzFmaeVp9LN6hsT088";
const BASE_URL = `https://api.unsplash.com`
const COUNT = 6

export function getRandomImages() {
    const URL = `${BASE_URL}/photos/random/?client_id=${API_KEY}&count=${COUNT}`
    return fetch(URL)
}

export function searchImages(searchTerm) {
    const URL = `${BASE_URL}/search/photos/?client_id=${API_KEY}&per_page=${COUNT}&query=${searchTerm}`
    return fetch(URL)
}
