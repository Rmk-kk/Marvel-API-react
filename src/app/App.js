import AppHeader from "../components/app-header/AppHeader";
import RandomChar from "../components/char-random/RandomChar";
import CharList from "../components/char-list/CharList";
import CharInfo from "../components/char-info/CharInfo";
import ErrorBoundaries from "../components/error-boundaries/ErrorBoundaries";
import decoration from '../resources/img/vision.png';
import {Component} from "react";

class App extends Component  {
    state = {
        characterId: null
    }

    onSelectedChar = (id) => {
        this.setState({
            characterId: id
        })
    }

    render () {
      return ( <div className="app">
            <AppHeader/>
            <main>
                <ErrorBoundaries>
                    <RandomChar/>
                </ErrorBoundaries>
                <div className="char__content">
                    <ErrorBoundaries>
                        <CharList onSelectedChar = {this.onSelectedChar}/>
                    </ErrorBoundaries>
                    <ErrorBoundaries>
                        <CharInfo characterId = {this.state.characterId}/>
                    </ErrorBoundaries>
                </div>
                <img className="bg-decoration" src={decoration} alt="vision"/>
            </main>
        </div>
      )
    }
}

export default App;