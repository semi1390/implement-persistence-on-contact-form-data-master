// provide the validation code here

//date disbale for less 18
var date = new Date();
var tdate = date.getDate();
var month = date.getMonth() + 1;
var year = date.getFullYear() - 18
if(tdate < 10){
    month = '0' + tdate;
}
if(month < 10){
    month = '0' + month
}
var maxdate = year + "-" + month + "-" + tdate ;
document.getElementById('birthdate').setAttribute('max', maxdate)


//submit handler
const submitContact = (event) =>{
    // event.preventDefault()

    let contactForm = document.getElementById('contactForm');
    let contact = Object.fromEntries(new FormData(contactForm))
    // console.log(contact);

    let result = validateData(contact)
    return result;
}
const validateData = (contact) => {
    //error object captures all th validation errors
    let error = {
        firstNameError: validatefirstname(contact.firstname),
        lastNameError: validatelastname(contact.lastname),
        emailError : validateEmail(contact.email),
        homeNoError: validatehomeNo(contact.homeNo),
        workNoError: validateworkNo(contact.workNo),
        birthdateError: validateInput(contact.birthdate, 'birthdate'),
        companyError:  '',
        jobTitleError: '',
        notesError: validatenotes(contact.notes)
    }
    //filter out empty error msg for excluding them from error summary
    let errorMessages = Object.values(error).filter(e => e !== '');
    console.log(errorMessages)

    //display validation summary with error messages
    // displayValidationSummary(errorMessages);

     //if no errors, push the contact to contacts array
    if(errorMessages.length === 0){
        persistSubmittedContact(contact);
        alert("feedback Submitted");
        Location.reload()
        return true 
    }
    else {
        displayValidationSummary(errorMessages);
        displayIndividualErrorMesssages(error);
        return false;
    }
}

//function to display validation summary with error messages provided
function displayValidationSummary(errorMessages){
    document.getElementsByTagName('ul')[0].innerHTML = errorMessages.map(e => `<li>${e}</li>`)
    .join('');
}

//function to display error messages alongside the input fields
function displayIndividualErrorMesssages(errorMessages){
    let smallElements = document.getElementsByTagName('small');

    [...smallElements].forEach((element) => {
        element.innerText = errorMessages[element.id]
    });

}

//validation for empty input
const isEmpty = value => value === ''|| value === undefined || value === null ;
const validateInput = (value , fieldName) => isEmpty(value) ? `${fieldName} cannot be blank`: '';

//function to validate firstName
const validatefirstname = (firstname) => {
    let validRegex = "[a-zA-Z][a-zA-Z ]+[a-zA-Z]$" ;
    let firstNameError = validateInput(firstname, "First name");
    return firstNameError !== '' ? firstNameError : !firstname.match(validRegex) ? " FirstName can contain only alphabets" : '';

}

//function to validate lastName
const validatelastname = (lastname) => {
    let validRegex = "[a-zA-Z][a-zA-Z ]+[a-zA-Z]$" ;
    let lastNameError = validateInput(lastname, "last name");
    return lastNameError !== '' ? lastNameError : !lastname.match(validRegex) ? "lastName can contain only alphabets" : '';

}

//function to validate email
const validateEmail = (email) => {
    let validRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;

    let emailError = validateInput(email ,"Email");
    return emailError !== ''? emailError : !email.match(validRegex) ? "invalid Email": '';
}

//function to validate home no
const validatehomeNo = (homeNo) => {
    // pattern of 099999999999
    let validRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    let homeNoError = validateInput(homeNo, "Home No");

    return homeNoError !== '' ? homeNoError : !homeNo.match(validRegex) ? "Home Contact Number is invalid" : '';
}

//function to validate work no
const validateworkNo = (workNo) => {
    // pattern of 099999999999
    let validRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    let workNoError = validateInput(workNo, "Home No");

    return workNoError !== '' ? '' : !workNo.match(validRegex) ? "Work Contact Number is invalid" : '';
}

//function to validate notes
const validatenotes = (notes) => {
    let notesError = validateInput(notes , "notes");

    return notesError !== '' ? '' : notes.length > 200 ? 'notes should contain maximum 200 charater' : '';
}


