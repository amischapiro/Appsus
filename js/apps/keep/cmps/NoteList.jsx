import { NotePreview } from './NotePreview.jsx';
import { Loader } from '../../../cmps/Loader.jsx';

export function NoteList({ notes, onDeleteNote }) {
    if(!notes.length) return (<div className="no-notes"><img></img><h1>Notes you add appear here</h1></div>);
    return (
        <section className="notes-list flex wrap">
            {notes.map(note => <NotePreview key={note.id} note={note} onDeleteNote={onDeleteNote} />)}
        </section>
    )
}