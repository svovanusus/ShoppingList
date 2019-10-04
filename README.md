# Основное описание
## База данных
Для того, чтобы проект запустился, необходимо установить базу данных. В данном проекте используется БД **PostgreSQL**, которую можно скачать и установить с официального сайта: [www.postgresql.org](https://www.postgresql.org/download/).
## Запуск проекта
Первым делом необходимо установить node.js, если он ещё не установлен. Его можно скачать и установить с официального сайта: [nodejs.org](https://nodejs.org/en/download/)
Следом за этим нужно скачать этот проект, либо склонировать его:
```bash
git clone https://github.com/svovanusus/ShoppingList.git
```
Далее нужно скорректировать подключение к БД. Для этого нужно открыть файл: /app/database.js и в строке подключения подставить нужные данные - адреса, имени пользователя, пароля и имени базы данных.
После чего, необходимо открыть проект в какой-либо среде, например Visual Studio Code, и в консоли прописать команду:
```powershell
npm install
```
Как только все необходимые зависимости подгрузятся, проект можно запускать:
```powershell
npm run start
```
Если всё было настроено правильно, то сервер запустится по адресу: http://localhost:3000. Можно открыть этот адрес в браузере и использовать сервис.