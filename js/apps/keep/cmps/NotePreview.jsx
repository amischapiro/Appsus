import { DynamicCmp } from './dynamic-cmps/DynamicCmp.jsx';

export function NotePreview({ note, onDeleteNote, onPinHandle, onCloneNote, onToggleColorModal }) {
	return (
		<article className="note-preview">
			<DynamicCmp
				key={note.id}
				note={note}
				onDeleteNote={onDeleteNote}
				onPinHandle={onPinHandle}
				onCloneNote={onCloneNote}
				onToggleColorModal={onToggleColorModal}
			/>
		</article>
	);
}
