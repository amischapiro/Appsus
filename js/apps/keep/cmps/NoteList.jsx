import { Loader } from '../../../cmps/Loader.jsx';
import { NotePreview } from './NotePreview.jsx';

export function NoteList({ notes }) {
    if(!notes.length) return (<div className="no-notes"><img></img><h1>Notes you add appear here</h1></div>);
    return (
        <section className="notes-list flex wrap">
            {notes.map(note => <NotePreview key={note.id} note={note} />)}
        </section>
    )
}