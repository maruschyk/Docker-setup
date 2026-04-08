## Student

- Name: Artem Maruschyk
- Group: 232/2

## Практичне заняття №3 — CRUD REST API для MiniShop

### Структура репозиторію

```
.
├── src/
│   ├── categories/
│   │   ├── category.entity.ts
│   │   ├── categories.module.ts
│   │   ├── categories.service.ts
│   │   └── categories.controller.ts
│   ├── products/
│   │   ├── product.entity.ts
│   │   ├── products.module.ts
│   │   ├── products.service.ts
│   │   └── products.controller.ts
│   ├── migrations/
│   │   ├── 1700000001-CreateTables.ts
│   │   └── <timestamp>-AddIsActiveToProducts.ts
│   ├── data-source.ts
│   └── app.module.ts
├── Dockerfile
├── docker-compose.yml
└── README.md
```

### Запуск проекту

```bash
cp .env.example .env
docker compose up --build
```

### API Endpoints

| Method | URL                 | Опис               |
| ------ | ------------------- | ------------------ |
| GET    | /api/categories     | Список категорій   |
| GET    | /api/categories/:id | Одна категорія     |
| POST   | /api/categories     | Створити категорію |
| PATCH  | /api/categories/:id | Оновити категорію  |
| DELETE | /api/categories/:id | Видалити категорію |
| GET    | /api/products       | Список продуктів   |
| GET    | /api/products/:id   | Один продукт       |
| POST   | /api/products       | Створити продукт   |
| PATCH  | /api/products/:id   | Оновити продукт    |
| DELETE | /api/products/:id   | Видалити продукт   |

### Перевірка міграцій

```text
<вивід docker compose exec postgres psql -U nestuser -d nestdb -c "\dt">
```

### Тест створення категорії

```text
id name        description createdAt
-- ----        ----------- ---------
 1 Electronics Gadgets     2026-04-08T18:58:04.684Z

id name        description createdAt
-- ----        ----------- ---------
 2 Accessories             2026-04-08T19:00:04.649Z
```

### Тест створення продукту

```text
id          : 1
name        : iPhone 15
description :
price       : 999,99
stock       : 50
isActive    : True
category    : @{id=1}
createdAt   : 2026-04-08T19:01:25.166Z
updatedAt   : 2026-04-08T19:01:25.166Z

id          : 2
name        : USB Cable
description :
price       : 9,99
stock       : 200
isActive    : True
category    :
createdAt   : 2026-04-08T19:02:01.749Z
updatedAt   : 2026-04-08T19:02:01.749Z
```

### Тест отримання продуктів

```text
id          : 1
name        : iPhone 15
description :
price       : 999.99
stock       : 50
isActive    : True
category    : @{id=1; name=Electronics; description=Gadgets; createdAt=2026-04-08T18:58:04.684Z}
createdAt   : 2026-04-08T19:01:25.166Z
updatedAt   : 2026-04-08T19:01:25.166Z

id          : 2
name        : USB Cable
description :
price       : 9.99
stock       : 200
isActive    : True
category    :
createdAt   : 2026-04-08T19:02:01.749Z
updatedAt   : 2026-04-08T19:02:01.749Z

id          : 1
name        : iPhone 15
description :
price       : 999.99
stock       : 50
isActive    : True
category    : @{id=1; name=Electronics; description=Gadgets; createdAt=2026-04-08T18:58:04.684Z}
createdAt   : 2026-04-08T19:01:25.166Z
updatedAt   : 2026-04-08T19:01:25.166Z
```

### Тест 404

```text
Invoke-RestMethod : {"message":"Product #999 not found","error":"Not Found","statusCode":404}
At line:1 char:1
+ Invoke-RestMethod http://localhost:3000/api/products/999
+ ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    + CategoryInfo          : InvalidOperation: (System.Net.HttpWebRequest:HttpWebRequest) [Invoke-RestMethod], WebExc
   eption
    + FullyQualifiedErrorId : WebCmdletWebResponseException,Microsoft.PowerShell.Commands.InvokeRestMethodCommand
```
