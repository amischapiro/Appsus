import { DynamicCmpEdit } from './dynamic-cmp-edit/DynamicCmpEdit.jsx';

export function EditNote({ note, onCloseEditModal, handleEditChange }) {
	return (
		<DynamicCmpEdit
			note={note}
			onCloseEditModal={onCloseEditModal}
			handleEditChange={handleEditChange}
		/>
	);
}
