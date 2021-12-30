import { storageService } from "../../../services/storage.service.js";
import { utilService } from "../../../services/util.service.js";

export const noteService = {
    query,
    removeNote,
    saveNote
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

function _getFilteredNotes(notes, filterBy) {
    let {search, category} = filterBy;
    // if(!category) category = '';
    return notes.filter(note => {
        return note.type.includes(category);
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
        id: utilService.makeId,
        type: "note-txt",
        isPinned: false,
        info: noteToSave
    }
}

function _updateNote(noteToSave) {
    return;
}

function _saveNotesToStorage(notes) {
    storageService.saveToStorage(KEY, notes);
}

function _loadNotesFromStorage() {
    return storageService.loadFromStorage(KEY);
}

function _createNotes() {
    const notes = (_loadNotesFromStorage()) ? _loadNotesFromStorage() : _getNotes();
    _saveNotesToStorage(notes);
}

function _getNotes() {
    const notes = [
        {
            id: utilService.makeId,
            type: "note-txt",
            isPinned: false,
            info: {
                txt: "Fullstack Me Baby!"
            }
        },
        {
            id: utilService.makeId,
            type: "note-txt",
            isPinned: false,
            info: {
                txt: "another note attempt"
            }
        },
        {
            id: utilService.makeId,
            type: "note-txt",
            isPinned: false,
            info: {
                txt: "Note test test test tes"
            }
        },
        {
            id: utilService.makeId,
            type: "note-img",
            info: {
                url: "assets/img/fox.jpg",
                title: "Bobi and Me"
            },
            style: {
                backgroundColor: "#00d"
            }
        },
        {
            id: utilService.makeId,
            type: "note-todos",
            info: {
                label: "Get my stuff together",
                todos: [
                    { txt: "Driving liscence", doneAt: null },
                    { txt: "Coding power", doneAt: 187111111 }
                ]
            }
        }
    ];

    return notes;
}