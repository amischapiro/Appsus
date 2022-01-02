import { noteService } from "../../services/note.service.jsx";

export function EditNoteImg({ note, onCloseEditModal }) {
	let {
		id,
		isPinned,
		info: { title },
	} = note;

	function handleChange(ev) {
		noteService.editNote(note, ev.target.value);
	}

	return (
		<div className="note-editor">
			<textarea
				value={title}
				cols="50"
				rows="2"
				onChange={handleChange}></textarea>
			<button onClick={() => onCloseEditModal()}>Done</button>
		</div>
	);
}
