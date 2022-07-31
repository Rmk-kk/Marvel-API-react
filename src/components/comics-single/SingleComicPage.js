import {useParams, Link} from "react-router-dom";
import './singleComicPage.scss';
import xMen from '../../resources/img/x-men.png';
import useMarvelService from "../../services/MarvelService";
import {useEffect, useState} from "react";
import Spinner from "../spinner/spinner";
import ErrorMessage from "../error/error";


const SingleComicPage = () => {
    const { comicId } = useParams();
    const [comics, setComics] = useState(null);
    const { loading, error, getSingleComics, clearError } = useMarvelService();

    useEffect(() => {
        updateComic();
        console.log(comicId)
    }, [comicId])

    const onComicsLoaded = (comic) => {
        setComics(comic);
    }

    const updateComic = () => {
        clearError();
        if(!comicId) {
            return
        }
        getSingleComics(comicId)
            .then(onComicsLoaded)
    }

    const spinner = loading ? <Spinner/> : null;
    const errorMessage = error ? <ErrorMessage/> : null;
    const content = !(loading || error || !comics) ? <View comic={comics}/> : null;

    return (
        <div className="single-comic">
            {spinner}
            {errorMessage}
            {content}
        </div>
    )
}

const View = ({comic}) => {
    const { title, description, thumbnail, price, language, pageCount} = comic;

    return (
        <>
            <img src={thumbnail} alt="x-men" className="single-comic__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{title}</h2>
                <p className="single-comic__descr">{description}</p>
                <p className="single-comic__descr">{pageCount} pages</p>
                <p className="single-comic__descr">Language: {language}</p>
                <div className="single-comic__price">{price}</div>
            </div>
            <Link to="/comics/" className="single-comic__back">Back to all</Link></>
    )
}

export default SingleComicPage;