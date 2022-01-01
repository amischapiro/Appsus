import { EditNoteTxt } from "./EditNoteTxt.jsx";
import { EditNoteTodos } from "./EditNoteTodos.jsx";
import { EditNoteImg } from "./EditNoteImg.jsx";

export function DynamicCmpEdit({ note, onEditNote }) {
	switch (note.type) {
		case 'note-img':
			return <EditNoteImg note={note} onEditNote={onEditNote} />;
		case 'note-todos':
			return <EditNoteTodos note={note} onEditNote={onEditNote} />;
		case 'note-txt':
			return <EditNoteTxt note={note} onEditNote={onEditNote} />;
		// case 'note-vid':
		//     return <NoteVid {...props.note} />
		default:
			return <React.Fragment></React.Fragment>;
	}
}
