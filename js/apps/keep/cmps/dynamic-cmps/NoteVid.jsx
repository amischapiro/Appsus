import { noteService } from '../../services/note.service.jsx';

export function NoteVid({ note, onDeleteNote, onPinHandle }) {
	const { url, title } = note;
	const embedId = noteService.getYoutubeId(url);
	const embededVid = 'https://www.youtube.com/embed/' + embedId;
	return (
		<div>
			<iframe
				width="600"
				height="370"
				src={embededVid}
				title="YouTube video player"
				frameborder="0"
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
				allowFullScreen></iframe>
			<input type="text" value={title} />
		</div>
	);
}
