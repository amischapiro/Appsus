import { DynamicCmp } from './dynamic-cmps/DynamicCmp.jsx';
const { link } = ReactRouterDOM;

export function NotePreview({ note }) {
	return (
		<article className="note-preview">
			<DynamicCmp key={note.id} note={note} />
		</article>
	);
}
