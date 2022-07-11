import './charList.scss';
import MarvelService from '../../services/MarvelService';
import {Component} from "react";
import ErrorMessage from "../error/error";
import Spinner from "../spinner/spinner";

class CharList extends Component{
    state = {
        characters: [],
        loading : true,
        error : false,
        characterID : null,
        newItemLoading: false,
        offset : 0,
    }
    marvelService = new MarvelService();

    componentDidMount() {
        this.onRequest()
    }

    onRequest(offset) {
        this.onCharListLoading();
        this.marvelService.getAllCharacters(offset)
            .then(this.onCharListLoaded)
            .catch(this.onError)
    }

    onCharListLoading = () => {
        this.setState({
            newItemLoading: true,
        })
    }

    onCharListLoaded = (newChars) => {
        this.setState(({offset, characters}) => ({
            characters : [...characters, ...newChars],
            loading : false,
            newItemLoading : false,
            offset: offset + 9,
        }))
    }

    onError = () => {
        this.setState({
            loading: false,
            error: true,
        })
    }

    renderCharacters = (characters) => {
        const elements =  characters.map(item => {
            let imageStyle;
            (!item.thumbnail.includes('image_not_available')) ? imageStyle = { 'objectFit' : 'cover' } : imageStyle = { 'objectFit' : 'unset' };
            return (
                <li
                    className="char__item"
                    key={item.id}
                    onClick={() => this.props.onSelectedChar(item.id)}
                >
                    <img src={item.thumbnail} alt={item.name} className="randomchar__img" style={imageStyle}/>
                    <div className="char__name">{item.name}</div>
                </li>
            )
        })
        return (
            <ul className="char__grid">
                {elements}
            </ul>
        )
    }

    render () {
        const {characters, loading, error, offset, newItemLoading} = this.state;
        const charList = this.renderCharacters(characters);

        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error) ? charList : null;
        return (
            <div className="char__list">
                    {errorMessage}
                    {spinner}
                    {content}
                <button
                    className="button button__main button__long"
                    disabled={newItemLoading}
                    onClick={() => this.onRequest(offset)}>
                        <div className="inner">Load More</div>
                </button>
            </div>
        )
    }

}

export default CharList;