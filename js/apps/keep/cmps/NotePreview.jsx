const { link } = ReactRouterDOM;

export function NotePreview({note}) {
    return (
        <article className="note-preview">
            <h3>{note.info.txt}</h3>
        </article>
    )
}