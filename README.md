# Init project

> Check requirments in .tool-versions (asdf)

> Create .env from example & install dependencies

```
cp .env.example .env
npm install
```

> Run PostgreSQL before running API server

```
pg_ctl start
```

> Running migrations & seeds

```
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
```
