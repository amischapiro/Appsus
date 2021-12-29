import { AppHome } from "./js/pages/app-home.jsx"
import { AppAbout } from "./js/pages/app-about.jsx"


const Router = ReactRouterDOM.HashRouter
const { Route, Switch } = ReactRouterDOM

export function App(){
    return (
        <Router>
            <section className="apps">
                <main>
                    <Switch>
                        <Route component={AppAbout} path="/about"/>
                        <Route component={AppHome} path="/"/>
                    </Switch>
                </main>
            </section>
        </Router>
    )


}