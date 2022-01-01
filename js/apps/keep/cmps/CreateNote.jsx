export class CreateNote extends React.Component {
	state = {
		info: {
			txt: '',
		},
		noteType: 'txt',
	};

	handleChange = ({ target }) => {
		const field = target.name;
		const value = target.value;
		this.setState((prevState) => ({
			info: { ...prevState.info, [field]: value },
			noteType: prevState.noteType,
		}));
	};

	onSubmitNote = (ev) => {
		ev.preventDefault();
		this.props.onCreateNote(this.state.info.txt, this.state.noteType);
		this.cleanForm();
	};

	cleanForm = () => {
		this.setState({
			info: {
				txt: '',
			},
			noteType: 'txt',
		});
	};

	onChangeNoteType = (type) => {
		this.setState((prevState) => ({
			info: { ...prevState.info },
			noteType: type,
		}));
	};

	render() {
		const {
			info: { txt },
		} = this.state;
		let placeHolder =
			this.state.noteType === 'txt'
				? 'Take a note...'
				: this.state.noteType === 'todos'
				? 'Write a list separated by commas'
				: 'Paste your image URL';
		return (
			<div className="add-note-container flex">
				<form
					className="add-note"
					onSubmit={this.onSubmitNote}
					autoComplete="off">
					<input
						placeholder={placeHolder}
						type="text"
						id="write-note"
						name="txt"
						value={txt}
						onChange={this.handleChange}
					/>
				</form>
				<button
					className="primary-btn"
					onClick={() => this.onChangeNoteType('txt')}>
					<i className="far fa-sticky-note"></i>
				</button>
				<button
					className="primary-btn"
					onClick={() => this.onChangeNoteType('todos')}>
					<i className="far fa-check-square" value="todos"></i>
				</button>
				<button
					className="primary-btn"
					onClick={() => this.onChangeNoteType('img')}>
					<i className="far fa-image" value="img"></i>
				</button>
			</div>
		);
	}
}
