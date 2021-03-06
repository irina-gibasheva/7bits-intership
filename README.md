Задание
-------

Абстрактно задание можно сформулировать так:

>Есть поезд, состоящий из некоторого количества вагонов. Вы находитесь в одном из них. Это очень странный поезд, потому что его вагоны сцеплены в кольцо. В каждом вагоне есть лампочка, которую вы можете включать и выключать. Ваша задача заключается в том, чтобы определить количество вагонов в поезде. Напишите алгоритм решения этой задачи.
В общем, состояние поезда — это только лампочки. Начальное состояние поезда неизвестно, то есть изначально какие-то лампочки могут гореть, а какие-то не гореть. Единственный способ узнать, горит ли лампочка в определенном вагоне — это войти в него и посмотреть.

Для вас написан HTTP сервер (http://frontend-internship.7bits.it/), реализующий API общения с поездом.

Описание API:
-------------

Все методы возвращают JSON. Успешность выполненного запроса можно понять по значению поля success. Если оно false, то причину можно понять по полю message.

POST :key/train                создать новый поезд (если поезд уже существует, пересоздать его), ответ {success: true}
POST :key/train/length/148     создать новый поезд с заданным количеством вагонов (для тестов), ответ {success: true}
GET :key/train/state           состояние освещения текущего вагона, ответ {success: true, state: true/false}
POST :key/train/turn-on        включить свет в вагоне, ответ {success: true}
POST :key/train/turn-off       выключить свет в вагоне, ответ {success: true}
POST :key/train/next           идем в следующий вагон, ответ {success: true}
POST :key/train/previous       идем в предыдущий вагон, ответ {success: true}
GET :key/train/check/42        проверить длину поезда (вместо 42 можно подставить любое число), ответ {success: true, answer: true/false}

Параметр :key это ваш индивидуальный секретный ключ. Вам его выдадут вместе с заданием.
Обычный воркфлоу выглядит так:
1. Создаете поезд
2. Ходите по нему, включаете, выключаете, считаете
3. Проверяете ответ
4. Создаете новый поезд и так по кругу

Шаблон приложения уже создан. Мы использовали библиотеку jQuery.
Поместите свой код в файл main.js, заменив реализацию функции algorithm своей.
Помните, что серверное время это дефицитный ресурс, поэтому закидывать его большим количеством запросов - плохая идея. Оптимизируйте свой алгоритм.
Для примера уже реализованы функции create_train и check_prediction. Никто не заставляет вас писать всю логику в одной функции algorithm, можно добавлять новые.
Чтобы увидеть интерфейс откройте файл html/index.html в браузере (мы тестировали в chrome).
После того, как реализуете алгоритм его можно запускать кнопкой Run my algorithm. После того как ваш алгоритм отработает вы увидите сообщение.
Дебажить JS код очень удобно используя DevTools в Google Chrome браузере. Чтобы открыть DevTools откройте браузер Правая кнопка мыши на странице -> Inspect Element.
Чтобы увидеть ваш JS откройте html/index.html с активным DevTools, зайдите во вкладку Sources и в дереве слева найдите файл main.js. После этого вы можете ставить точки остановок в вашем коде.

Вопросы:
1. Как видите уже с 10 вагонным поездом алгоритм работает довольно долго. В чем состоят основные временные затраты?
2. Как можно улучшить API, чтобы уменьшить время выполнения алгоритма?
3. Почему в нашем случае мы используем опцию async: false функции ajax?
4. Можете ли вы пояснить значение опции
  xhrFields: {
    withCredentials: true
  }
  ajax функции?


Свои решения присылайте на почту архивом (имя архива - ваша фамилия латинскими буквами).
Ваши ответы на вопросы поместите в файл answers.txt в корень приложения.