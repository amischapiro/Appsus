import { utilService } from "../../../services/util.service.js";
import { storageService } from "../../../services/storage.service.js";


const gDefaultEmails = [
    {
        id: utilService.makeId(),
        subject: 'I hate react',
        body: utilService.makeLorem(50),
        isRead: false,
        sentAt: Date.now(),
        from: 'jordi@gmail.com',
        isStarred:false
    },
    {
        id: utilService.makeId(),
        subject: 'blah blah ',
        body: utilService.makeLorem(50),
        isRead: false,
        sentAt: Date.now(),
        from: 'jordi@gmail.com',
        isStarred:false
    },
    {
        id: utilService.makeId(),
        subject: 'coding academy',
        body: utilService.makeLorem(50),
        isRead: false,
        sentAt: Date.now(),
        from: 'jordi@gmail.com',
        isStarred:false
    },
    {
        id: utilService.makeId(),
        subject: 'coding academy',
        body: utilService.makeLorem(50),
        isRead: false,
        sentAt: Date.now(),
        from: 'jordi@gmail.com',
        isStarred:false
    },
    {
        id: utilService.makeId(),
        subject: 'coding academy',
        body: utilService.makeLorem(50),
        isRead: false,
        sentAt: Date.now(),
        from: 'jordi@gmail.com',
        isStarred:false
    },
    {
        id: utilService.makeId(),
        subject: 'coding academy',
        body: utilService.makeLorem(50),
        isRead: false,
        sentAt: Date.now(),
        from: 'jordi@gmail.com',
        isStarred:false
    }

]

export const emailService = {
    query,
    getEmailById,
    removeEmail,
    sendEmail,
    emailRead,
    emailStarred

}

const KEY = 'emailDB'

_createEmails()

function query(filterBy = null) {
    const emails = _loadEmailsFromStorage()
    if (!filterBy) return Promise.resolve(emails)
    const filteredEmails = _getFilteredEmails(emails, filterBy)  
    return Promise.resolve(filteredEmails)
}

function _getFilteredEmails(emails, filterBy) {
    let { subject, ctg,readState } = filterBy
    const check = ctgFinder(ctg)
    const readBoolean = readState ==='read'? true : false
    subject = subject ? subject: '' 
    return emails.filter(email => {
        let isReadCheck = email.isRead===readBoolean
        if(readState==='all'||!readState) isReadCheck = true
        return (email.subject.includes(subject) && email[check] && isReadCheck )
    })
}

function ctgFinder(ctg) {
    if (ctg === 'inbox') {
        return 'from'
    }
    if (ctg === 'sent') {
        return 'to'
    }
    if (ctg === 'starred') {
        return 'isStarred'
    }
    if (ctg === 'all') {
        return 'id'
    }
}

function getEmailById(emailId) {
    const emails = _loadEmailsFromStorage()
    var email = emails.find(function (email) {
        return emailId === email.id
    })
    return Promise.resolve(email)
}

function _saveEmailsToStorage(emails) {
    storageService.saveToStorage(KEY, emails)
}

function _loadEmailsFromStorage() {
    return storageService.loadFromStorage(KEY)
}

function _createEmails() {
    let emails = _loadEmailsFromStorage()
    if (!emails || !emails.length) {
        emails = gDefaultEmails
        console.log('emails:', emails);

    }
    _saveEmailsToStorage(emails)
}

function removeEmail(emailId) {
    let emails = _loadEmailsFromStorage()
    emails = emails.filter(email => email.id !== emailId)
    _saveEmailsToStorage(emails)
    return Promise.resolve()
}

function sendEmail(email) {
    const emails = _loadEmailsFromStorage()
    email.id = utilService.makeId()
    email.isRead = true
    email.sentAt = Date.now()
    email.isStarred = false
    emails.unshift(email)
    _saveEmailsToStorage(emails)
    return Promise.resolve()

}

function emailRead(emailId) {
    const emails = _loadEmailsFromStorage()
    const readIdx = emails.findIndex(email=>{
        return email.id ===emailId
    })
    emails[readIdx].isRead = true
    _saveEmailsToStorage(emails)
    return Promise.resolve()
}

function emailStarred(emailId,starState) {
    const emails = _loadEmailsFromStorage()
    const readIdx = emails.findIndex(email=>{
        return email.id ===emailId
    })
    emails[readIdx].isStarred = starState
    _saveEmailsToStorage(emails)
    return Promise.resolve()
}

