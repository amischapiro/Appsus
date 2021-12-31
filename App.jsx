import { AppHome } from './js/pages/app-home.jsx';
import { AppAbout } from './js/pages/app-about.jsx';
import { EmailApp } from './js/apps/mail/pages/EmailApp.jsx';
import { KeepApp } from './js/apps/keep/pages/KeepApp.jsx';
import { BookApp } from './js/apps/book/pages/BookApp.jsx';
import { BookDetails } from './js/apps/book/pages/BookDetails.jsx';
import { Booksearch } from './js/apps/book/pages/BookSearch.jsx';
import { AppHeader } from './js/cmps/AppHeader.jsx';
import { EmailDetails } from './js/apps/mail/cmps/EmailDetails.jsx';
import { UserMsg } from './js/cmps/user-msg.jsx';

const Router = ReactRouterDOM.HashRouter;
const { Route, Switch } = ReactRouterDOM;

export function App() {
    return (
        <Router>
            <section className="apps">
                <AppHeader />
                <main>
                    <Switch>
                        <Route
                            component={Booksearch}
                            exact
                            path="/book/search"
                        />
                        <Route component={BookDetails} path="/book/:bookId" />
                        <Route component={BookApp} path="/book" />
                        <Route component={AppAbout} path="/about" />
                        <Route component={KeepApp} path="/keep" />
                        {/* <Route component={EmailDetails} path="/email/:emailId"/> */}
                        <Route component={EmailApp} path="/email" />
                        <Route component={AppHome} path="/" />
                    </Switch>
                </main>
                <UserMsg />
            </section>
        </Router>
    );
}
