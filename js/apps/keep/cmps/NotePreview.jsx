import { DynamicCmp } from './dynamic-cmps/DynamicCmp.jsx';
const { link } = ReactRouterDOM;

export function NotePreview({ note, onDeleteNote, onPinHandle }) {
	return (
		<article className="note-preview">
			<DynamicCmp key={note.id} note={note} onDeleteNote={onDeleteNote} onPinHandle={onPinHandle} />
		</article>
	);
}
