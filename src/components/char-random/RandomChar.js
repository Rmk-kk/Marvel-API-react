import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';
import {Component} from "react";
import MarvelService from "../../services/MarvelService";
import Spinner from "../spinner/spinner";
import ErrorMessage from "../error/error";

class RandomChar extends Component {

    state = {
        character : {},
        loading : true,
        error : false,
    }

    componentDidMount() {

        this.updateCharacter();
    }

    marvelService = new MarvelService();

    onCharacterLoaded = ( char ) => {
        this.setState({
            character : char,
            loading : false
        })
    }
    onCharacterLoading = () => {
        this.setState({
            loading: true,
        })
    }

    updateCharacter = () => {
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
        this.onCharacterLoading();
        this.marvelService
            .getSingleCharacter(id)
            .then(this.onCharacterLoaded)
            .catch(this.onErrorState);
    }

    onErrorState = () => {
        this.setState({
            loading: false,
            error : true
        })
    }


    render() {
        const { character , loading, error } = this.state;
        const spinner = loading ? <Spinner/> : null;
        const errorMessage = error ? <ErrorMessage/> : null;
        const content = !(loading || error) ? <View char={character}/> : null;
        return(
            <div className="randomchar">
                {spinner}
                {errorMessage}
                {content}
                <div className="randomchar__static">
                    <p className="randomchar__title">
                        Random character for today!<br/>
                        Do you want to get to know him better?
                    </p>
                    <p className="randomchar__title">
                        Or choose another one
                    </p>
                    <button
                        className="button button__main"
                        onClick={this.updateCharacter}
                    >
                        <div className="inner">try it</div>
                    </button>
                    <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
                </div>
            </div>
        )}

    componentDidCatch(error, errorInfo) {
    }
}

const View = ({char}) => {
    const {name, description, thumbnail, homepage, wikipage} = char;
    let imageClasses;
    (!thumbnail.includes('image_not_available')) ? imageClasses = 'randomchar__img' : imageClasses = 'randomchar__img randomchar__img__not_found';

    return (
        <div className="randomchar__block">
            <img src={thumbnail} alt={name} className={imageClasses}/>
            <div className="randomchar__info">
                <p className="randomchar__name">{name}</p>
                <p className="randomchar__descr">
                    {description}
                </p>
                <div className="randomchar__btns">
                    <a href={homepage} className="button button__main">
                        <div className="inner">Homepage</div>
                    </a>
                    <a href={wikipage} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>
    )
}
export default RandomChar;