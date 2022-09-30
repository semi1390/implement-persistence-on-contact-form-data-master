// Provide persistence solution code here
const persistSubmittedContact = (contact) => {
    let xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:3000/contacts');
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify(contact));
    xhr.onload = () =>{
        if(xhr.status === 201)
        console.log('data added successfully')
        else {
            console.log('operation failed')
        }
    }

}

// Code to show the persisted data
const showPersistedData = () => {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://localhost:3000/contacts');
    xhr.send();
    xhr.onload = () =>{
        let response = JSON.parse(xhr.response);
        console.log(response)
        let responseBlock = document.createElement('div');
        responseBlock.innerHTML = response.map(r => `<li>${r.firstname} - ${r.lastname} </li>`);
        let demodiv = document.getElementById('container');
        demodiv.appendChild(responseBlock)
    }

 
}

module.exports = { persistSubmittedContact, showPersistedData }
