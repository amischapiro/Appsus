const { NavLink, withRouter } = ReactRouterDOM;

class _AppHeader extends React.Component {
	render() {
		return (
			<header className="app-header">
				<div className="header-container">
					<h1 onClick={() => this.props.history.push('/')}><img src="../assets/img/logo.png" alt="" /></h1>
					<nav className="app-nav">
						<NavLink className="clean-link" activeClassName="my-activ" exact to="/">
							Home
						</NavLink>
						<NavLink
							className="clean-link"
							activeClassName="my-active"
							to="/keep">
							Keep
						</NavLink>
						<NavLink
							className="clean-link"
							activeClassName="my-active"
							to="/email">
							eMail
						</NavLink>
						<NavLink
							className="clean-link"
							activeClassName="my-active"
							to="/about">
							About
						</NavLink>
					</nav>
				</div>
			</header>
		);
	}
}

export const AppHeader = withRouter(_AppHeader);
