import './charInfo.scss';
import MarvelService from "../../services/MarvelService";
import {Component} from "react";
import Spinner from "../spinner/spinner";
import ErrorMessage from "../error/error";
import Skeleton from "../skeleton/Skeleton";

class CharInfo extends Component{
    state = {
        loading: false,
        error: false,
        character: null,
    }

    marvelService = new MarvelService();

    componentDidMount() {
        this.updateChar()
    }

    componentDidUpdate(prevProps) {
        if(this.props.characterId !== prevProps.characterId) {
            this.updateChar();
        }
    }

    updateChar = () => {
        const { characterId } = this.props;
        if(!characterId) {
            return
        }
        this.onCharLoading();
        this.marvelService
            .getSingleCharacter(characterId)
            .then(this.onCharLoaded)
            .catch(this.onError)
    }

    onCharLoading = () => {
        this.setState({
            loading: true,
            error: false
        })
    }

    onCharLoaded = (character) => {
        this.setState({
            character : character,
            loading : false,
        })
    }

    onError = () => {
        this.setState({
            loading: false,
            error: true,
        })
    }

    render() {
        const {loading, error, character} = this.state;

        const spinner = loading ? <Spinner/> : null;
        const errorMsg = error ? <ErrorMessage/> : null;
        const content = !(loading || error || !character) ? <View char = {character}/> : null;
        const skeleton = character || loading || error ? null : <Skeleton/>
        return (
            <div className="char__info">
                {spinner}
                {errorMsg}
                {content}
                {skeleton}
            </div>
        )
    }

}

const View = ({char}) => {
    const {name, thumbnail, homepage, wiki, description, comics } = char;
    let imgStyle;
    (thumbnail.includes('image_not_available')) ? imgStyle = {'objectFit' : 'contain'} : imgStyle = {'objectFit' : 'cover'};

    let comicsList = comics.map((item, index) => {
        if(index >= 10) {
            return;
        }
        return(
            <li className="char__comics-item" key={index}>
                {item.name}
            </li>
        )
    })
    return (
        <>
            <div className="char__basics">
                <img src={thumbnail} alt="abyss" style={imgStyle}/>
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">Homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {description}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {comicsList.length ? comicsList : 'There are no comics with this character yet :('}
            </ul>
        </>
    )
}

export default CharInfo;