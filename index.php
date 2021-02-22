<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Регистрация</title>
    <link rel="stylesheet" href="./assets/styles/normalize.css">
    <link rel="stylesheet" href="./assets/styles/index.css">
</head>
<body>
    <div id="app">
        <button type="button" class="btn" id="signUp">
            Регистрация
        </button>
    </div>
    <div class="modal" id="signUpModal">
        <div class="content">
            <div class="modal-head">
                <h5 class="modal-title">Зарегистрироваться</h5>
            </div>
            <div class="modal-body">
                <form class="modal-form" id="modalForm" name="modalForm">
                    <div class="data-required-fields-warning">все поля обязательны</div>
                    <div class="data-is-everything-valid">Форма успешно заполнена</div>
                    <div class="form-group">
                        <div class="label-container">
                            <label for="name">Имя</label>
                            <span class="label-helper">Tолько кириллические буквы</span>
                        </div>
                        <input class="form-input" type="text" name="name" id="name" placeholder="Андрей" autocomplete="off">
                        <div class="data-max-length-warning">максимум 100 символов</div>
                        <div class="data-only-cyrillic-warning">только кириллические буквы</div>
                    </div>
                    <div class="form-group">
                        <div class="label-container">
                            <label for="phone">Телефон</label>
                            <span class="label-helper">Tолько цифры</span>
                        </div>
                        <input class="form-input" type="text" name="phone" id="phone" placeholder="+7(___)___-__-__" autocomplete="off">
                        <div class="data-max-length-warning">максимум 100 символов</div>
                        <div class="data-phone-number-warning">неправильный номер телефона</div>
                    </div>
                    <div class="form-group">
                        <div class="label-container">
                            <label for="email">Почта</label>
                            <span class="label-helper">Латинские буквы, цифры, символы</span>
                        </div>
                        <input class="form-input" type="text" name="email" id="email" placeholder="andreypopov@gmail.com" autocomplete="off">
                        <div class="data-max-length-warning">максимум 100 символов</div>
                        <div class="data-email-not-valid-warning">неправильный формат электронной почты</div>
                    </div>
                    <button type="submit" class="btn">
                        Отправить
                    </button>
                </form>    
            </div>
        </div>
    </div>
    <script src="./assets/scripts/index.js"></script>
    <noscript>
        <style>
            body {
                background:#fff;
                text-align:center;
            }

            body div:not(.no-script-warning) {
                display:none;
            }

        </style>
        <div class="no-script-warning">
            Пожалуйста, включите javascript в вашем браузере.   
        </div>
    </noscript>
</body>
</html>