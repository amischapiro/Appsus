import { ColorInput } from "../ChangeBakcground.jsx";

export function NoteTodos({ note, onDeleteNote, onPinHandle, onCloneNote, onChangeBackground }) {
	const {
		info: { label, todos },
	} = note;

	return (
		<div style={{ backgroundColor: note.style.backgroundColor }}>
			<h3>{label}</h3>
			<ul>
				{todos.map((todo, idx) => {
					return <li key={idx}>{todo.txt}</li>;
				})}
			</ul>
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
