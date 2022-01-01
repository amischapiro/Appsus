import { ColorInput } from "../ChangeBakcground.jsx";
import { emailService } from "../../../mail/services/email.service.js";

export function NoteTxt({ note, onDeleteNote, onPinHandle, onCloneNote, onOpenColorModal }) {
	const {
		info: { txt },
	} = note;

	function noteEmail(){
		const note = {body:txt,subject: 'note', to:'me@gmail.com'}
		emailService.sendEmail(note)

	}

	return (
		<div style={{ backgroundColor: note.style.backgroundColor }}>
			{/* <input type="text" value={txt} /> */}
			<p>{txt}</p>
			<div className="note-actions">
				<button onClick={() => onPinHandle(note.id)}>
					<i className="fas fa-thumbtack"></i>
				</button>
				<button onClick={() => onOpenColorModal()}>
					<i className="fas fa-palette"></i>
				</button>
				<button onClick={noteEmail}>
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

{
	/* <form
					className="add-note"
					onSubmit={this.onSubmitNote}
					autoComplete="off">
					<input
						placeholder="Take a note..."
						type="text"
						id="write-note"
						name="txt"
						value={txt}
						onChange={this.handleChange}
					/>
				</form> */
}
