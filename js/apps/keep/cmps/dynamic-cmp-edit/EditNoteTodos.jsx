import { noteService } from "../../services/note.service.jsx";

export function EditNoteTodos({ note, onCloseEditModal }) {
	let {
		id,
		isPinned,
		info: { label, todos },
	} = note;
	let listText = todos.map((todo) => {
		return todo.txt;
	});
    listText.unshift(label);
    listText.join(',');

	function handleChange(ev) {
		noteService.editNote(note, ev.target.value);
	}

	return (
		<div className="note-editor">
			<textarea
				value={listText}
				cols="50"
				rows="2"
				onChange={handleChange}></textarea>
			<button onClick={() => onCloseEditModal()}>Done</button>
		</div>
	);
}
