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
				/>
				<button value="" onClick={this.changeCtg}>
					<i class="far fa-lightbulb"></i> All notes
				</button>
				<button value="note-txt" onClick={this.changeCtg}>
					<i class="far fa-sticky-note"></i> Simple notes
				</button>
				<button value="note-todos" onClick={this.changeCtg}>
					<i class="fas fa-list"></i> Lists
				</button>
				<button value="note-img" onClick={this.changeCtg}>
					<i class="far fa-images"></i> Images
				</button>
				<button>
					<i class="fab fa-youtube"></i> Videos
				</button>
			</section>
		);
	}
}
