import { utilService } from '../../../services/util.service.js';

export class CreateNote extends React.Component {
	state = {
		info: {
			txt: '',
		},
	};

	handleChange = ({ target }) => {
		const field = target.name;
		const value = target.value;
		this.setState(
			(prevState) => ({
				info: { ...prevState.info, [field]: value },
			}),
			// () => {
			// 	this.props.onCreateNote(this.state.info);
			// }
		);
	};

	onSubmitNote = (ev) => {
		ev.preventDefault();
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
			<form className="add-note" onSubmit={this.onSubmitNote}>
				<input
					placeholder="Take a note..."
					type="text"
					id="write-note"
					name="txt"
					value={txt}
					onChange={this.handleChange}
				/>
				<button className="primary-btn">i</button>
				<button className="primary-btn">l</button>
			</form>
		);
	}
}
