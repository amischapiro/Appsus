import { DynamicCmp } from './dynamic-cmps/DynamicCmp.jsx';

export function NotePreview({
	note,
	onDeleteNote,
	onPinHandle,
	onCloneNote,
	onOpenColorModal,
}) {
	return (
		<DynamicCmp
			key={note.id}
			note={note}
			onDeleteNote={onDeleteNote}
			onPinHandle={onPinHandle}
			onCloneNote={onCloneNote}
			onOpenColorModal={onOpenColorModal}
		/>
	);
}
