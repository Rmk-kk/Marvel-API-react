import {useHTTP} from "../hooks/request.hook";


const useMarvelService = () => {
    const {loading, request, error, clearError} = useHTTP();

    const _apiBase = 'https://gateway.marvel.com:443/v1/public/'; //base url
    const _apiKey = 'apikey=bf94d78dd6fa9ecaad0f9246b65040ae'; //api key
    const _baseOffset = 0;

    const getAllCharacters = async (offset = _baseOffset) => {
         const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
         return res.data.results.map(character => {
             return _transformCharData(character);
         })
    }

    const getSingleCharacter = async (id) => {
        const response = await request(`${_apiBase}characters/${id}?${_apiKey}`);
        return _transformCharData(response.data.results[0]); //sending character data to transform to obj
    }

    const _transformCharData = (character) => {
        return {
            id: character.id,
            name: character.name,
            description: character.description ? `${character.description.slice(0, 207)}...` :
                'This is secret character! We will upload it`s information once we discover one',
            thumbnail: character.thumbnail.path + '.' + character.thumbnail.extension,
            homepage: character.urls[0].url,
            wikipage: character.urls[1].url,
            comics : character.comics.items,
        }
    }

    const getComicsList = async (offset = _baseOffset) => {
        const response = await request(`${_apiBase}comics?issueNumber=13&limit=8&offset=${offset}&${_apiKey}`);
        return response.data.results.map(comics => {
            return _transformedComicsData(comics);
        })
    }

    const getSingleComics = async (id) => {
        const response = await request(`${_apiBase}comics/${id}?${_apiKey}`);
        return _transformedComicsData(response.data.results[0]);
    }

    const _transformedComicsData = (comics) => {
        return {
            id: comics.id,
            title: comics.title,
            description: comics.description || 'There is no description',
            pageCount: comics.pageCount ? `${comics.pageCount} p.` : 'No information about the number of pages',
            thumbnail: comics.thumbnail.path + '.' + comics.thumbnail.extension,
            language: comics.textObjects.language || 'en-us',
            price: comics.prices[0].price ? `${comics.prices[0].price}$` : 'not available'
        }
    }

    return {loading, error, getAllCharacters, getSingleCharacter, clearError, getComicsList, getSingleComics}
}

export default useMarvelService