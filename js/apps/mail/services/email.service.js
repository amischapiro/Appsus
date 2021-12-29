import { utilService } from "../../../services/util.service.js";
import { storageService } from "../../../services/storage.service.js";


const gDefaultEmails = [
    {id:utilService.makeId(),
    subject:'I hate react',
    body:utilService.makeLorem(50),
    isRead:false,
    sentAt:Date.now(),
    to:'jordi@gmail.com'
    },
    {id:utilService.makeId(),
    subject:'blah blah ',
    body:utilService.makeLorem(50),
    isRead:false,
    sentAt:Date.now(),
    to:'jordi@gmail.com'
    },
    {id:utilService.makeId(),
    subject:'coding academy',
    body:utilService.makeLorem(50),
    isRead:false,
    sentAt:Date.now(),
    to:'jordi@gmail.com'
    }

]

export const emailService ={
    query,
    getEmailById,

}

const KEY = 'emailDB'

_createEmails()

function query(filterBy = null){
    const emails = _loadEmailsFromStorage()
    if (!filterBy) return Promise.resolve(emails)
    const filteredEmails = _getFilteredEmails(emails,filterBy)
    console.log('filteredEmails:', filteredEmails);
    
    return Promise.resolve(filteredEmails)
}

function _getFilteredEmails(emails,filterBy){  
    let {subject} = filterBy
    return emails.filter(email=>{
        return email.subject.includes(subject) 
    })
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

function _createEmails(){
    let emails = _loadEmailsFromStorage()
    if(!emails||!emails.length){
        emails = gDefaultEmails
        console.log('emails:', emails);
        
    }
    _saveEmailsToStorage(emails)
}

