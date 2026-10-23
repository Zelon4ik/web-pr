# Практична робота №4: Розроблення REST-ендпоінтів засобами NestJS

**Тема:** Розроблення REST-ендпоінтів засобами NestJS  
**Варіант:** №8 — **Квитки на події** (`/tickets`)  
**Специфічні поля DTO:** `title`, `price`, `venue`, `sector`, `seatNumber`  
**Студент:** Виконано в повному обсязі (Рівні 1, 2, 3)

---

## 📋 Зміст
1. [Опис проєкту](#опис-проєкту)
2. [Архітектура та структура проєкту](#архітектура-та-структура-проєкту)
3. [Інструкція із запуску та тестування](#інструкція-із-запуску-та-тестування)
4. [Специфікація REST API ендпоінтів](#специфікація-rest-api-ендпоінтів)
5. [Результати тестування (HTTP Logs & Output)](#результати-тестування-http-logs--output)
6. [Модульне тестування (Unit Tests)](#модульне-тестування-unit-tests)
7. [Відповіді на контрольні питання](#відповіді-на-контрольні-питання)

---

## 📖 Опис проєкту

Проєкт є серверним застосунком на базі сучасного прогресивного TypeScript-фреймворку **NestJS**, що реалізує повнофункціональний RESTful API для управління ресурсом **"Квитки на події" (Tickets)** інтернет-магазину / сервісу бронювання.

У проєкті реалізовано:
* **Рівень 1 (Базовий):** 
  - Ініціалізація проєкту через `@nestjs/cli` зі строгим режимом TypeScript.
  - Генерація контролера `TicketsController` через CLI та автореєстрація в `AppModule`.
  - Створення строгих контрактів DTO: `CreateTicketDto` та `UpdateTicketDto`.
  - Базові методи обробки запитів.
* **Рівень 2 (Повний CRUD & DI):**
  - Створення сервісу `TicketsService` з in-memory сховищем (`Ticket[]`).
  - Реалізація методів CRUD: `findAll`, `findOne`, `create`, `update`, `remove`.
  - Ін'єкція залежностей через параметризований конструктор (`Constructor Injection`).
  - Обробка помилок та генерація виключень `NotFoundException` (HTTP 404).
  - Явне налаштування HTTP-статусів: `201 Created` для POST, `204 No Content` для DELETE.
* **Рівень 3 (Просунутий):**
  - Фільтрація за підрядком у назві (`?search=...`, регістронезалежний пошук).
  - Пагінація/обмеження кількості результатів (`?limit=...`).
  - Додавання кастомних HTTP-заголовків відповіді через `@Header('X-API-Version', '1.0')` та `@Header('X-Service-Status', 'operational')`.
  - Файл `requests.http` для швидкого ручного тестування через VS Code REST Client / Thunder Client.
  - Набір модульних тестів (18 тестів, 100% проходження).

---

## 🏛 Архітектура та структура проєкту

```
1122/
├── src/
│   ├── tickets/
│   │   ├── dto/
│   │   │   ├── create-ticket.dto.ts      # DTO створення квитка
│   │   │   └── update-ticket.dto.ts      # DTO часткового оновлення квитка
│   │   ├── entities/
│   │   │   └── ticket.entity.ts          # Модель сутності квитка
│   │   ├── tickets.controller.ts         # REST контролер ендпоінтів /tickets
│   │   ├── tickets.controller.spec.ts    # Модульні тести контролера
│   │   ├── tickets.service.ts            # Сервіс бізнес-логіки з in-memory сховищем
│   │   └── tickets.service.spec.ts       # Модульні тести сервісу
│   ├── app.controller.ts
│   ├── app.module.ts                     # Кореневий модуль застосунку
│   ├── app.service.ts
│   └── main.ts                           # Вхідна точка додатку (порт 3000)
├── requests.http                         # Колекція запитів для тестування
├── package.json
├── tsconfig.json
└── README.md
```

### Контракт даних сутності (Ticket Entity):
* `id` (`string`): Унікальний ідентифікатор квитка.
* `title` (`string`): Назва події (наприклад, "Концерт Imagine Dragons").
* `price` (`number`): Вартість квитка у гривнях.
* `venue` (`string`): Місце проведення (наприклад, "НСК Олімпійський").
* `sector` (`string`): Сектор (наприклад, "Sector A", "Fan-зона 1").
* `seatNumber` (`number | string`): Номер місця або позначка вільної посадки.

---

## 🚀 Інструкція із запуску та тестування

### 1. Встановлення залежностей (якщо ще не встановлено)
```bash
npm install
```

### 2. Запуск сервера у режимі розробки
```bash
npm run start:dev
```
Сервер запуститься за адресою: `http://localhost:3000`.

### 3. Збірка проєкту
```bash
npm run build
```

### 4. Запуск модульних тестів
```bash
npm test
```

---

## 📡 Специфікація REST API ендпоінтів

| Метод | Шлях | Опис | Параметри | Код відповіді |
| :--- | :--- | :--- | :--- | :--- |
| **GET** | `/tickets` | Отримання списку квитків | Query: `search`, `limit` | `200 OK` + кастомні заголовки |
| **GET** | `/tickets/:id` | Отримання квитка за ID | Param: `id` | `200 OK` (або `404 Not Found`) |
| **POST** | `/tickets` | Створення нового квитка | Body: `CreateTicketDto` | `201 Created` |
| **PATCH** | `/tickets/:id` | Часткове оновлення квитка | Param: `id`, Body: `UpdateTicketDto` | `200 OK` (або `404 Not Found`) |
| **DELETE** | `/tickets/:id` | Видалення квитка | Param: `id` | `204 No Content` (або `404 Not Found`) |

### Кастомні HTTP-заголовки (GET /tickets)
* `X-API-Version`: `1.0`
* `X-Service-Status`: `operational`

---

## 🧪 Результати тестування (HTTP Logs & Output)

Нижче наведено фактичні результати виконання HTTP-запитів до розробленого API:

### 1. GET `/tickets` — Отримання списку квитків та кастомних заголовків
```http
HTTP/1.1 200 OK
X-Powered-By: Express
X-Service-Status: operational
X-API-Version: 1.0
Content-Type: application/json; charset=utf-8

[
  {
    "id": "1",
    "title": "Концерт Imagine Dragons",
    "price": 2200,
    "venue": "НСК Олімпійський",
    "sector": "Sector A",
    "seatNumber": 15
  },
  {
    "id": "2",
    "title": "Вистава Гамлет",
    "price": 650,
    "venue": "Театр ім. Івана Франка",
    "sector": "Партер",
    "seatNumber": 8
  },
  {
    "id": "3",
    "title": "Концерт Океан Ельзи",
    "price": 1800,
    "venue": "Палац Спорту",
    "sector": "Fan-зона 1",
    "seatNumber": "Вільна посадка"
  }
]
```

### 2. GET `/tickets?search=Imagine` — Фільтрація за підрядком у назві
```http
HTTP/1.1 200 OK
X-Service-Status: operational
X-API-Version: 1.0
Content-Type: application/json; charset=utf-8

[
  {
    "id": "1",
    "title": "Концерт Imagine Dragons",
    "price": 2200,
    "venue": "НСК Олімпійський",
    "sector": "Sector A",
    "seatNumber": 15
  }
]
```

### 3. GET `/tickets?limit=1` — Обмеження кількості записів
```http
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8

[
  {
    "id": "1",
    "title": "Концерт Imagine Dragons",
    "price": 2200,
    "venue": "НСК Олімпійський",
    "sector": "Sector A",
    "seatNumber": 15
  }
]
```

### 4. GET `/tickets/1` — Отримання існуючого запису за ID
```http
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8

{
  "id": "1",
  "title": "Концерт Imagine Dragons",
  "price": 2200,
  "venue": "НСК Олімпійський",
  "sector": "Sector A",
  "seatNumber": 15
}
```

### 5. GET `/tickets/99999` — Обробка виключення 404 Not Found
```http
HTTP/1.1 404 Not Found
Content-Type: application/json; charset=utf-8

{
  "message": "Сутність з ID 99999 не знайдена",
  "error": "Not Found",
  "statusCode": 404
}
```

### 6. POST `/tickets` — Створення квитка (статус 201 Created)
**Запит:**
```http
POST /tickets HTTP/1.1
Content-Type: application/json

{
  "title": "Фестиваль Atlas Weekend",
  "price": 3200,
  "venue": "ВДНГ, Київ",
  "sector": "VIP Lounge",
  "seatNumber": "A-12"
}
```
**Відповідь:**
```http
HTTP/1.1 201 Created
Content-Type: application/json; charset=utf-8

{
  "id": "1792755726504",
  "title": "Фестиваль Atlas Weekend",
  "price": 3200,
  "venue": "ВДНГ, Київ",
  "sector": "VIP Lounge",
  "seatNumber": "A-12"
}
```

### 7. PATCH `/tickets/1` — Часткове оновлення квитка
**Запит:**
```http
PATCH /tickets/1 HTTP/1.1
Content-Type: application/json

{
  "price": 2500,
  "seatNumber": 16
}
```
**Відповідь:**
```http
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8

{
  "id": "1",
  "title": "Концерт Imagine Dragons",
  "price": 2500,
  "venue": "НСК Олімпійський",
  "sector": "Sector A",
  "seatNumber": 16
}
```

### 8. DELETE `/tickets/2` — Видалення квитка (статус 204 No Content)
```http
HTTP/1.1 204 No Content
```

### 9. Перевірка після видалення — GET `/tickets/2`
```http
HTTP/1.1 404 Not Found
Content-Type: application/json; charset=utf-8

{
  "message": "Сутність з ID 2 не знайдена",
  "error": "Not Found",
  "statusCode": 404
}
```

---

## 🧪 Модульне тестування (Unit Tests)

Для перевірки надійності роботи системи розроблено набір unit-тестів:
* `src/tickets/tickets.service.spec.ts`: тестування in-memory сховища, фільтрації, пагінації, створення, оновлення, видалення та викидання `NotFoundException`.
* `src/tickets/tickets.controller.spec.ts`: тестування викликів сервісу та обробки результатів контролером.

### Результат виконання команди `npm test`:
```
 ✓ src/app.controller.spec.ts (1 test) 99ms
 ✓ src/tickets/tickets.service.spec.ts (11 tests) 119ms
 ✓ src/tickets/tickets.controller.spec.ts (6 tests) 115ms

 Test Files  3 passed (3)
      Tests  18 passed (18)
```
Всі 18 тестів успішно пройдено без жодних зауважень та помилок.

---

## 📚 Відповіді на контрольні питання

### 1. Що таке інверсія керування (Inversion of Control) та як принцип Dependency Injection реалізований у NestJS?
* **Inversion of Control (IoC)** — це архітектурний принцип проєктування програмного забезпечення, за якого потік керування програмою делегується зовнішньому фреймворку або контейнеру. Замість того щоб об'єкт самостійно створював свої залежності за допомогою оператора `new`, фреймворк бере на себе життєвий цикл і конструювання цих залежностей.
* **Dependency Injection (DI) у NestJS:**
  - Класи, що надають функціональність (сервіси, репозиторії), позначаються декоратором `@Injectable()`. Це реєструє їх як провайдери в IoC-контейнері NestJS.
  - Споживач залежності (наприклад, `TicketsController`) оголошує необхідні залежності у своєму конструкторі (Constructor Injection):
    ```typescript
    constructor(private readonly ticketsService: TicketsService) {}
    ```
  - Під час запуску програми IoC-контейнер автоматично резолвить залежності за типами TypeScript (завдяки метаданим `reflect-metadata`) і передає готовий екземпляр сервісу (за замовчуванням Singleton) у контролер.

---

### 2. Яка різниця між модулем (@Module), контролером (@Controller) та провайдером (@Injectable)?
* **Модуль (`@Module`):** Організаційна одиниця додатку, яка групує пов'язані контролери, сервіси та інші модулі у цілісний функціональний блок. Метадані модуля визначають: `controllers` (список контролерів), `providers` (сервіси, доступні всередині модуля), `imports` (інші модулі) та `exports` (провайдери, доступні іншим модулям).
* **Контролер (`@Controller`):** Рівень маршрутизації та обробки HTTP-запитів. Відповідає за прийом вхідних запитів, вилучення параметрів (body, query, params, headers), виклик відповідних сервісів та повернення HTTP-відповідей клієнту. Не повинен містити складної бізнес-логіки.
* **Провайдер / Сервіс (`@Injectable`):** Рівень бізнес-логіки. Інкапсулює алгоритми, обробку даних, взаємодію з базою даних або сторонніми API. Може бути впроваджений у контролери або інші провайдери через механізм DI.

---

### 3. Чому для створення DTO у NestJS використовуються класи TypeScript, а не інтерфейси (interfaces)?
* **Інтерфейси TypeScript (`interface`)** існують виключно під час компіляції і повністю видаляються під час трансляції TypeScript у JavaScript (type erasure). У рантаймі (під час виконання коду Node.js) інформація про інтерфейси відсутня.
* **Класи TypeScript (`class`)** є повноцінними об'єктами ES6/JavaScript, що зберігаються в рантаймі.
* **Чому це важливо:**
  1. Метадані класів зберігаються через `reflect-metadata`, що дозволяє NestJS автоматично визначати типи у рантаймі.
  2. Це робить можливим використання валідаційних бібліотек (наприклад, `class-validator`, `class-transformer` та глобального `ValidationPipe`), які спираються на рефлексію властивостей класу та декоратори валідації.

---

### 4. Які декоратори надає NestJS для витягування параметрів запиту (route params, query params, body payload)? Наведіть приклади їх застосування.
NestJS надає такі основні декоратори параметрів:
* `@Param(key?: string)` — отримання параметрів маршруту:
  ```typescript
  @Get(':id')
  findOne(@Param('id') id: string) { ... }
  ```
* `@Query(key?: string)` — отримання рядка запиту (query params):
  ```typescript
  @Get()
  findAll(@Query('search') search?: string, @Query('limit') limit?: string) { ... }
  ```
* `@Body(key?: string)` — отримання тіла HTTP-запиту (payload):
  ```typescript
  @Post()
  create(@Body() dto: CreateTicketDto) { ... }
  ```
* `@Headers(key?: string)` — читання вхідних HTTP-заголовків:
  ```typescript
  @Get('info')
  getInfo(@Headers('user-agent') userAgent: string) { ... }
  ```
* `@Req()` / `@Res()` — прямий доступ до об'єктів `Request` та `Response` платформи (Express/Fastify).

---

### 5. Який HTTP-статус за замовчуванням повертає метод контролера NestJS для операцій GET, POST та DELETE? Як змінити статус відповіді за допомогою декоратора @HttpCode()?
* **За замовчуванням NestJS повертає:**
  - `GET`: **200 OK**
  - `POST`: **201 Created**
  - `PATCH` / `PUT`: **200 OK**
  - `DELETE`: **200 OK** (за замовчуванням, якщо не перевизначено)
* **Зміна статусу за допомогою `@HttpCode()`:**
  Для зміни коду відповіді над методом вказується декоратор `@HttpCode(статус)`. Наприклад, для операції видалення за стандартом REST часто використовується `204 No Content`:
  ```typescript
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT) // або @HttpCode(204)
  remove(@Param('id') id: string) {
    this.ticketsService.remove(id);
  }
  ```

---

### 6. Як працює вбудована система обробки виключень NestJS? Що повертає фреймворк клієнту при виклику throw new NotFoundException()?
* **Механізм роботи:**
  NestJS має вбудований шар глобальних фільтрів виключень (**Global Exception Filter**). Коли під час виконання запиту виникає невиловлене виключення, успадковане від `HttpException`, глобальний фільтр перехоплює його, витягує HTTP-статус та формує стандартизовану JSON-відповідь клієнту з відповідним HTTP-кодом.
* **Результат виклику `throw new NotFoundException('Сутність з ID ${id} не знайдена')`:**
  Клієнту повертається HTTP-відповідь зі статусом **404 Not Found** і тілом:
  ```json
  {
    "message": "Сутність з ID 99999 не знайдена",
    "error": "Not Found",
    "statusCode": 404
  }
  ```

---

### 7. Як за допомогою декоратора @Header() додати кастомний HTTP-заголовок до відповіді сервера?
Декоратор `@Header(name, value)` додається над методом контролера і декларує заголовок, що буде автоматично включений у відповідь сервера.
* **Приклад:**
  ```typescript
  @Get()
  @Header('X-API-Version', '1.0')
  @Header('X-Service-Status', 'operational')
  findAll() {
    return this.ticketsService.findAll();
  }
  ```
У відповіді клієнт отримає заголовки:
```
X-API-Version: 1.0
X-Service-Status: operational
```

---

### 8. У чому полягає відмінність між HTTP-методами PUT та PATCH під час проєктування RESTful API?
* **PUT (Повна заміна ресурсу — Idempotent):**
  - Призначений для повної заміни існуючої сутності або її створення (upsert).
  - Клієнт зобов'язаний передати повне уявлення об'єкта (всі його поля). Ті поля, які клієнт не передав, повинні бути видалені або скинуті до значень за замовчуванням.
  - Метод є ідемпотентним: повторні однакові PUT-запити призводять до однакового стану ресурсу на сервері.
* **PATCH (Часткове оновлення ресурсу — Partial Update):**
  - Призначений для модифікації лише окремих полів сутності.
  - Клієнт передає тільки ті властивості, які потребують зміни (наприклад, лише `price`). Усі інші поля об'єкта залишаються без змін.
  - Поля в DTO для PATCH позначаються як опціональні (`?`).
