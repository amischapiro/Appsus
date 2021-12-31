import { ColorInput } from "../ChangeBakcground.jsx";

export function NoteTxt({ note, onDeleteNote, onPinHandle, onCloneNote, onChangeBackground }) {
	const {
		info: { txt },
	} = note;
	return (
		<div style={{ backgroundColor: note.style.backgroundColor }}>
			{/* <input type="text" value={txt} /> */}
			<p>{txt}</p>
			<div className="note-actions">
				<button onClick={() => onPinHandle(note.id)}>
					<i className="fas fa-thumbtack"></i>
				</button>
				<button onClick={() => <ColorInput note={note} onChangeBackground={onChangeBackground}/>}>
					<i className="fas fa-palette"></i>
				</button>
				<button>
					<i className="far fa-envelope"></i>
				</button>
				<button onClick={() => onDeleteNote(note.id, note.isPinned)}>
					<i className="far fa-trash-alt"></i>
				</button>
				<button onClick={() => onCloneNote(note.id, note.isPinned)}>
					<i className="far fa-clone"></i>
				</button>
			</div>
		</div>
	);
}

{
	/* <form
					className="add-note"
					onSubmit={this.onSubmitNote}
					autoComplete="off">
					<input
						placeholder="Take a note..."
						type="text"
						id="write-note"
						name="txt"
						value={txt}
						onChange={this.handleChange}
					/>
				</form> */
}
