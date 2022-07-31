import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { lazy, Suspense } from "react";
import AppHeader from "../components/app-header/AppHeader";
import Spinner from "../components/spinner/spinner";

const Error404 = lazy(() => import('../components/pages/404'));
const MainPage = lazy(() => import('../components/pages/Main-page'));
const ComicsPage = lazy(() => import('../components/pages/Comics-page'));
const SingleComicPage = lazy(() => import('../components/comics-single/SingleComicPage'));

const App = () => {
    return (
        <Router>
            <div className="app">
                <AppHeader/>
                <main>
                    <Suspense fallback={<Spinner/>}>
                        <Routes>
                            <Route exact path='/' element={<MainPage/>}/>
                            <Route exact path='/comics' element={<ComicsPage/>}/>
                            <Route exact path='/comics/:comicId' element={<SingleComicPage/>}/>
                            <Route path="*" element={<Error404/>}/>
                        </Routes>
                    </Suspense>
                </main>
            </div>
        </Router>
      )
}

export default App;