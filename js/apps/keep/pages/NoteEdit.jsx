import { noteService } from '../services/note.service.js';
import { eventBusService } from '../../../services/event-bus.service.js';

export class NoteEdit extends React.Component {
	state = {
		note: {
			type: '',
			info: {
				txt: '',
			},
		},
	};

	inputRef = React.createRef();

	componentDidMount() {
		this.inputRef.current.focus();
		this.loadNote();
	}

	loadNote = () => {
		const { noteId } = this.props.match.params;
		if (!noteId) return;
		console.log('noteId in NoteDetails', noteId);
		noteService.getNoteById(noteId).then((note) => {
			if (!note) return this.props.history.push('/');
			this.setState({ note });
		});
	};

	handleChange = ({ note }) => {
		const field = note.name;
		const value = note.type === 'number' ? +target.value : target.value;
		this.setState((prevState) => ({
			nope: { ...prevState.nope, [field]: value },
		}));
	};

	onGoBack = () => {
		this.props.history.push('/keep');
	};

	onSaveCar = (ev) => {
		ev.preventDefault();
		const { note } = this.state;
		carService.saveCar(note).then(() => {
			eventBusService.emit('user-msg', {
				txt: 'Saved !',
				type: 'success',
			});
			this.onGoBack();
		});
	};

	render() {
		const { id, info } = this.state.note;
		return (
			<section className="note-edit">
				<h1>{id ? 'Edit' : 'Add'} note</h1>
				<form onSubmit={this.onSaveNote}>
					<input
						ref={this.inputRef}
						type="text"
						id="by-vendor"
						value={info.txt}
						onChange={this.handleChange}
					/>
					<button className="primary-btn ">Save note</button>
				</form>
			</section>
		);
	}
}
