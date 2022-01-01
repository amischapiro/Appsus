export function ColorInput({ note, onCloseColorModal, onChooseColor }) {
	// console.log(note);
	const colors = [
		'#fff',
		'#f28b82',
		'#fbbc04',
		'#fff475',
		'#ccff90',
		'#a7ffeb',
		'#cbf0f8',
		'#aecbfa',
		'#d7aefb',
		'#fdcfe8',
		'#e6c9a8',
		'#e8eaed',
	];
	return (
		<div className="color-input">
			{colors.map((color) => {
				return (
					<div
						onClick={() =>
							onChooseColor(note.id, note.pinned, color)
						}
						style={{ backgroundColor: color }}
						key={color}
						className="color-value"></div>
				);
			})}
			<button onClick={() => onCloseColorModal()}>X</button>
		</div>
	);
}
