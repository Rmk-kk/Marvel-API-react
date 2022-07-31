import './charInfo.scss';
import {useEffect, useState} from "react";
import Spinner from "../spinner/spinner";
import ErrorMessage from "../error/error";
import Skeleton from "../skeleton/Skeleton";
import useMarvelService from "../../services/MarvelService";

const CharInfo = ({characterId}) => {
    const {loading, getSingleCharacter, error, clearError} = useMarvelService();
    const [character, setCharacter]= useState(null);

    const updateChar = () => {
        clearError();
        if(!characterId) {
            return
        }
        getSingleCharacter(characterId)
            .then(onCharLoaded)
    }

    useEffect(() => {
        updateChar();
    }, [characterId])

    const onCharLoaded = (character) => {
        setCharacter(character);
    }

    const spinner = loading ? <Spinner/> : null;
    const errorMsg = error ? <ErrorMessage/> : null;
    const content = !(loading || error || !character) ? <View char = {character}/> : null;
    const skeleton = character || loading || error ? null : <Skeleton/>;

    return (
        <div className="char__info">
            {spinner}
            {errorMsg}
            {content}
            {skeleton}
        </div>
    )
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
                <img src={thumbnail} alt={name} style={imgStyle}/>
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