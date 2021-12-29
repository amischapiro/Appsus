import { storageService } from "../../../services/storage.service.js";
import { utilService } from "../../../services/util.service.js";

export const noteService = {
    query,
    removeNote
}

const KEY = 'noteDB';
_createNotes();

function query() {
    const notes = _loadNotesFromStorage();
    return Promise.resolve(notes);
}

function removeNote(noteId) {
    let notes = _loadNotesFromStorage();
    notes = notes.filter(note => note.id !== noteId);
    _saveNotesToStorage(notes);
    return Promise.resolve();
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
            isPinned: true,
            info: {
                txt: "Fullstack Me Baby!"
            }
        },
        {
            id: utilService.makeId,
            type: "note-txt",
            isPinned: true,
            info: {
                txt: "another note attempt"
            }
        },
        {
            id: utilService.makeId,
            type: "note-txt",
            isPinned: true,
            info: {
                txt: "Note test test test tes"
            }
        },
        // {
        //     id: utilService.makeId,
        //     type: "note-img",
        //     info: {
        //         url: "http://some-img/me",
        //         title: "Bobi and Me"
        //     },
        //     style: {
        //         backgroundColor: "#00d"
        //     }
        // },
        // {
        //     id: utilService.makeId,
        //     type: "note-todos",
        //     info: {
        //         label: "Get my stuff together",
        //         todos: [
        //             { txt: "Driving liscence", doneAt: null },
        //             { txt: "Coding power", doneAt: 187111111 }
        //         ]
        //     }
        // }
    ];

    return notes;
}