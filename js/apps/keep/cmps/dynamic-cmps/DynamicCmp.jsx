import { NoteImg } from "./NoteImg.jsx";
import { NoteTodos } from "./NoteTodos.jsx";
import { NoteTxt } from "./NoteTxt.jsx";
import { NoteVid } from "./NoteVid.jsx";

export function DynamicCmp(props) {
    switch(props.note.type) {
        case 'note-img':
            return <NoteImg {...props} />
        case 'note-todos':
            return <NoteTodos {...props} />
        case 'note-txt':
            return <NoteTxt {...props} />
        // case 'note-vid':
        //     return <NoteVid {...props.note} />
        default:
            return <React.Fragment></React.Fragment>
    }
}