import { DynamicCmpEdit } from "./dynamic-cmp-edit/DynamicCmpEdit.jsx";

export function EditNote({ note, onEditNote }) {
	return (
		<DynamicCmpEdit note={ note} onEditNote={onEditNote} />
	);
}
