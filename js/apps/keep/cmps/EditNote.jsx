export class EditNote extends React.Component {
	state = {
		info: {
			txt: '',
		},
	};

	handleChange = ({ target }) => {
		const field = target.name;
		const value = target.value;
		this.setState((prevState) => ({
			info: { ...prevState.info, [field]: value },
		}));
	};

	onSubmitNote = () => {
		this.props.onCreateNote(this.state.info);
		this.cleanForm();
	};

	cleanForm = () => {
		this.setState({
			info: {
				txt: '',
			},
		});
	};

	render() {
        const {
			info: { txt },
		} = this.state;
		return (
			<div className="note-editor">
				<textarea
					name="txt"
					id="simple-txt-edit"
					cols="50"
					rows="2"
                    value={txt}
					onChange={this.handleChange}></textarea>
				<button onClick={this.onSubmitNote}>Save</button>
			</div>
		);
	}
}

// export class CreateNote extends React.Component {
// 	state = {
// 		info: {
// 			txt: '',
// 		},
// 	};

// 	handleChange = ({ target }) => {
// 		const field = target.name;
// 		const value = target.value;
// 		this.setState((prevState) => ({
// 			info: { ...prevState.info, [field]: value },
// 		}));
// 	};

// 	onSubmitNote = (ev) => {
// 		ev.preventDefault();
// 		this.props.onCreateNote(this.state.info);
// 		this.cleanForm();
// 	};

// 	cleanForm = () => {
// 		this.setState({
// 			info: {
// 				txt: '',
// 			},
// 		});
// 	};

// 	render() {
// 		const {
// 			info: { txt },
// 		} = this.state;
// 		return (
// 			<div className="add-note-container flex">
// 				<form
// 					className="add-note"
// 					onSubmit={this.onSubmitNote}
// 					autoComplete="off">
// 					<input
// 						placeholder="Take a note..."
// 						type="text"
// 						id="write-note"
// 						name="txt"
// 						value={txt}
// 						onChange={this.handleChange}
// 					/>
// 				</form>
// 				<button className="primary-btn">
// 					<i className="far fa-check-square"></i>
// 				</button>
// 				<button className="primary-btn">
// 					<i className="far fa-image"></i>
// 				</button>
// 			</div>
// 		);
// 	}
// }
