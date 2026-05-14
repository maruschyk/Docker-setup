## Student

- Name: Artem Maruschyk
- Group: 232/2

## Практичне заняття №7 — Redis + Pagination + Filtering

### Запуск проекту

```bash
cp .env.example .env
docker compose up --build
docker compose run --rm app npm run seed
```

### API: GET /api/products

| Параметр   | Тип      | Default   | Опис                            |
| ---------- | -------- | --------- | ------------------------------- |
| page       | number   | 1         | Номер сторінки                  |
| pageSize   | number   | 10        | Елементів на сторінку (max 100) |
| sort       | string   | createdAt | Поле сортування                 |
| order      | asc/desc | desc      | Напрямок                        |
| categoryId | number   | -         | Фільтр за категорією            |
| minPrice   | number   | -         | Мінімальна ціна                 |
| maxPrice   | number   | -         | Максимальна ціна                |
| search     | string   | -         | Пошук за назвою (ILIKE)         |

### Тест пагінації

```text
Invoke-RestMethod "http://localhost:3000/api/products?page=1&pageSize=5"

data                            statusCode timestamp
----                            ---------- ---------
@{items=System.Object[]; meta=}        200 2026-05-14T20:22:18.267Z
```

### Тест фільтрації

```text
Invoke-RestMethod "http://localhost:3000/api/products?categoryId=1&minPrice=500"

data                            statusCode timestamp
----                            ---------- ---------
@{items=System.Object[]; meta=}        200 2026-05-14T20:22:38.835Z

```

### Тест пошуку

```text
Invoke-RestMethod "http://localhost:3000/api/products?search=mac"

data                            statusCode timestamp
----                            ---------- ---------
@{items=System.Object[]; meta=}        200 2026-05-14T20:22:56.074Z
```

### Тест кешування (Redis)

```text
docker compose exec redis redis-cli KEYS "products:*"
(empty array)
```

### Тест інвалідації кешу

```text
docker compose exec redis redis-cli KEYS "*"
(empty array)

docker compose exec redis redis-cli KEYS "products:*"
(empty array)
```
