'use strict';

// Выход из личного кабинета

let logoutButton = new LogoutButton();

logoutButton.action = () => {
    ApiConnector.logout(
        response => {
            if (response.success) {
                location.reload();
            }
        }
    );
};

// Получение информации о пользователе

ApiConnector.current(
    response => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
        }
    }
);

// Получение текущих курсов валют

let ratesBoard = new RatesBoard();

function getRates() {
    ApiConnector.getStocks(
        response => {
            if (response.success) {
                ratesBoard.clearTable();
                ratesBoard.fillTable(response.data);
            }
        }
    );
}

getRates();
setInterval(getRates, 60000);

// Операции с деньгами

let moneyManager = new MoneyManager();

// Пополнение баланса

moneyManager.addMoneyCallback = data =>  {
    ApiConnector.addMoney(
        data,
        response => {
            if (response.success) {
               ProfileWidget.showProfile(response.data);
               moneyManager.setMessage(false, 'Баланс успешно пополнен');
            } else {
                moneyManager.setMessage(true, response.data);
            }
        }
    );
};

// Реализуйте конвертирование валюты:

moneyManager.conversionMoneyCallback = data =>  {
    ApiConnector.convertMoney(
        data,
        response => {
            if (response.success) {
               ProfileWidget.showProfile(response.data);
               moneyManager.setMessage(false, 'Конвертация успешно завершена');
            } else {
                moneyManager.setMessage(true, response.data);
            }
        }
    );
};

// Реализуйте перевод валюты

moneyManager.sendMoneyCallback = data =>  {
    ApiConnector.transferMoney(
        data,
        response => {
            if (response.success) {
               ProfileWidget.showProfile(response.data);
               moneyManager.setMessage(false, 'Перевод валюты успешно завершен');
            } else {
                moneyManager.setMessage(true, response.data);
            }
        }
    );
};

// Работа с избранным

let favoritesWidget = new FavoritesWidget();

// Запросите начальный список избранного

ApiConnector.getFavorites(
    response => {
        if (response.success) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            moneyManager.updateUsersList(response.data);
        }
    }
);

// Реализуйте добавления пользователя в список избранных

favoritesWidget.addUserCallback = data => {
    ApiConnector.addUserToFavorites(
        data,
        response => {
            if (response.success) {
                favoritesWidget.clearTable();
                favoritesWidget.fillTable(response.data);
                moneyManager.updateUsersList(response.data);
                moneyManager.setMessage(false, 'Пользователь успешно добавлен в список избранных');
            } else {
                moneyManager.setMessage(true, response.data);
            }
        }
    );
}

// Реализуйте удаление пользователя из избранного

favoritesWidget.removeUserCallback = data => {
    ApiConnector.removeUserFromFavorites(
        data,
        response => {
            if (response.success) {
                favoritesWidget.clearTable();
                favoritesWidget.fillTable(response.data);
                moneyManager.updateUsersList(response.data);
                moneyManager.setMessage(false, 'Пользователь был удалён из списока избранных');
            } else {
                moneyManager.setMessage(true, response.data);
            }
        }
    );
}