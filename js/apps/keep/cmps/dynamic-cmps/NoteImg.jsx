export function NoteImg({info}) {
    const {url, title} = info;
    return (
        <div>
            <img src={url} alt="" />
            <input type="text" value={title} />
        </div>
    )
}