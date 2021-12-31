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
		pinnedNotes: null,
	};

	componentDidMount() {
		this.loadNotes();
	}

	loadNotes = () => {
		const { filterBy } = this.state;
		noteService
			.query(filterBy)
			.then((notes) => {
				this.setState({ notes });
			})
			.then(
				noteService.queryPinned(filterBy).then((pinnedNotes) => {
					this.setState({ pinnedNotes });
				})
			);
	};

	onCreateNote = (txt) => {
		noteService.saveNote(txt).then(this.loadNotes);
	};

	onSetFilter = (filterBy) => {
		this.setState({ filterBy }, this.loadNotes);
	};

	onPinNote = (noteId) => {
		noteService.addPinnedNote(noteId).then(this.loadNotes);
	};

	onUnpinNote = (noteId) => {
		noteService.removePinnedNote(noteId).then(this.loadNotes);
	};

	onDeleteNote = (noteId) => {
		noteService.removeNote(noteId).then(this.loadNotes);
	};
	
	onCloneNote = (noteId, isPinned) => {
		noteService.cloneNote(noteId, isPinned).then(this.loadNotes);
	}

	render() {
		const { notes, pinnedNotes } = this.state;
		if (!notes || !pinnedNotes) return <Loader />;
		return (
			<section className="keep-app">
				<div className="filter-display">
					<FilterNote onSetFilter={this.onSetFilter} />
				</div>
				<div className="note-display-edit">
					<CreateNote onCreateNote={this.onCreateNote} />
					<h3>PINNED</h3>
					<NoteList
						notes={pinnedNotes}
						onDeleteNote={this.onDeleteNote}
						onPinHandle={this.onUnpinNote}
						onCloneNote={this.onCloneNote}
					/>
					<h3>OTHERS</h3>
					<NoteList
						notes={notes}
						onDeleteNote={this.onDeleteNote}
						onPinHandle={this.onPinNote}
						onCloneNote={this.onCloneNote}
					/>
				</div>
			</section>
		);
	}
}
