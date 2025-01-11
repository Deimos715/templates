var id = window.Telegram.WebApp.initDataUnsafe.user.id;
window.Telegram.WebApp.expand();
// var id = 6045648429;
var apiUrl = '/get_user_info/' + id;
var money, clickGain, autoGain, autoClickerCost, autoClickEnable, interval;

var element = {
    clicker: document.getElementById("main-clicker"),
    money: document.getElementById("money"),
    autoClickerBtn: document.getElementById("autoClickerBtn"),
};

// Функция для инициализации значений при загрузке страницы


function addMoney() {
    money += clickGain;
}

function updateMoney() {
    element.money.innerHTML = "$" + formatMoney(money);
    checkAutoClicker();
	
}

function formatMoney(amount) {
    const abbreviations = ['', 'K', 'M', 'B', 'T'];
    let index = 0;
    while (amount >= 1000 && index < abbreviations.length - 1) {
        amount /= 1000;
        index++;
    }
    return amount.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 }) + abbreviations[index];
}

function activateAutoClicker() {
    if (money >= autoClickerCost) {
        money -= autoClickerCost;
		autoClickEnable = 1;
        autoGain += 50; // Увеличиваем количество кликов за каждый клик кнопки
        autoClickerCost += 5000 ; // Увеличиваем стоимость кнопки на 5000
        updateMoney();
        element.autoClickerBtn.disabled = true;
        autoMoney(1);
        updateAutoClickerBtnText();
		sendDataToServer()
    }
}

function checkAutoClicker() {
    element.autoClickerBtn.disabled = money < autoClickerCost;
}

function updateAutoClickerBtnText() {
    element.autoClickerBtn.textContent = "Автокликер ($" + autoClickerCost.toLocaleString() + ")";
	
}

element.clicker.onclick = function () {
    element.clicker.disabled = true;
    this.classList.add("clicked");
    addMoney();
    updateMoney();
    element.clicker.disabled = false;
	sendDataToServer()
    setTimeout(() => {
        this.classList.remove("clicked");
    }, 150);
};
// ... (ваш существующий код)

function sendDataToServer() {
    fetch('/send_click_info', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ clickGain: autoGain, money: money, id: id }),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Сервер ответил:', data);
    })
    .catch(error => {
        console.error('Ошибка при отправке данных на сервер:', error);
    });
}



function initializeUserData(data) {
    console.log('Данные пользователя получены:', data);
    money = parseInt(data.money);
    clickGain = 20;
    autoGain = parseInt(data.clickGain);
    autoClickerCost = 5000 * autoGain/50;
    autoClickEnable = data.autoClickEnable;
	console.log(autoClickEnable)
	if (autoClickEnable == true) {
        autoMoney(1);
    }

    updateMoney();
    updateAutoClickerBtnText();
	setInterval(() => {
		sendDataToServer();
	}, 5000);
}

// Запрос данных при загрузке страницы
fetch(apiUrl)
    .then(response => response.json())
    .then(initializeUserData)
    .catch(error => {
        alert(error);
        console.error('Ошибка при получении данных о пользователе:', error);
    });

// Запускаем отправку данных каждые 5 секунд
function autoMoney(amount) {
    console.log("meow");
    clearInterval(interval);
    interval = setInterval(function () {
        money += autoGain;
        console.log("Auto Money:", money); // Добавьте эту строку
        updateMoney();
    }, 200 / amount);
}