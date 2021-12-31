import { NotePreview } from './NotePreview.jsx';

export function PinnedNoteList({ notes, onDeleteNote, onPinHandle, onCloneNote, onChangeBackground }) {
	if (!notes.length) return <React.Fragment></React.Fragment>;
	return (
		<section>
			<h3>PINNED</h3>
			<div className="notes-list flex wrap">
				{notes.map((note) => (
					<NotePreview
						key={note.id}
						note={note}
						onDeleteNote={onDeleteNote}
						onPinHandle={onPinHandle}
						onCloneNote={onCloneNote}
                        onChangeBackground={onChangeBackground}
					/>
				))}
			</div>
            <h3>OTHERS</h3>
		</section>
	);
}
