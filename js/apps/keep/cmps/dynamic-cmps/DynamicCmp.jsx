import { NoteImg } from "./NoteImg.jsx";
import { NoteTodos } from "./NoteTodos.jsx";
import { NoteTxt } from "./NoteTxt.jsx";

export function DynamicCmp(props) {
    switch(props.note.type) {
        case 'note-img':
            return <NoteImg {...props.note} />
        case 'note-todos':
            return <NoteTodos {...props.note} />
        case 'note-txt':
            return <NoteTxt {...props.note.info} />
        default:
            return <React.Fragment></React.Fragment>
    }
}