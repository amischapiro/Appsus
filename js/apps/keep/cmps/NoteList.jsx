import { NotePreview } from './NotePreview.jsx';

export function NoteList({ notes, onDeleteNote, onPinHandle, onCloneNote, onOpenColorModal, onOpenEditModal }) {
	if (!notes.length)
		return (
			<div className="no-notes">
				<img></img>
				<h1>Notes you add appear here</h1>
			</div>
		);
	return (
		<section>
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
		</section>
	);
}
