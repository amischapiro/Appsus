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
        to: null
    },
    {
        id: utilService.makeId(),
        subject: 'blah blah ',
        body: utilService.makeLorem(50),
        isRead: false,
        sentAt: Date.now(),
        from: 'jordi@gmail.com',
        to: null
    },
    {
        id: utilService.makeId(),
        subject: 'coding academy',
        body: utilService.makeLorem(50),
        isRead: false,
        sentAt: Date.now(),
        from: 'jordi@gmail.com',
        to: null
    }

]

export const emailService = {
    query,
    getEmailById,
    removeEmail,
    sendEmail,
    emailRead

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
    let { subject, ctg } = filterBy
    const check = ctgFinder(ctg)
    subject = subject ? subject: ''
    return emails.filter(email => {
        return (email.subject.includes(subject) && !email[check])
    })
}

function ctgFinder(ctg) {
    if (ctg === 'inbox') {
        return 'to'
    }
    if (ctg === 'sent') {
        return 'from'
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
    console.log('email:', email);

    const emails = _loadEmailsFromStorage()
    email.id = utilService.makeId()
    email.isRead = true
    email.from = null
    email.sentAt = Date.now()
    emails.unshift(email)
    _saveEmailsToStorage(emails)
    return Promise.resolve()

}

function emailRead(emailId) {
    const emails = _loadEmailsFromStorage()
    const email = getEmailById(emailId)
    emails.map(currEmail => {
        if (emailId === currEmail.id) {
            currEmail.isRead = true
            return email
        }
        return email
    })
    _saveEmailsToStorage(emails)
    return Promise.resolve()
}