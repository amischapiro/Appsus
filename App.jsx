import { AppHome } from "./js/pages/app-home.jsx"
import { AppAbout } from "./js/pages/app-about.jsx"
import { EmailApp } from "./js/pages/EmailApp.jsx"
import { KeepApp } from "./js/pages/KeepApp.jsx"
import { BookApp } from './js/apps/book/pages/BookApp.jsx'
import { BookDetails } from './js/apps/book/pages/BookDetails.jsx'
import { Booksearch } from './js/apps/book/pages/BookSearch.jsx'


const Router = ReactRouterDOM.HashRouter
const { Route, Switch } = ReactRouterDOM

export function App() {
    return (
        <Router>
            <section className="apps">
                <main>
                    <Switch>
                        <Route component={Booksearch} exact path="/book/search" />
                        <Route component={BookDetails} path="/book/:bookId" />
                        <Route component={BookApp} path="/book" />
                        <Route component={AppAbout} path="/about" />
                        <Route component={KeepApp} path="/keep" />
                        <Route component={EmailApp} path="/email" />
                        <Route component={AppHome} path="/" />
                    </Switch>
                </main>
            </section>
        </Router>
    )


}