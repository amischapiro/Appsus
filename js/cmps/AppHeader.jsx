const { NavLink, withRouter } = ReactRouterDOM;

class _AppHeader extends React.Component {
	render() {
		return (
			<header className="app-header">
				<div className="header-container flex justify-space-between main-layout">
					<h1 onClick={() => this.props.history.push('/')}>
						<img src="../assets/img/logo.png" alt="" />
					</h1>
					<nav className="app-nav">
						<ul className="clean-list flex">
							<li>
								<NavLink
									className="clean-link"
									activeClassName="my-activ"
									exact
									to="/">
									Home
								</NavLink>
							</li>
							<li>
								<NavLink
									className="clean-link"
									activeClassName="my-active"
									to="/keep">
									Keep
								</NavLink>
							</li>
							<li>
								<NavLink
									className="clean-link"
									activeClassName="my-active"
									to="/email">
									eMail
								</NavLink>
							</li>
							<li>
								<NavLink
									className="clean-link"
									activeClassName="my-active"
									to="/book">
									Books
								</NavLink>
							</li>
							<li>
								<NavLink
									className="clean-link"
									activeClassName="my-active"
									to="/about">
									About
								</NavLink>
							</li>
						</ul>
					</nav>
				</div>
			</header>
		);
	}
}

export const AppHeader = withRouter(_AppHeader);
