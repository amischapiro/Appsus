import { Loader } from '../../../cmps/Loader.jsx';
import { noteService } from '../services/note.service.js';
import { eventBusService } from '../../../services/event-bus.service.js';

const { Link } = ReactRouterDOM;

export class NoteDetails extends React.Component {
	state = {
		note: null,
	};

	componentDidMount() {
		this.loadNote();
	}

	loadNote = () => {
		const { noteId } = this.props.match.params;
		noteService.getNoteById(noteId).then((note) => {
			if (!note) return this.props.history.push('/');
			this.setState({ note });
		});
	};

	onGoBack = () => {
		this.props.history.push('/keep');
	};

	onDeleteNote = () => {
		const { id } = this.state.note;
		noteService.removeNote(id).then(() => {
			eventBusService.emit('user-msg', {
				txt: 'Note deleted!',
				type: 'danger',
			});
			this.onGoBack();
		});
	};

	render() {
		const { note } = this.state;
		if (!note) return <Loader />;
		return (
			<section className="note-details">
				<Link
					className="primary-btn clean-link"
					to={`/car/edit/${note.id}`}>
					Edit Note
				</Link>
				<h2>Type: {note.type}</h2>
				<p>{note.info.txt}</p>
				<button className="primary-btn" onClick={this.onDeleteNote}>
					Delete note
				</button>
			</section>
		);
	}
}
