import {useState} from "react";

import RandomChar from "../char-random/RandomChar";
import CharList from "../char-list/CharList";
import CharInfo from "../char-info/CharInfo";
import ErrorBoundaries from "../error-boundaries/ErrorBoundaries";
import decoration from '../../resources/img/vision.png';


const MainPage = () => {

    const [characterId, setCharacterId] = useState(null);

    const onSelectedChar = (id) => {
        setCharacterId(id);
    }

    return (
        <>
            <ErrorBoundaries>
                <RandomChar/>
            </ErrorBoundaries>
            <div className="char__content">
                <ErrorBoundaries>
                    <CharList onSelectedChar = {onSelectedChar}/>
                </ErrorBoundaries>
                <ErrorBoundaries>
                    <CharInfo characterId = {characterId}/>
                </ErrorBoundaries>
            </div>
            <img className="bg-decoration" src={decoration} alt="vision"/>
        </>
    )
}

export default MainPage;