import { DynamicCmp } from './dynamic-cmps/DynamicCmp.jsx';
const { link } = ReactRouterDOM;

export function NotePreview({ note, onDeleteNote }) {
	return (
		<article className="note-preview">
			<DynamicCmp key={note.id} note={note} onDeleteNote={onDeleteNote} />
		</article>
	);
}
