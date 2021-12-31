import { noteService } from '../../services/note.service.js';

export function NoteImg({ note, onDeleteNote, onPinHandle }) {
	const {
		info: { url, title },
	} = note;
	return (
		<div>
			<img src={url} alt="" />
			<input type="text" value={title} />
			<div className="note-actions">
				<button onClick={() => onPinHandle(note.id)}>
					<i className="fas fa-thumbtack"></i>
				</button>
				<button onClick={() => onDeleteNote(note.id)}>
					<i className="far fa-trash-alt"></i>
				</button>
				<button>
					<i className="fas fa-palette"></i>
				</button>
			</div>
		</div>
	);
}
