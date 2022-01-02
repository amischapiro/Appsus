import { NotePreview } from './NotePreview.jsx';

export function PinnedNoteList({ notes, onDeleteNote, onPinHandle, onCloneNote, onOpenColorModal, onOpenEditModal }) {
	if (!notes.length) return <React.Fragment></React.Fragment>;
	return (
		<section className="pinned-note-list">
			<h3>PINNED</h3>
			<div className="notes-list">
				{notes.map((note) => (
					<NotePreview
						key={note.id}
						note={note}
						onDeleteNote={onDeleteNote}
						onPinHandle={onPinHandle}
						onCloneNote={onCloneNote}
                        onOpenColorModal={onOpenColorModal}
						onOpenEditModal={onOpenEditModal}
					/>
				))}
			</div>
            <h3>OTHERS</h3>
		</section>
	);
}
