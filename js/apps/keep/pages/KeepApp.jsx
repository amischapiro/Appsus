import { Loader } from '../../../cmps/Loader.jsx';
import { NoteList } from '../cmps/NoteList.jsx';
import { noteService } from '../services/note.service.js';
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

	render() {
		const { notes } = this.state;
		if (!notes) return <Loader />;
		return (
			<section>
				<h1>KeepApp</h1>
				<NoteList notes={notes} />
			</section>
		);
	}
}
