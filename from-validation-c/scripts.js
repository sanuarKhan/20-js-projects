// all elements for dom oparations

const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const passwordCon = document.getElementById('password-con');

const allInputArr = [username,email,password,passwordCon]

// all functions for action required

// showErro funtion 

function showError(input,message){
    const formControl = input.parentElement;
    formControl.className = 'form-control error';
    const small = formControl.querySelector('small');
    small.textContent = message;
}

// showSuccess function 

function showSuccess(input){
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}

// email checking

const checkEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      if(re.test(email.value.trim())){
        showSuccess(email)
      }else{
        showError(email, "Email is not valid");
      }
  };

  // check password matching

  function checkPasswordMatch( input1, input2){
    if(input1.value !== input2.value){
        showError(input2, 'password does not match')
    }
  }

  // check Length

  function checkLength(input,min,max){
    if(input.value.length < min){
        showError(input, `${getFieldName(input)} must be at least ${min} charecters`);
    } else if(input.value.length > max){
        showError(input, `${getFieldName(input)} must be less than ${max} charecters`);
    } else{
        showSuccess(input)
    }
  }
  // check required field 

  function checkRequired(inputArr){
    inputArr.map((input)=>{
        if(input.value.trim() === ''){
            showError(input, `${getFieldName(input)} is required`)
        } else{
            showSuccess(input)
        }
    })
  }

// get fieldname

function getFieldName(input){
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

form.addEventListener('submit', (e) =>{
    e.preventDefault()

    checkRequired(allInputArr);
    checkLength(username,3,15)
    checkLength(password,6,25)
    checkEmail(email)
    checkPasswordMatch(password,passwordCon);

})