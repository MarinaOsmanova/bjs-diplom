'use strict';

let userForm = new UserForm();

userForm.loginFormCallback = data => {
    ApiConnector.login(
        data,
        response => {
            console.log(response); // Посмотрите в консоли, какой объект возвращает сервер
            if (response.success) {
                location.reload();
            } else {
                userForm.setLoginErrorMessage(response.data);
            }
        }
    );
};

userForm.registerFormCallback = data => {
    ApiConnector.register(
        data,
        response => {
            console.log(response);
            if (response.success) {
                location.reload();
            } else {
                userForm.setRegisterErrorMessage(response.data);
            }
        }
    );
}