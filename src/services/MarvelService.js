

class MarvelService{
    _apiBase = 'https://gateway.marvel.com:443/v1/public/'; //base url
    _apiKey = 'apikey=bf94d78dd6fa9ecaad0f9246b65040ae'; //api key
    _baseOffset = 0;

     getResource = async (url) =>  { //fetching function
        const res = await fetch(url);
        if(!res.ok) throw new Error(`Couldn't fetch ${url}, status: ${res.status}`);

        return await res.json();
    }
    //fetch all characters
    getAllCharacters = async (offset = this._baseOffset) => {
         const res = await this.getResource(`${this._apiBase}characters?limit=9&offset=${offset}&${this._apiKey}`);
         return res.data.results.map(character => {
             return this._transformCharData(character);
         })
    }

    getSingleCharacter = async (id) => {
        const response = await this.getResource(`${this._apiBase}characters/${id}?${this._apiKey}`);
        return this._transformCharData(response.data.results[0]); //sending character data to transform to obj
    }

    _transformCharData = (character) => {
        return {
            id: character.id,
            name: character.name,
            description: character.description ? `${character.description.slice(0, 207)}...` : 'This is secret character! We will upload it`s information once we discover one',
            thumbnail: character.thumbnail.path + '.' + character.thumbnail.extension,
            homepage: character.urls[0].url,
            wikipage: character.urls[1].url,
            comics : character.comics.items,
        }
    }
}

export default MarvelService