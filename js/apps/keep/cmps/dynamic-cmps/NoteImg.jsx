import { noteService } from '../../services/note.service.js';

export function NoteImg({ note, onDeleteNote, onPinHandle, onCloneNote }) {
	const {
		info: { url, title },
	} = note;
	return (
		<div>
			<img src={url} alt="" />
			{/* <input type="text" value={title} /> */}
			<h3>{title}</h3>
			<div className="note-actions">
				<button onClick={() => onPinHandle(note.id)}>
					<i className="fas fa-thumbtack"></i>
				</button>
				<button>
					<i className="fas fa-palette"></i>
				</button>
				<button>
					<i className="far fa-envelope"></i>
				</button>
				<button onClick={() => onDeleteNote(note.id)}>
					<i className="far fa-trash-alt"></i>
				</button>
				<button onClick={() => onCloneNote(note.id, note.isPinned)}>
					<i className="far fa-clone"></i>
				</button>
			</div>
		</div>
	);
}
