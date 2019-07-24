window.onload = () => {
    const emailRegex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    const passRegex = /^[a-z0-9_-]{6,18}$/;
    const form = document.getElementById("form-register");
    console.log(form);
    if (form) {

        form.addEventListener("submit", (event) => {
            event.preventDefault();
            console.log('hi');
            if (!form.username.value) {
                console.log('hello');
                renderErrorMessage('username-error-message', 'Please input username');
            } else {
                renderErrorMessage('username-error-message', '');
            }

            if (!form.email.value) {
                renderErrorMessage('email-error-message', 'Please input email');
            } else if (!emailRegex.test(form.email.value)) {
                renderErrorMessage('email-error-message', 'Invalid email address');
            } else {
                renderErrorMessage('email-error-message', '');
            }

            if (!form.password.value) {
                renderErrorMessage('password-error-message', 'Please input password');
            } else if (!passRegex.test(form.password.value)) {
                renderErrorMessage('password-error-message', 'Invalid password');
            } else {
                renderErrorMessage('password-error-message', '');
            }

            if (!form.repassword.value) {
                renderErrorMessage('repass-error-message', 'Please input confirm password');
            } else {
                if (form.repassword.value == form.password.value) {
                    renderErrorMessage('repass-error-message', '');
                } else {
                    renderErrorMessage('repass-error-message', 'Please input again confirm password');
                }
            }
        })
    }

    renderErrorMessage = (elementId, errorMessage) => {
        const element = document.getElementById(elementId);
        if (element) {
            element.innerText = errorMessage;
        }
    }

}