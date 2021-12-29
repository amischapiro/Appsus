import { AppHome } from './js/pages/app-home.jsx';
import { AppAbout } from './js/pages/app-about.jsx';
import { EmailApp } from './js/pages/EmailApp.jsx';
import { KeepApp } from './js/pages/KeepApp.jsx';
import { AppHeader } from './js/cmps/AppHeader.jsx';

const Router = ReactRouterDOM.HashRouter;
const { Route, Switch } = ReactRouterDOM;

export function App() {
	return (
		<Router>
			<section className="apps">
				<AppHeader />
				<main>
					<Switch>
						<Route component={AppAbout} path="/about" />
						<Route component={KeepApp} path="/keep" />
						<Route component={EmailApp} path="/email" />
						<Route component={AppHome} path="/" />
					</Switch>
				</main>
			</section>
		</Router>
	);
}
