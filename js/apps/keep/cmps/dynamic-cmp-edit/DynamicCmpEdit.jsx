import { EditNoteTxt } from './EditNoteTxt.jsx';
import { EditNoteTodos } from './EditNoteTodos.jsx';
import { EditNoteImg } from './EditNoteImg.jsx';

export function DynamicCmpEdit({ note, onCloseEditModal, handleEditChange }) {
	switch (note.type) {
		case 'note-img':
			return (
				<EditNoteImg
					note={note}
					onCloseEditModal={onCloseEditModal}
                    handleEditChange={handleEditChange}
				/>
			);
		case 'note-todos':
			return (
				<EditNoteTodos
					note={note}
					onCloseEditModal={onCloseEditModal}
                    handleEditChange={handleEditChange}
				/>
			);
		case 'note-txt':
			return (
				<EditNoteTxt
					note={note}
					onCloseEditModal={onCloseEditModal}
                    handleEditChange={handleEditChange}
				/>
			);
		// case 'note-vid':
		//     return <NoteVid {...props.note} />
		default:
			return <React.Fragment></React.Fragment>;
	}
}
