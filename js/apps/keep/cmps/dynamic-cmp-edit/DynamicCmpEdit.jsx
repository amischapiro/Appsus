import { EditNoteTxt } from './EditNoteTxt.jsx';
import { EditNoteTodos } from './EditNoteTodos.jsx';
import { EditNoteImg } from './EditNoteImg.jsx';

export function DynamicCmpEdit({ note, onCloseEditModal }) {
	switch (note.type) {
		case 'note-img':
			return (
				<EditNoteImg
					note={note}
					onCloseEditModal={onCloseEditModal}
				/>
			);
		case 'note-todos':
			return (
				<EditNoteTodos
					note={note}
					onCloseEditModal={onCloseEditModal}
				/>
			);
		case 'note-txt':
			return (
				<EditNoteTxt
					note={note}
					onCloseEditModal={onCloseEditModal}
				/>
			);
		// case 'note-vid':
		//     return <NoteVid {...props.note} />
		default:
			return <React.Fragment></React.Fragment>;
	}
}
