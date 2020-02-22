const firstName = document.getElementById('firstName');
const lirstName = document.getElementById('lirstName');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirmPassword');
const email = document.getElementById('email');

const form = document.getElementById('myForm');

const green = '#008000';
const red = '#FF0000';

form.addEventListener('submit', function(event){
    event.preventDefault();
    if(
        validateFirstName() && 
        validateLastName() && 
        validatePassword() && 
        validateConfirmPassword() && 
        validateEmail()
    ){
        const name = firstName.value;
        const container = document.querySelector('div.container');
        const loader = document.createElement('div');
        loader.className = 'progress';
        const loadingBar = document.createElement('div');
        loadingBar.className = 'indeterminate';
        loader.appendChild(loadingBar);
        container.appendChild(loader);
        setTimeout(function(){
            const loaderDiv = document.querySelector('div.progress');
            const panel = document.createElement('div');
            panel.className = 'card-panel green';
            const text = document.createElement('span');
            text.appendChild(
                document.createTextNode(
                    `Pomyślnie zalogowano. Witaj w Authorizer ${name}.`
                )
            );
            panel.appendChild(text);
            container.replaceChild(panel, loaderDiv);
        }, 1000)
    }
    
    
});

function validateFirstName(){
    if(checkIfEmpty(firstName)) return;

    if(!checkIfOnlyLetters(firstName)) return;
    return true;


}
function validateLastName(){
    if(checkIfEmpty(lastName)) return;

    if(!checkIfOnlyLetters(lastName)) return;
    return true;


}function validatePassword(){
    if(checkIfEmpty(password)) return;

    if(!checkLength(password,4,50)) return;

    if(!containsChars(password,1)) return;

    return true;


}function validateConfirmPassword(){
    if(password.className !== 'valid'){
        setInvalid(confirmPassword, 'Hasło jest błędne');
        return;
    } 
    if(password.value !== confirmPassword.value) {
        setInvalid(confirmPassword, 'Hasła są różne.');
        return;
    }else{
        setValid(confirmPassword);
    }
    return true;


}function validateEmail(){
    if(checkIfEmpty(email)) return;

    if(!containsChars(email,5)) return;
    
    return true;


}

function checkIfEmpty(field){
    if(isEmpty(field.value.trim())){
        setInvalid(field, `${field.name} nie może być puste`)
        return true;
    }else{ 
        setValid(field);
        return false;
    }
}

function isEmpty(value){
    if(value === '') return true;
    return false;
}

function setInvalid(field, message){
    field.className = 'invalid';
    field.nextElementSibling.innerHTML = message;
    field.nextElementSibling.style.color = red;
}

function setValid(field, message){
    field.className = 'valid';
    field.nextElementSibling.innerHTML = '';
    //field.nextElementSibling.style.color = red;
}

function checkIfOnlyLetters(field){
    if(/^[a-zA-Z ]+$/.test(field.value)){
        setValid(field);
        return true;
    }else{
        setInvalid(field, `${field.name} musi zawierać wyłącznie litery`);
        return false;
    }
}

function checkLength(field, min, max){
    if(field.value.length >= min && field.value.length < max){
        setValid;
        return true;
    }else if(field.value.length < min){
        setInvalid(field, `${field.name} musi zawierać conajmniej ${min} znaków`)
        return false;
    }else{
        setInvalid(field, `${field.name} musi zawierać mniej niż ${max} znaków`)
    }

}
function containsChars(field, text){
    let regEx;
    switch(text){
        case 1:
            regEx = /(?=.*[a-zA-Z])/;
            return regExChecker(regEx, field, `${field.name} musi zawierać conajmniej jedną literę`)
        case 2:
            regEx = /(?=.*\d)(?=.*[a-zA-Z])/;
            return regExChecker(regEx, field, `${field.name} musi zawierać conajmniej jedną literę i jedną cyfre`)
        case 3:
            regEx = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/;
            return regExChecker(regEx, field, `${field.name} musi zawierać conajmniej jedną wielką literę, jedną małą literę i jedną cyfre`)
        case 4:
            regEx = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/;
            return regExChecker(regEx, field, `${field.name} musi zawierać conajmniej jedną wielką literę, jedną małą literę, jedną cyfre i jeden znak specjalny`)
        case 5:
            regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return regExChecker(regEx, field, `${field.name} jest błędny`)
        default:
            return false;
            
            

    }
}

function regExChecker(regEx, field, message){
    if(field.value.match(regEx)){
        setValid(field);
        return true;
    }else {
        setInvalid(field, message);
        return false;
    }
}