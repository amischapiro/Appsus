export class FilterNote extends React.Component {
	state = {
		filterBy: {
			search: '',
			category: '',
		},
	};

	handleChange = ({ target }) => {
		const field = target.name;
		const value = target.value;
		this.setState(
			(prevState) => ({
				filterBy: { ...prevState.filterBy, [field]: value },
			}),
			() => {
				this.props.onSetFilter(this.state.filterBy);
			}
		);
	};

	onSubmitFilter = (ev) => {
		ev.preventDefault();
		this.props.onSetFilter(this.state.filterBy);
		this.cleanForm();
	};

	changeCtg = ({ target }) => {
		const value = target.value;
		this.setState(
			(prevState) => ({
				filterBy: { ...prevState.filterBy, category: value },
			}),
			() => {
				this.props.onSetFilter(this.state.filterBy);
			}
		);
	};

	cleanForm = () => {
		this.setState({ filterBy: { search: '', category: '' } });
	};

	render() {
		const {
			filterBy: { search },
		} = this.state;
		return (
			<section className="filter-notes">
				<input
					type="text"
					placeholder="search notes"
					name="search"
					value={search}
					onChange={this.handleChange}
					autoComplete="off"
				/>
				<button value="" onClick={this.changeCtg} className={`category ${(this.state.filterBy.category === '') ? 'active-category' : ''} `}>
					<i className="far fa-lightbulb"></i> All notes
				</button>
				<button value="note-txt" onClick={this.changeCtg} className={`category ${(this.state.filterBy.category === 'note-txt') ? 'active-category' : ''} `}>
					<i className="far fa-sticky-note"></i>Simple notes
				</button>
				<button value="note-todos" onClick={this.changeCtg} className={`category ${(this.state.filterBy.category === 'note-todos') ? 'active-category' : ''} `}>
					<i className="fas fa-list"></i>Lists
				</button>
				<button value="note-img" onClick={this.changeCtg} className={`category ${(this.state.filterBy.category === 'note-img') ? 'active-category' : ''} `}>
					<i className="far fa-images"></i>Images
				</button>
				<button value="note-img" className={`category ${(this.state.filterBy.category === 'note-vid') ? 'active-category' : ''} `}>
					<i className="fab fa-youtube"></i>Videos
				</button>
			</section>
		);
	}
}
