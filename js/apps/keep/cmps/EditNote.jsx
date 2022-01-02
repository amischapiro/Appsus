import { DynamicCmpEdit } from './dynamic-cmp-edit/DynamicCmpEdit.jsx';

export function EditNote({ note, onCloseEditModal }) {
	return (
		<DynamicCmpEdit
			note={note}
			onCloseEditModal={onCloseEditModal}
		/>
	);
}
