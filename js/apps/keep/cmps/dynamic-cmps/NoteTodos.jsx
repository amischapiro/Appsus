import { ColorInput } from '../ChangeBakcground.jsx';
import { emailService } from '../../../mail/services/email.service.js';

export function NoteTodos({
	note,
	onDeleteNote,
	onPinHandle,
	onCloneNote,
	onOpenColorModal,
	onOpenEditModal
}) {
	const {
		info: { label, todos },
	} = note;

	function noteEmail() {
		const mailingList = todos.map(todo => {return todo.txt});
		const mailBody = mailingList.join(', ');
		const note = {
			body: mailBody,
			subject: label,
			to: 'me@gmail.com',
		};
		emailService.sendEmail(note);
	}

	return (
		<div className="note-preview" style={{ backgroundColor: note.style.backgroundColor }}>
			<h3>{label}</h3>
			<ul>
				{todos.map((todo, idx) => {
					return <li key={idx}>{todo.txt}</li>;
				})}
			</ul>
			<div className="note-actions">
				<button onClick={() => onPinHandle(note.id)}>
					<i className={`fas fa-thumbtack ${note.isPinned ? 'active-thumb' : ''}`}></i>
				</button>
				<button onClick={() => onOpenColorModal({id: note.id, pinned: note.isPinned})}>
					<i className="fas fa-palette"></i>
				</button>
				<button onClick={noteEmail}>
					<i className="far fa-envelope"></i>
				</button>
				<button onClick={() => onOpenEditModal(note)}>
					<i className="far fa-edit"></i>
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
