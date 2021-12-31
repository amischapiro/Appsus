import { storageService } from "../../../services/storage.service.js";
import { utilService } from "../../../services/util.service.js";

export const noteService = {
    query,
    removeNote,
    saveNote,
    getYoutubeId,
    addPinnedNote,
    removePinnedNote,
    queryPinned,
    cloneNote,
    changeNoteBgc
}

const NOTE_KEY = 'noteDB';
const PINNED_KEY = 'pinnedNoteDB';
_createNotes();

function query(filterBy = null) {
    const notes = _loadNotesFromStorage();
    if (!filterBy) return Promise.resolve(notes);
    const filteredNotes = _getFilteredNotes(notes, filterBy);
    return Promise.resolve(filteredNotes);
}

function queryPinned(filterBy = null) {
    const pinnedNotes = _loadNotesFromStorage(PINNED_KEY);
    if (!filterBy) return Promise.resolve(pinnedNotes);
    const filteredNotes = _getFilteredNotes(pinnedNotes, filterBy);
    return Promise.resolve(filteredNotes);
}

function removeNote(noteId, isPinned = false) {
    let notes = !isPinned ? _loadNotesFromStorage() : _loadNotesFromStorage(PINNED_KEY);
    notes = notes.filter(note => note.id !== noteId);
    if (!isPinned) _saveNotesToStorage(notes);
    else _saveNotesToStorage(notes, PINNED_KEY);
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
    let pinnedNotes = _loadNotesFromStorage(PINNED_KEY);
    const noteIdx = notes.findIndex(note => note.id === noteId);
    const pinnedNote = notes.splice(noteIdx, 1);
    pinnedNote[0].isPinned = true;
    pinnedNotes.unshift(pinnedNote[0]);
    _saveNotesToStorage(notes);
    _saveNotesToStorage(pinnedNotes, PINNED_KEY);
    return Promise.resolve();
}

function removePinnedNote(noteId) {
    let notes = _loadNotesFromStorage();
    let pinnedNotes = _loadNotesFromStorage(PINNED_KEY);
    const pinnedNoteIdx = pinnedNotes.findIndex(note => note.id === noteId);
    const note = pinnedNotes.splice(pinnedNoteIdx, 1);
    note[0].isPinned = false;
    notes.unshift(note[0]);
    _saveNotesToStorage(notes);
    _saveNotesToStorage(pinnedNotes, PINNED_KEY);
    return Promise.resolve();
}

function cloneNote(noteId, isPinned) {
    let noteList = isPinned ? _loadNotesFromStorage(PINNED_KEY) : _loadNotesFromStorage();
    //use find
    let noteToDup = noteList.find(note => note.id === noteId);
    const dupedNote = { ...noteToDup };
    dupedNote.id = utilService.makeId();
    noteList.unshift(dupedNote);
    if (isPinned) _saveNotesToStorage(noteList, PINNED_KEY);
    else _saveNotesToStorage(noteList);
    return Promise.resolve();
}

function changeNoteBgc(noteId, isPinned, bgc) {
    let noteList = isPinned ? _loadNotesFromStorage(PINNED_KEY) : _loadNotesFromStorage();
    const noteIdx = noteList.findIndex(note => note.id === noteId);
    noteList[noteIdx].style.backgroundColor = bgc;
    if (isPinned) _saveNotesToStorage(noteList, PINNED_KEY);
    else _saveNotesToStorage(noteList);
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
        info: noteToSave,
        style: {
            backgroundColor: "#fff"
        }
    }
}

function _updateNote(noteToSave) {
    return;
}

function _saveNotesToStorage(notes, key = NOTE_KEY) {
    storageService.saveToStorage(key, notes);
}

function _loadNotesFromStorage(key = NOTE_KEY) {
    // use same array and filter pinned
    return storageService.loadFromStorage(key);
}

function _createNotes() {
    const notes = (_loadNotesFromStorage()) ? _loadNotesFromStorage() : _getNotes();
    const pinnedNotes = (_loadNotesFromStorage(PINNED_KEY)) ? _loadNotesFromStorage(PINNED_KEY) : _getPinnedNotes();
    _saveNotesToStorage(notes);
    _saveNotesToStorage(pinnedNotes, PINNED_KEY);
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
            isPinned: false,
            info: {
                url: "assets/img/fox.jpg",
                title: "Bobi and I"
            },
            style: {
                backgroundColor: "#fff"
            }
        },
        // {
        //     id: utilService.makeId(),
        //     type: "note-vid",
        // isPinned: false,
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
            isPinned: false,
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

function _getPinnedNotes() {
    const pinnedNotes = [
        {
            id: utilService.makeId(),
            type: "note-txt",
            isPinned: true,
            info: {
                txt: "Important note"
            },
            style: {
                backgroundColor: "#fff"
            }
        },
    ];

    return pinnedNotes;
}