import { ColorInput } from '../ChangeBakcground.jsx';
import { emailService } from '../../../mail/services/email.service.js';

export function NoteImg({
	note,
	onDeleteNote,
	onPinHandle,
	onCloneNote,
	onOpenColorModal,
	onOpenEditModal
}) {
	const {
		info: { url, title },
	} = note;

	function noteEmail() {
		const note = { body: url, subject: title, to: 'me@gmail.com' };
		emailService.sendEmail(note);
	}

	return (
		<div
			className="note-preview"
			style={{ backgroundColor: note.style.backgroundColor }}>
			<img src={url} alt="" />
			{/* <input type="text" value={title} /> */}
			<h3>{title}</h3>
			<div className="note-actions">
				<button onClick={() => onPinHandle(note.id)}>
					<i
						className={`fas fa-thumbtack ${
							note.isPinned ? 'active-thumb' : ''
						}`}></i>
				</button>
				<button
					onClick={() =>
						onOpenColorModal({ id: note.id, pinned: note.isPinned })
					}>
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
