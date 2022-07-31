import './comicsList.scss';
import '../char-list/charList.scss'
import useMarvelService from '../../services/MarvelService'
import {useEffect, useState} from "react";
import ErrorMessage from "../error/error";
import Spinner from "../spinner/spinner";
import { Link } from "react-router-dom";

const ComicsList = () => {
    const { loading, error, getComicsList } = useMarvelService();

    const [comicsList, setComicsList] = useState([]);
    const [comicsEnded, setComicsEnded] = useState(false);
    const [offset, setOffset] = useState(0);
    const [newComicsLoading, setNewComicsLoading] = useState(false);

    useEffect(() => {
        onRequest(offset, true)
    },[])

    const onRequest = (offset, initial) => {
        initial ? setNewComicsLoading(false) : setNewComicsLoading(true);
        getComicsList(offset)
            .then(onComicsListLoaded)
    }

    const onComicsListLoaded = (newComics) => {
        if(newComics.length < 8) {
            setComicsEnded(true);
        }
        setComicsList([...comicsList, ...newComics]);
        setNewComicsLoading(false);
        setOffset(offset => offset + 8);
    }

    function renderComics(comics) {
        const elements = comics.map((item, i) => {
            return (
                <li className="comics__item"
                    key={item.id}>
                    <Link to={`/comics/${item.id}`}>
                        <img src={item.thumbnail} alt={item.title} className="comics__item-img"/>
                        <div className="comics__item-name">{item.title}</div>
                        <div className="comics__item-price">{item.price}</div>
                    </Link>
                </li>
            )
        })

        return (
            <ul className="comics__grid">
                {elements}
            </ul>
        )
    }

    const comicsElements = renderComics(comicsList);

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading && !newComicsLoading ? <Spinner/> : null;

    return (
        <div className="comics__list">
            {comicsElements}
            {errorMessage}
            {spinner}
            <button className="button button__main button__long"
                disabled={newComicsLoading}
                    onClick={() => onRequest(offset)}
                    style={{'display' : comicsEnded ? 'none' : 'block'}}
            >
                <div className="inner">Load More</div>
            </button>
        </div>
    )
}

export default ComicsList;