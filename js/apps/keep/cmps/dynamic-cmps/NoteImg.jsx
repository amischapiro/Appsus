import { ColorInput } from "../ChangeBakcground.jsx";

export function NoteImg({ note, onDeleteNote, onPinHandle, onCloneNote, onChangeBackground }) {
	const {
		info: { url, title },
	} = note;
	return (
		<div style={{ backgroundColor: note.style.backgroundColor }}>
			<img src={url} alt="" />
			{/* <input type="text" value={title} /> */}
			<h3>{title}</h3>
			<div className="note-actions">
				<button onClick={() => onPinHandle(note.id)}>
					<i className="fas fa-thumbtack"></i>
				</button>
				<button onClick={() => <ColorInput note={note} onChangeBackground={onChangeBackground}/>}>
					<i className="fas fa-palette"></i>
				</button>
				<button>
					<i className="far fa-envelope"></i>
				</button>
				<button onClick={() => onDeleteNote(note.id, note.isPinned)}>
					<i className="far fa-trash-alt"></i>
				</button>
				<button onClick={() => onCloneNote(note.id, note.isPinned)}>
					<i className="far fa-clone"></i>
				</button>
			</div>
		</div>
	);
}
