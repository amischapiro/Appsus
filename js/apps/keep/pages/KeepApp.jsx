import { Loader } from '../../../cmps/Loader.jsx';
import { NoteList } from '../cmps/NoteList.jsx';
import { PinnedNoteList } from '../cmps/PinnedNoteList.jsx';
import { noteService } from '../services/note.service.js';
import { CreateNote } from '../cmps/CreateNote.jsx';
import { FilterNote } from '../cmps/FilterNote.jsx';
import { EditNote } from '../cmps/EditNote.jsx';
import { ColorInput } from '../cmps/ChangeBakcground.jsx';
const { link } = ReactRouterDOM;

export class KeepApp extends React.Component {
	state = {
		notes: null,
		filterBy: null,
		pinnedNotes: null,
		isEditShown: false,
		noteEdited: null,
		isColorEditShown: false,
		noteColored: null,
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

	onCreateNote = (txt, noteType) => {
		noteService.saveNote(txt, noteType).then(this.loadNotes);
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

	onDeleteNote = (noteId, isPinned) => {
		noteService.removeNote(noteId, isPinned).then(this.loadNotes);
	};

	onCloneNote = (noteId, isPinned) => {
		noteService.cloneNote(noteId, isPinned).then(this.loadNotes);
	};

	onChangeBackground = (noteId, isPinned, bgc) => {
		noteService.changeNoteBgc(noteId, isPinned, bgc).then(this.loadNotes);
		this.setState((prevState) => ({
			...prevState,
			isColorEditShown: !this.state.isColorEditShown,
		}));
	};

	onOpenEditModal = (note) => {
		this.state.noteEdited = note;
		this.setState((prevState) => ({
			...prevState,
			isEditShown: !this.state.isEditShown,
		}));
	};

	onCloseEditModal = () => {
		this.setState((prevState) => ({
			...prevState,
			isEditShown: !this.state.isEditShown,
		}));
	};

	onOpenColorModal = (note) => {
		this.state.noteColored = note;
		this.setState((prevState) => ({
			...prevState,
			isColorEditShown: !this.state.isColorEditShown,
		}));
	};

	onCloseColorModal = () => {
		this.setState((prevState) => ({
			...prevState,
			isColorEditShown: !this.state.isColorEditShown,
		}));
	};

	// handleEditChange = (ev) => {
	// 	console.log(ev);
	// }

	render() {
		const {
			notes,
			pinnedNotes,
			isColorEditShown,
			noteColored,
			noteEdited,
			isEditShown,
		} = this.state;
		if (!notes || !pinnedNotes) return <Loader />;

		return (
			<section className="keep-app">
				<div className="filter-display">
					<FilterNote onSetFilter={this.onSetFilter} />
				</div>
				<div className="note-display-edit">
					<CreateNote onCreateNote={this.onCreateNote} />
					<PinnedNoteList
						notes={pinnedNotes}
						onDeleteNote={this.onDeleteNote}
						onPinHandle={this.onUnpinNote}
						onCloneNote={this.onCloneNote}
						onOpenColorModal={this.onOpenColorModal}
						onOpenEditModal={this.onOpenEditModal}
					/>
					{isEditShown && (
						<EditNote
							note={noteEdited}
							onCloseEditModal={this.onCloseEditModal}
							handleEditChange={this.handleEditChange}
						/>
					)}
					{isColorEditShown && (
						<ColorInput
							note={noteColored}
							onCloseColorModal={this.onCloseColorModal}
							onChooseColor={this.onChangeBackground}
						/>
					)}
					<NoteList
						notes={notes}
						onDeleteNote={this.onDeleteNote}
						onPinHandle={this.onPinNote}
						onCloneNote={this.onCloneNote}
						onOpenColorModal={this.onOpenColorModal}
						onOpenEditModal={this.onOpenEditModal}
					/>
				</div>
			</section>
		);
	}
}
