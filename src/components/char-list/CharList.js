import './charList.scss';
import { useEffect, useRef, useState} from "react";
import ErrorMessage from "../error/error";
import Spinner from "../spinner/spinner";
import React from 'react';
import useMarvelService from "../../services/MarvelService";


const CharList = (props) =>{
    const {loading, error, getAllCharacters} = useMarvelService()

    const [characters, setCharacters] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(0);
    const [charEnded, setCharEnded] = useState(false);

    useEffect(() => {
        onRequest(offset, true);
    }, [])

    const onRequest = (offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true);
        getAllCharacters(offset)
            .then(onCharListLoaded)
    }

    //Set REFS for characters for focus ability
    const charactersRefsArr = useRef([]); // Arr for chars NODE elements

    //Setting active char with mouse click
    const setActiveChar = (id) => {
        charactersRefsArr.current.forEach(item => {
            item.classList.remove(`char__item_selected`);
            charactersRefsArr.current[id].classList.add('char__item_selected');
            charactersRefsArr.current[id].focus();
        })
    }

    const onCharListLoaded = (newChars) => {
        if(newChars.length < 9) {
            setCharEnded(true);
        }
        setCharacters([...characters, ...newChars]);
        setNewItemLoading(false);
        setOffset(offset => offset + 9);
    }


    function renderCharacters (characters) {
        const elements =  characters.map((item, index) => {
            let imageStyle;
            (!item.thumbnail.includes('image_not_available')) ? imageStyle = { 'objectFit' : 'cover' } : imageStyle = { 'objectFit' : 'unset' };
            return (
                <li
                    ref={el => charactersRefsArr.current[index] = el}
                    tabIndex="0"
                    className="char__item"
                    key={item.id}
                    onClick={() => {
                        props.onSelectedChar(item.id);
                        setActiveChar(index);
                    }}
                    onFocus={(e) => e.target.classList.add('char__item_selected')}
                    onBlur={(e) => e.target.classList.remove('char__item_selected')}
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

    const charList = renderCharacters(characters);

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading && !newItemLoading ? <Spinner/> : null;
    return (
        <div className="char__list">
                {errorMessage}
                {spinner}
                {charList}
            <button
                onClick={() => onRequest(offset)}
                disabled={newItemLoading}
                style={{'display': charEnded ? 'none' : 'block' }}
                className="button button__main button__long">
                    <div className="inner">Load More</div>
            </button>
        </div>
    )

}

export default CharList;