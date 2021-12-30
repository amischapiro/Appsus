import { Loader } from '../../../cmps/Loader.jsx';
import { NoteList } from '../cmps/NoteList.jsx';
import { noteService } from '../services/note.service.js';
import { CreateNote } from '../cmps/CreateNote.jsx';
import { FilterNote } from '../cmps/FilterNote.jsx';
const { link } = ReactRouterDOM;

export class KeepApp extends React.Component {
	state = {
		notes: null,
	};

	componentDidMount() {
		this.loadNotes();
	}

	loadNotes = () => {
		noteService.query().then((notes) => {
			this.setState({ notes });
		});
	};

	onCreateNote = (txt) => {
		noteService.saveNote(txt).then(this.loadNotes);
	};

	render() {
		const { notes } = this.state;
		if (!notes) return <Loader />;
		return (
			<section className="keep-app">
				<div className="container">
					<FilterNote className="filter-display"/>
					<div className="note-display-edit">
						<CreateNote onCreateNote={this.onCreateNote} />
						<NoteList notes={notes} />
					</div>
				</div>
			</section>
		);
	}
}
