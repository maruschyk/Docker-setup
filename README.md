## Student

- Name: Artem Maruschyk
- Group: 232/2

## Практичне заняття №5 — JWT Authentication + Guards + RBAC

### Структура репозиторію

```
.
├── src/
│   ├── auth/
│   │   ├── dto/
│   │   │   ├── register.dto.ts
│   │   │   └── login.dto.ts
│   │   ├── auth.module.ts
│   │   ├── auth.service.ts
│   │   └── auth.controller.ts
│   ├── users/
│   │   ├── user.entity.ts
│   │   ├── users.module.ts
│   │   └── users.service.ts
│   ├── common/
│   │   ├── enums/
│   │   │   └── role.enum.ts
│   │   ├── guards/
│   │   │   ├── jwt-auth.guard.ts
│   │   │   └── roles.guard.ts
│   │   ├── decorators/
│   │   │   ├── current-user.decorator.ts
│   │   │   └── roles.decorator.ts
│   │   └── pipes/
│   │   	└── trim.pipe.ts
│   ├── categories/ ...
│   ├── products/ ...
│   ├── migrations/
│   ├── data-source.ts
│   ├── main.ts
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

| Method | URL               | Auth | Role  |
| ------ | ----------------- | ---- | ----- |
| POST   | /auth/register    | none | -     |
| POST   | /auth/login       | none | -     |
| GET    | /api/categories   | none | -     |
| POST   | /api/categories   | JWT  | admin |
| GET    | /api/products     | none | -     |
| POST   | /api/products     | JWT  | admin |
| PATCH  | /api/products/:id | JWT  | admin |
| DELETE | /api/products/:id | JWT  | admin |

### Тест реєстрації

```text
id        : 2
email     : user@test.com
name      : Test User
role      : user
createdAt : 2026-04-30T13:56:11.712Z
```

### Тест логіну

```text
accessToken
-----------
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIsImVtYWlsIjoidXNlckB0ZXN0LmNvbSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzc3NTU...
```

### Тест 401 — запит без токена

```text
Invoke-RestMethod : {"message":"Missing authorization token","error":"Unauthorized","statusCode":401}
At line:1 char:1
+ Invoke-RestMethod -Uri "http://localhost:3000/api/products" `
+ ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    + CategoryInfo          : InvalidOperation: (System.Net.HttpWebRequest:HttpWebRequest) [Invoke-RestMethod], WebExc
   eption
    + FullyQualifiedErrorId : WebCmdletWebResponseException,Microsoft.PowerShell.Commands.InvokeRestMethodCommand
```

### Тест 403 — запит з роллю user

```text
Invoke-RestMethod : {"message":"Insufficient permissions","error":"Forbidden","statusCode":403}
At line:1 char:1
+ Invoke-RestMethod -Uri "http://localhost:3000/api/products" `
+ ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    + CategoryInfo          : InvalidOperation: (System.Net.HttpWebRequest:HttpWebRequest) [Invoke-RestMethod], WebExc
   eption
    + FullyQualifiedErrorId : WebCmdletWebResponseException,Microsoft.PowerShell.Commands.InvokeRestMethodCommand
```

### Тест успішного створення від admin

```text
id          : 1
name        : MacBook Pro
description :
price       : 2499,99
stock       : 10
isActive    : True
createdAt   : 2026-04-30T14:00:19.058Z
updatedAt   : 2026-04-30T14:00:19.058Z


```
