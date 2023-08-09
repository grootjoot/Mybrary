const form = {
    username: document.querySelector("#username"),
    email: document.querySelector("#email"),
    password: document.querySelector("#password"),
    submit: document.querySelector("#submit"),
    messages: document.querySelector(".form__input--error-message")
}

function id(idName) {
    return document.getElementById(idName);
  }

function setFormMessage(formElement, type, message) {
    const messageElement = formElement.querySelector('.form__message');

    messageElement.textContent = message;
    messageElement.classList.remove('form__message--success', 'form__message--error');
    messageElement.classList.add(`form__message--${type}`);
}

function setInputError(inputElement, message) {
    inputElement.classList.add('form__input--error');
    inputElement.parentElement.querySelector('.form__input--error-message').textContent = message;
}

function clearInputError(inputElement) {
    inputElement.classList.remove('form__input--error');
    inputElement.parentElement.querySelector('.form__input--error-message').textContent = '';
}

var check = function() {
    if (document.querySelector('#addpassword').value == document.querySelector('#confirmpwd').value) {
        document.querySelector('#message').style.color = `var(--success-clr)`
        document.querySelector('#message').textContent = 'Passwords match!';
        checkPass();
    } else {
        document.querySelector('#message').style.color = `var(--error-clr)`
        document.querySelector('#message').textContent = 'Passwords do not match!';
        checkPass();
    }
};

function checkPass() {
    if (document.querySelector('#message').textContent == 'Passwords match!') {
        document.querySelector('#createSubmit').disabled = false;
    } else {
        document.querySelector('#createSubmit').disabled = true;
    }
};

function submitRequest() {
    let url = 'http://127.0.0.1:3000/login.html';
        let params = new FormData(id('login'));

        fetch(url, {method: "POST", body: params })
          //.then(statusCheck)
          .then(resp => resp.text())
          //.then(showResponse)
          //.catch(handleError);
}

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.querySelector("#login");
    const createAccountForm = document.querySelector("#createAccount");

    document.querySelector('#linkCreateAccount').addEventListener('click', e => {
        e.preventDefault();
        loginForm.classList.add('form--hidden');
        createAccountForm.classList.remove('form--hidden');
    });

    document.querySelector('#linkLogin').addEventListener('click', e => {
        e.preventDefault();
        createAccountForm.classList.add('form--hidden');
        loginForm.classList.remove('form--hidden');
    });

    loginForm.addEventListener('submit', e => {
        e.preventDefault();
        submitRequest();

        /*fetch(login, {
            method: 'POST',
            headers: {
                Accept: 'application/json, text/plain,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: form.username.value,
                password: form.password.value,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                if (data.error) {
                    alert('Invalid Username or Password');
                } else {
                    window.open(
                        'target.html'
                    );
                }
            })
            .catch((err) => {
                console.log(err);
                //form.messages.innerHTML = err.message;
            });*/

        //PERFORM AJAX/Fetch LOGIN
        //setFormMessage(loginForm, "error", "Invalid username/password combination!");
    });

    document.querySelectorAll('.form__input-username').forEach(inputElement => {
        inputElement.addEventListener('blur', e => {
            if (e.target.value.length > 0 && e.target.value.length < 6) {
                setInputError(inputElement, 'Username must be at least 6 characters in length')
            }
        });

        inputElement.addEventListener('input', e => {
            clearInputError(inputElement);
        });
    });

    document.querySelectorAll('.form__input-pwd').forEach(inputElement => {
        inputElement.addEventListener('blur', e => {
            if (e.target.value.length > 0 && e.target.value.length < 8) {
                setInputError(inputElement, 'Password must be at least 8 characters in length')
            }
        });

        inputElement.addEventListener('input', e => {
            clearInputError(inputElement);
        });
    });
});