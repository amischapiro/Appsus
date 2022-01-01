import { utilService } from "../../../services/util.service.js";
import { storageService } from "../../../services/storage.service.js";


const gDefaultEmails = [
    {
        id: utilService.makeId(),
        subject: 'we want you!',
        body: utilService.makeLorem(200),
        isRead: false,
        sentAt: Date.now(),
        from: 'hackeru@gmail.com',
        isStarred:false
    },
    {
        id: utilService.makeId(),
        subject: 'save us!',
        body: utilService.makeLorem(200),
        isRead: false,
        sentAt: Date.now(),
        from: 'timcook@apple.com',
        isStarred:false
    },
    {
        id: utilService.makeId(),
        subject: 'best student',
        body: utilService.makeLorem(200),
        isRead: false,
        sentAt: Date.now(),
        from: 'codingacademy@ca.com',
        isStarred:false
    },
    {
        id: utilService.makeId(),
        subject: 'come to us!',
        body: utilService.makeLorem(200),
        isRead: false,
        sentAt: Date.now(),
        from: 'jeffbezos@amazon.com',
        isStarred:false
    },
    {
        id: utilService.makeId(),
        subject: 'new tesla',
        body: utilService.makeLorem(200),
        isRead: false,
        sentAt: Date.now(),
        from: 'elonmusk@tesla.com',
        isStarred:false
    },
    {
        id: utilService.makeId(),
        subject: 'where are all of your friends?',
        body: utilService.makeLorem(200),
        isRead: false,
        sentAt: Date.now(),
        from: 'omeradam@gmail.com',
        isStarred:false
    },
    {
        id: utilService.makeId(),
        subject: 'we give up',
        body: utilService.makeLorem(200),
        isRead: false,
        sentAt: Date.now(),
        from: 'johnbryce@gmail.com',
        isStarred:false
    },
    {
        id: utilService.makeId(),
        subject: 'we give up',
        body: utilService.makeLorem(200),
        isRead: false,
        sentAt: Date.now(),
        from: 'johnbryce@gmail.com',
        isStarred:false
    },
    {
        id: utilService.makeId(),
        subject: 'our offer',
        body: utilService.makeLorem(200),
        isRead: false,
        sentAt: Date.now(),
        from: 'netcraft@gmail.com',
        isStarred:false
    },
    {
        id: utilService.makeId(),
        subject: 'where is you english from?',
        body: utilService.makeLorem(200),
        isRead: false,
        sentAt: Date.now(),
        from: 'jerusalempost@gmail.com',
        isStarred:false
    },
    {
        id: utilService.makeId(),
        subject: 'calling you',
        body: utilService.makeLorem(200),
        isRead: false,
        sentAt: Date.now(),
        from: 'eyal golan@gmail.com',
        isStarred:false
    },
    {
        id: utilService.makeId(),
        subject: 'hello its me',
        body: utilService.makeLorem(200),
        isRead: false,
        sentAt: Date.now(),
        from: 'adele@gmail.com',
        isStarred:false
    },
    {
        id: utilService.makeId(),
        subject: 'oops i did it again',
        body: utilService.makeLorem(200),
        isRead: false,
        sentAt: Date.now(),
        from: 'britneyspears@gmail.com',
        isStarred:false
    },
    {
        id: utilService.makeId(),
        subject: 'im gonna build a wall',
        body: utilService.makeLorem(200),
        isRead: false,
        sentAt: Date.now(),
        from: 'donaldtrump@me.com',
        isStarred:false
    },
    {
        id: utilService.makeId(),
        subject: 'vote for me!',
        body: utilService.makeLorem(200),
        isRead: false,
        sentAt: Date.now(),
        from: 'kanyewest2020@gmail.com',
        isStarred:false
    },
    {
        id: utilService.makeId(),
        subject: '24 ice cream flavours!',
        body: utilService.makeLorem(200),
        isRead: false,
        sentAt: Date.now(),
        from: 'hitecs@gmail.com',
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

function query(filterBy = null,sortBy) {
    let emails = _loadEmailsFromStorage()
    if(sortBy==='date'){
        emails.sort(function(x,y){
            return y.sentAt - x.sentAt
        })
    }
    if(sortBy==='subject'){
        emails.sort(function(a,b){
            if(a.subject<b.subject){
                return -1
            }
            if(a.subject>b.subject){
                return 1
            }
            return 0 
        })
    }
    if (!filterBy) return Promise.resolve(emails)
    const filteredEmails = _getFilteredEmails(emails, filterBy)  
    return Promise.resolve(filteredEmails)
}



function _getFilteredEmails(emails, filterBy) {
    let { subject, ctg,readState } = filterBy  
    const check = getCtg(ctg)
    const readBoolean = readState ==='read'? true : false    
    subject = subject ? subject: '' 
    return emails.filter(email => {
        let isReadCheck = email.isRead===readBoolean
        if(readState==='all'||!readState) isReadCheck = true  
        return (email.subject.includes(subject) && email[check] && isReadCheck )
    }) 
}

function getCtg(ctg) {
    if (ctg === 'inbox') {
        return 'from'
    }
    if (ctg === 'sent') {
        return 'to'
    }
    if (ctg === 'starred') {
        return 'isStarred'
    }
    if (ctg === 'all'||!ctg) {
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

function emailRead(emailId,readState) {
    
    const emails = _loadEmailsFromStorage()
    const readIdx = emails.findIndex(email=>{
        return email.id ===emailId
    })
    if(readState=== undefined) readState = true
    emails[readIdx].isRead = readState
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

