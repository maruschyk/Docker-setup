## Student

- Name: Artem Maruschyk
- Group: 232/2

## Практичне заняття №2 — NestJS + PostgreSQL + Redis

## Структура репозиторію

```
.
├── src/
├── Dockerfile
├── docker-compose.yml
├── .env.example
└── README.md

```

## Запуск проекту

```bash
cp .env.example .env   # налаштувати значення
docker compose up --build
```

## Перевірка сервісів

```text
NAME                      IMAGE                COMMAND                  SERVICE    CREATED          STATUS                    PORTS
docker-setup-app-1        docker-setup-app     "docker-entrypoint.s…"   app        23 minutes ago   Up 19 minutes             0.0.0.0:3000->3000/tcp, [::]:3000->3000/tcp
docker-setup-postgres-1   postgres:16-alpine   "docker-entrypoint.s…"   postgres   23 minutes ago   Up 21 minutes (healthy)   0.0.0.0:5432->5432/tcp, [::]:5432->5432/tcp
docker-setup-redis-1      redis:7-alpine       "docker-entrypoint.s…"   redis      23 minutes ago   Up 21 minutes (healthy)   0.0.0.0:6379->6379/tcp, [::]:6379->6379/tcp
```

## Перевірка PostgreSQL

```text

   Name    |  Owner   | Encoding | Locale Provider |  Collate   |   Ctype    | ICU Locale | ICU Rules |   Access privileges
-----------+----------+----------+-----------------+------------+------------+------------+-----------+-----------------------
 nestdb    | nestuser | UTF8     | libc            | en_US.utf8 | en_US.utf8 |            |           |
 postgres  | nestuser | UTF8     | libc            | en_US.utf8 | en_US.utf8 |            |           |
 template0 | nestuser | UTF8     | libc            | en_US.utf8 | en_US.utf8 |            |           | =c/nestuser          +
           |          |          |                 |            |            |            |           | nestuser=CTc/nestuser
 template1 | nestuser | UTF8     | libc            | en_US.utf8 | en_US.utf8 |            |           | =c/nestuser          +
           |          |          |                 |            |            |            |           | nestuser=CTc/nestuser
```

## Перевірка Redis

```text

PONG
```

## Перевірка застосунку

```text
Hello World!
```

## Логи NestJS (фрагмент)

```text
app-1  | [Nest] 29  - 03/30/2026, 9:12:51 PM     LOG [NestFactory] Starting Nest application...
app-1  | [Nest] 29  - 03/30/2026, 9:12:51 PM     LOG [InstanceLoader] TypeOrmModule dependencies initialized +166ms
app-1  | [Nest] 29  - 03/30/2026, 9:12:51 PM     LOG [InstanceLoader] ConfigHostModule dependencies initialized +2ms
app-1  | [Nest] 29  - 03/30/2026, 9:12:51 PM     LOG [InstanceLoader] AppModule dependencies initialized +0ms
app-1  | [Nest] 29  - 03/30/2026, 9:12:51 PM     LOG [InstanceLoader] ConfigModule dependencies initialized +1ms
app-1  | [Nest] 29  - 03/30/2026, 9:12:51 PM     LOG [InstanceLoader] CacheModule dependencies initialized +62ms
app-1  | [Nest] 29  - 03/30/2026, 9:12:52 PM     LOG [InstanceLoader] TypeOrmCoreModule dependencies initialized +67ms
app-1  | [Nest] 29  - 03/30/2026, 9:12:52 PM     LOG [RoutesResolver] AppController {/}: +11ms
app-1  | [Nest] 29  - 03/30/2026, 9:12:52 PM     LOG [RouterExplorer] Mapped {/, GET} route +8ms
app-1  | [Nest] 29  - 03/30/2026, 9:12:52 PM     LOG [NestApplication] Nest application successfully started +6ms
```
