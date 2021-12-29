export function NoteImg({info}) {
    const {url, title} = info;
    return (
        <div>
            <img src={url} alt="" />
            <h3>{title}</h3>
        </div>
    )
}