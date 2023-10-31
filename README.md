## Тестовое задание.
#### Список постов с бесконечным скроллом и виртуализацией. 

----

## Архитектура проекта

Проект написан в соответствии с методологией Feature sliced design

Ссылка на документацию - [Feature sliced design](https://feature-sliced.design/docs/get-started/tutorial)

---

## Запуск проекта

```
npm install - устанавка зависимостей.
npm run start - запуск Development сервера.
npm run build - создание билда.
```

### Маршрутизация

Используется React Router DOM 6.

Конфигурация роутов - [router](src/app/providers/router)

---
### Работа с данными
Данные берутся с [JSON Placeholder](https://jsonplaceholder.typicode.com/).

Взаимодействие с данными осуществляется с помощью [Redux toolkit](https://redux-toolkit.js.org/).

Запросы на сервер отправляются с помощью [RTK query](https://redux-toolkit.js.org/rtk-query/overview).

---
### Деплой проекта

Проект задеплоен на - [Netlify](https://fascinating-zabaione-18847c.netlify.app/) 

---
