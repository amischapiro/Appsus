import { Loader } from '../../../cmps/Loader.jsx';
import { NoteList } from '../cmps/NoteList.jsx';
import { noteService } from '../services/note.service.js';
import { CreateNote } from '../cmps/CreateNote.jsx';
import { FilterNote } from '../cmps/FilterNote.jsx';
const { link } = ReactRouterDOM;

export class KeepApp extends React.Component {
	state = {
		notes: null,
		filterBy: null,
	};

	componentDidMount() {
		this.loadNotes();
	}

	loadNotes = () => {
		const { filterBy } = this.state;
		noteService.query(filterBy).then((notes) => {
			this.setState({ notes });
		});
	};

	onCreateNote = (txt) => {
		noteService.saveNote(txt).then(this.loadNotes);
	};

	onSetFilter = (filterBy) => {
		this.setState({ filterBy }, this.loadNotes);
	};

	onPinNote = (noteId) => {
		noteService.addPinnedNote(noteId).then(this.loadNotes);
	}

	onUnpinNote = (noteId) => {
		noteService.removePinnedNote(noteId).then(this.loadNotes);
	}

	onDeleteNote = (noteId) => {
		console.log(noteId)
		noteService.removeNote(noteId).then(this.loadNotes);
	};

	render() {
		const { notes } = this.state;
		if (!notes) return <Loader />;
		return (
			<section className="keep-app">
				<div className="filter-display">
					<FilterNote onSetFilter={this.onSetFilter} />
				</div>
				<div className="note-display-edit">
					<CreateNote onCreateNote={this.onCreateNote} />
					<NoteList notes={notes} onDeleteNote={this.onDeleteNote} />
				</div>
			</section>
		);
	}
}
