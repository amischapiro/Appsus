// import { noteService } from '../../services/note.service.js';

export function NoteTxt ({ note, onDeleteNote }) {
	const {
		info: { txt },
	} = note;
	return (
		<div>
			<input type="text" value={txt} />
			<div className="note-actions">
				<button onClick={() => onDeleteNote(note.id)}>
					<i className="far fa-trash-alt"></i>
				</button>
                <button><i className="fas fa-thumbtack"></i></button>
                <button><i className="fas fa-palette"></i></button>
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
