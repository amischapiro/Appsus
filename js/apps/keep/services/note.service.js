import { storageService } from "../../../services/storage.service.js";
import { utilService } from "../../../services/util.service.js";

export const noteService = {
    query,
    removeNote,
    saveNote,
    getYoutubeId,
    addPinnedNote,
    removePinnedNote
}

const KEY = 'noteDB';
_createNotes();

function query(filterBy = null) {
    const notes = _loadNotesFromStorage();
    if (!filterBy) return Promise.resolve(notes);
    const filteredNotes = _getFilteredNotes(notes, filterBy);
    return Promise.resolve(filteredNotes);
}

function removeNote(noteId) {
    let notes = _loadNotesFromStorage();
    notes = notes.filter(note => note.id !== noteId);
    _saveNotesToStorage(notes);
    return Promise.resolve();
}

function saveNote(noteToSave) {
    return noteToSave.id ? _updateNote(noteToSave) : _addNote(noteToSave);
}

function getYoutubeId(url) {
    const regExp = /^.(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]).*/;
    const match = url.match(regExp);

    return Promise.resolve((match && match[2].length === 11) ? match[2] : null);
}

function addPinnedNote(noteId) {
    let notes = _loadNotesFromStorage();
    let pinnedNotes = _loadNotesFromStorage('pinnedNotesDB');
    const noteIdx = notes.findIndex(note => note.id === noteId);
    const pinnedNote = notes.splice(noteIdx, 1);
    pinnedNotes.unshift(pinnedNote);
    _saveNotesToStorage(notes);
    _saveNotesToStorage('pinnedNotesDB', pinnedNotes);
    return Promise.resolve();
}

function removePinnedNote(noteId) {
    let notes = _loadNotesFromStorage();
    let pinnedNotes = _loadNotesFromStorage('pinnedNotesDB');
    const pinnedNoteIdx = pinnedNotes.findIndex(note => note.id === noteId);
    const note = pinnedNotes.splice(pinnedNoteIdx, 1);
    notes.unshift(note);
    _saveNotesToStorage(notes);
    _saveNotesToStorage('pinnedNotesDB', pinnedNotes);
    return Promise.resolve();
}

function _getFilteredNotes(notes, filterBy) {
    let { search, category } = filterBy;
    // if(!category) category = '';
    return notes.filter(note => {
        const targetName = note.type === 'note-txt' ? 'txt' : note.type === 'note-img' ? 'title' : 'label';
        return note.type.includes(category) && (note.info[targetName].includes(search));
    })

}

function _addNote(noteToSave) {
    let notes = _loadNotesFromStorage();
    var note = _createNote(noteToSave);
    notes = [note, ...notes];
    _saveNotesToStorage(notes);
    return Promise.resolve();
}

function _createNote(noteToSave) {
    return {
        id: utilService.makeId(),
        type: "note-txt",
        isPinned: false,
        info: noteToSave
    }
}

function _updateNote(noteToSave) {
    return;
}

function _saveNotesToStorage(noteList = KEY, notes) {
    storageService.saveToStorage(noteList, notes);
}

function _loadNotesFromStorage(noteList = KEY) {
    return storageService.loadFromStorage(noteList);
}

function _createNotes() {
    const notes = (_loadNotesFromStorage()) ? _loadNotesFromStorage() : _getNotes();
    _saveNotesToStorage(notes);
}

function _getNotes() {
    const notes = [
        {
            id: utilService.makeId(),
            type: "note-txt",
            isPinned: false,
            info: {
                txt: "Fullstack Me Baby!"
            },
            style: {
                backgroundColor: "#fff"
            }
        },
        {
            id: utilService.makeId(),
            type: "note-txt",
            isPinned: false,
            info: {
                txt: "another note attempt"
            },
            style: {
                backgroundColor: "#fff"
            }
        },
        {
            id: utilService.makeId(),
            type: "note-txt",
            isPinned: false,
            info: {
                txt: "Note test test test tes"
            },
            style: {
                backgroundColor: "#fff"
            }
        },
        {
            id: utilService.makeId(),
            type: "note-img",
            info: {
                url: "assets/img/fox.jpg",
                title: "Bobi and Me"
            },
            style: {
                backgroundColor: "#fff"
            }
        },
        // {
        //     id: utilService.makeId(),
        //     type: "note-vid",
        //     info: {
        //         url: "https://www.youtube.com/watch?v=q7Xse0E_SzA&ab_channel=Channel5withAndrewCallaghan",
        //         title: "Bobi and Me"
        //     },
        //     style: {
        //         backgroundColor: "#00d"
        //     }
        // },
        {
            id: utilService.makeId(),
            type: "note-todos",
            info: {
                label: "Get my stuff together",
                todos: [
                    { txt: "Driving liscence", doneAt: null },
                    { txt: "Coding power", doneAt: 187111111 }
                ]
            },
            style: {
                backgroundColor: "#fff"
            }
        }
    ];

    return notes;
}