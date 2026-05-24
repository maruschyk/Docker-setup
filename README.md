## Student

- Name: Artem Maruschyk
- Group: 232/2

## MiniShop API — Фінальний проєкт

REST API інтернет-магазину на NestJS + PostgreSQL + Redis.

### Технології

- NestJS + TypeScript
- PostgreSQL + TypeORM (міграції, QueryBuilder)
- Redis (кешування з інвалідацією)
- JWT автентифікація + RBAC авторизація
- class-validator + class-transformer
- Swagger / OpenAPI

### Запуск

```bash
cp .env.example .env
docker compose up --build
docker compose run --rm app npm run seed
```

### Swagger UI

http://localhost:3000/api/docs

### API Endpoints

#### Auth

| Method | URL            | Auth | Опис        |
| ------ | -------------- | ---- | ----------- |
| POST   | /auth/register | -    | Реєстрація  |
| POST   | /auth/login    | -    | Логін → JWT |

#### Categories

| Method | URL                 | Auth  | Опис     |
| ------ | ------------------- | ----- | -------- |
| GET    | /api/categories     | -     | Список   |
| GET    | /api/categories/:id | -     | Одна     |
| POST   | /api/categories     | admin | Створити |
| PATCH  | /api/categories/:id | admin | Оновити  |
| DELETE | /api/categories/:id | admin | Видалити |

#### Products

| Method | URL               | Auth  | Опис                         |
| ------ | ----------------- | ----- | ---------------------------- |
| GET    | /api/products     | -     | Список + pagination + filter |
| GET    | /api/products/:id | -     | Один                         |
| POST   | /api/products     | admin | Створити                     |
| PATCH  | /api/products/:id | admin | Оновити                      |
| DELETE | /api/products/:id | admin | Видалити                     |

#### Orders

| Method | URL                    | Auth  | Опис                |
| ------ | ---------------------- | ----- | ------------------- |
| POST   | /api/orders            | user  | Створити замовлення |
| GET    | /api/orders            | user  | Мої / Всі (admin)   |
| GET    | /api/orders/:id        | user  | Одне (ownership)    |
| PATCH  | /api/orders/:id/status | admin | Змінити статус      |
| DELETE | /api/orders/:id        | admin | Видалити            |

### Тест створення замовлення

```text
{
  "items": [
    {
      "productId": 1,
      "quantity": 2
    },
    {
      "productId": 5,
      "quantity": 1
    }
  ]
}
```

### Тест ownership (403)

```text
{
  "error": {
    "code": 401,
    "message": "Invalid token",
    "traceId": "305c171d-cae6-47f6-9001-d04885d90dea"
  },
  "timestamp": "2026-05-24T20:18:37.546Z"
}
```

### Тест зміни статусу

```text
{
  "error": {
    "code": 403,
    "message": "Access denied",
    "traceId": "39bef63d-bbc7-46a1-85d9-57a169fa8a4b"
  },
  "timestamp": "2026-05-24T20:23:57.167Z"
}
```

### Тест insufficient stock

```text
{
  "error": {
    "code": 400,
    "message": "Insufficient stock for \"MacBook Pro\": available 10, requested 99",
    "traceId": "3be68892-5382-471b-abe0-70bd51dcb9f2"
  },
  "timestamp": "2026-05-24T20:40:38.755Z"
}
```
