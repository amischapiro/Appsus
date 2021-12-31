import { NoteImg } from './NoteImg.jsx';
import { NoteTodos } from './NoteTodos.jsx';
import { NoteTxt } from './NoteTxt.jsx';
import { NoteVid } from './NoteVid.jsx';

export function DynamicCmp({ note, onDeleteNote, onPinHandle, onCloneNote, onChangeBackground }) {
	switch (note.type) {
		case 'note-img':
			return (
				<NoteImg
					note={note}
					onDeleteNote={onDeleteNote}
					onPinHandle={onPinHandle}
					onCloneNote={onCloneNote}
                    onChangeBackground={onChangeBackground}
				/>
			);
		case 'note-todos':
			return (
				<NoteTodos
					note={note}
					onDeleteNote={onDeleteNote}
					onPinHandle={onPinHandle}
                    onCloneNote={onCloneNote}
                    onChangeBackground={onChangeBackground}
				/>
			);
		case 'note-txt':
			return (
				<NoteTxt
					note={note}
					onDeleteNote={onDeleteNote}
					onPinHandle={onPinHandle}
                    onCloneNote={onCloneNote}
                    onChangeBackground={onChangeBackground}
				/>
			);
		// case 'note-vid':
		//     return <NoteVid {...props.note} />
		default:
			return <React.Fragment></React.Fragment>;
	}
}
