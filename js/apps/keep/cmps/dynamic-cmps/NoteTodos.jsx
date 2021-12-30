import { noteService } from '../../services/note.service.js';

export function NoteTodos({ note, onDeleteNote }) {
	const {
		info: { label, todos },
	} = note;

	return (
		<div>
			<h3>{label}</h3>
			<ul>
				{todos.map((todo, idx) => {
					return <li key={idx}>{todo.txt}</li>;
				})}
			</ul>
			<div className="note-actions">
				<button onClick={() => onDeleteNote(note.id)}>
					<i className="far fa-trash-alt"></i>
				</button>
				<button>
					<i className="fas fa-thumbtack"></i>
				</button>
				<button>
					<i className="fas fa-palette"></i>
				</button>
			</div>
		</div>
	);
}
