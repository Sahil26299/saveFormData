
function isNameValid() {
    var uname = document.getElementById('exampleInputName1').value;
    var num = /[0-9]/g;
    var spl_char = /[\!\@\#\$\%\^\&\*\)\(\+\=\.\<\>\{\}\,\/\\\?\[\]\:\;\'\"\|\~\`\_\-]/g;
    if (uname.length < 3 || uname.match(num) || uname.match(spl_char)) {
        document.getElementById('NameHelp').style.color = 'tomato';
        document.getElementById('NameHelp').innerHTML = 'Please enter a valid name!';
        document.getElementById('exampleInputName1').style.border = '2px solid tomato';
        return false;
    }
    else {
        document.getElementById('NameHelp').style.color = 'green';
        document.getElementById('exampleInputName1').style.border = '2px solid green';
        document.getElementById('NameHelp').innerHTML = 'Looks Good!';
        return true;
    }
}

function displayErrorBirthDate(){
    let birthDate = document.getElementById('exampleInputBirthDate1').value;
    let dob = new Date(birthDate);
    let currentDate = new Date();
    if(!birthDate){
        document.getElementById('BirthDateHelp').innerHTML= 'Please enter your birth date!';
        document.getElementById('exampleInputBirthDate1').style.border = '1px solid tomato';
        return false;
    }
    else if(dob>currentDate){
        document.getElementById('BirthDateHelp').innerHTML= 'Birthdate cannot be a future date!';
        document.getElementById('exampleInputBirthDate1').style.border = '1px solid tomato';
        return false;
    }
    else{
        document.getElementById('BirthDateHelp').innerHTML = '';
        document.getElementById('exampleInputBirthDate1').style.border = '1px solid white';
        return true;
    }
}

function isEmailValid() {
    var email = document.getElementById('exampleInputEmail1').value;
    if (isValidationEmail(email)) {
        document.getElementById('emailHelp').innerHTML = '';
        document.getElementById('exampleInputEmail1').style.border = '2px solid green';
        return true;
    }
    else {
        document.getElementById('emailHelp').innerHTML = 'Please enter the valid email!';
        document.getElementById('exampleInputEmail1').style.border = '2px solid tomato';
        return false;
    }
}
function isValidationEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (email === "" || email === "undefined") {
        return false;
    }
    return re.test(String(email).toLowerCase());
}

function isAddresValid() {
    var address = document.getElementById('exampleFormControlTextarea1').value;
    if (address) {
        document.getElementById('exampleFormControlTextarea1').style.border = '2px solid green';
        document.getElementById('addressHelp').innerHTML = '';
        return true;
    }
    else {
        document.getElementById('exampleFormControlTextarea1').style.border = '2px solid tomato';
        document.getElementById('addressHelp').innerHTML = 'Please enter your address!';
        return false;
    }
}

function isPhoneValid() {
    var ph_num = document.getElementById('exampleInputPhNumber').value;
    if (ph_num.length == 10) {
        document.getElementById('exampleInputPhNumber').style.border = '2px solid green';
        document.getElementById('phoneNumberHelp').innerHTML = '';
        return true;
    }
    else {
        document.getElementById('exampleInputPhNumber').style.border = '2px solid tomato';
        document.getElementById('phoneNumberHelp').innerHTML = 'Please enter valid phone number!';
        return false;
    }
}
var gender = null;
function isGenderEntered() {
    if (document.getElementById('flexRadioDefault1').checked) {
        gender = document.getElementById('flexRadioDefault1').value;
    }
    else if (document.getElementById('flexRadioDefault2').checked) {
        gender = document.getElementById('flexRadioDefault2').value;
    }
    else if (document.getElementById('flexRadioDefault3').checked) {
        gender = document.getElementById('flexRadioDefault3').value;
    }
    if (gender != null) {
        document.getElementById('genderHelp').innerHTML = '';
        return true;
    }
    else {
        document.getElementById('genderHelp').innerHTML = 'Required field!';
        return false;
    }
}

var array = [];
function removeData(index) {
    array.splice(index, 1);
    displayTable();
}



function allValid() {
    var uname = document.getElementById('exampleInputName1').value;
    var email = document.getElementById('exampleInputEmail1').value;
    var address = document.getElementById('exampleFormControlTextarea1').value;
    var ph_num = document.getElementById('exampleInputPhNumber').value;
    var dob = document.getElementById('exampleInputBirthDate1').value;
    if (isGenderEntered() && isNameValid() && isEmailValid() && isAddresValid() && isPhoneValid() && displayErrorBirthDate()) {
        if (array.length > 0) {

            if(checkEmailDub(email) !== undefined || checkMobileDub(ph_num) !== undefined){
                document.getElementById('registerHelp').innerHTML = 'User already exists!';
            }else{
                document.getElementById('registerHelp').innerHTML = '';
                array.push({ name: uname, email: email, address: address, mobile: ph_num, gender: gender, Birthdate:dob });
                displayTable();
                return true;
            }

            // for (i = 0; i < array.length; i++) {
            //     if (email == array[i].email || ph_num == array[i].mobile) {
            //         document.getElementById('registerHelp').innerHTML = 'User already exists!';
            //         return false;
            //     }

            // }
            // for (i = 0; i < array.length; i++) {
            //     if (email != array[i].email && ph_num != array[i].mobile) {
            //         array.push({ name: uname, email: email, address: address, mobile: ph_num, gender: gender });
            //         document.getElementById('registerHelp').innerHTML = '';
            //         displayTable();
            //         return true;
            //     }
            // }
        }
        else {
            array.push({ name: uname, email: email, address: address, mobile: ph_num, gender: gender, Birthdate:dob });
            displayTable();
            return true;
        }
    }
    else {
        isNameValid();
        displayErrorBirthDate()
        isEmailValid();
        isAddresValid();
        isPhoneValid();
        isGenderEntered();
        return false;
    }
}

function checkEmailDub(email) {
    var res = array.find(element => element.email == email);
    return res;
}

function checkMobileDub(mobile) {
    var res = array.find(element => element.mobile == mobile);
    return res;
}

function displayTable() {
    var strHTML = ``;
    for (let index = 0; index < array.length; index++) {
        const element = array[index];
        strHTML += `<tr>`;
        strHTML += `<td>${index + 1}</td>`;
        strHTML += `<td>${element.name}</td>`;
        strHTML += `<td>${element.Birthdate}</td>`;
        strHTML += `<td>${element.email}</td>`;
        strHTML += `<td>${element.address}</td>`;
        strHTML += `<td>${element.mobile}</td>`;
        strHTML += `<td>${element.gender}</td>`;
        strHTML += `<td> <button type="button" class="btn btn-danger" onclick="removeData(${index})">Remove</button></td>`;
        strHTML += `<tr>`;
    }
    document.getElementById("tbody").innerHTML = strHTML;
    return true;
}

