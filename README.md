# Happy Solutions - Happy API

## Context

This project is based on [happy-api](https://github.com/amelazzi/happy-api.git).

## [Changelog](./CHANGELOG.md)

## Requirements

- [Node.js](https://nodejs.org/en/) >= 18.x
- [Yarn](https://yarnpkg.com/getting-started) >= 2.x - [Installation](https://yarnpkg.com/getting-started/install) with commande: `corepack enable`
- [Thunder Client (VSCode extension)](https://marketplace.visualstudio.com/items?itemName=rangav.vscode-thunder-client) - Optional, for testing API

## Install

```bash
yarn install
```

Create a [`.env`](.env) file like following example:

```bash
NODE_ENV=[debug|production]
LOG_LEVEL=[error|warn|info|http|verbose|debug|silly]

PORT=[The server port, default: 5000]

SWAGGER_ENABLED=[true|false]
SWAGGER_PATH=[Swagger path, default: /api-docs]

CRON_ENABLED=[true|false enable cron system]
CRON_CLEAN_TOKENS_INTERVAL=[cron interval for clean tokens]

JWT_SECRET=[JWT Secret]
JWT_ACCESS_TOKEN_EXPIRES_IN=[access token duration in seconds]
JWT_REFRESH_TOKEN_EXPIRES_IN=[refresh token duration in seconds]
JWT_FINGERPRINT_EXPIRES_IN=[fingerprint max age in miliseconds, generay equal to refresh token duration]

DATABASE_HOST=[Database's host]
DATABASE_PORT=[Database's port]
DATABASE_NAME=[Database's name]
DATABASE_USER=[Database's user]
DATABASE_PASSWORD=[Database's password]
DATABASE_FROCE_SYNC=[true|false force database sync]
```

## Development

Start postgres docker container:

```bash
docker run \
    -e POSTGRES_USER=happy \
    -e POSTGRES_PASSWORD=happy \
    -e POSTGRES_DB=happydb \
    -v $PWD/db/init:/docker-entrypoint-initdb.d:ro \
    -p 5432:5432 \
    postgres
```

(Optionnal) Start adminer docker container:

```bash
docker run \
    -p 8080:8080 \
    adminer
```

Start watching code, re-run code at every changes:

```bash
yarn watch
```

Build app :

```bash
yarn build
```

Run app :

```bash
yarn start
```

Test app (required Docer runing)

```bash
yarn test
```

## Production

Build app for production :

```bash
yarn build
node ./dist
```

Testing API with Thunder Client (VSCode extension) or swagger-ui `http://{host}:{port}/api-docs` (ex: <http://localhost:5000/api-docs>)

## MCD

## CI/CD Strategy

### Development environment

To deploy the application on the development environment, you must create a pull request on the `develop` branch. After the pull request is validated and merged, the application will be deployed on the development environment.

### Staging environment

To deploy the application on the staging environment, you must create a tag with the following format: `staging-x.y.z(.b)`. After the tag is created and pushed, the application will be deployed on the staging environment.

### Production environment

To deploy the application on the production environment, you must create a tag with the following format: `production-x.y.z(.b)`. After the tag is created and pushed, the application will be deployed on the production environment.

## Loggin rules

- 🚀 / 🛫 => Start
- 🛬 => Finish
- ⏰ => Deleyed
- ⏱ => Time counter / duration
- ⌚️ => Time
- 📆 => Date
- ✅ / 🎊 / 🎉 => Sucessful
- ❌ / 🤒 / ☠️ => Error occured
- ⛔️ / 🚫 => Forbiddend / Unauthorized
- 💤 / ⏳ => Waiting
- 🛑 => Stopped
- 🔐 / 🔑 => Secured
- 📍 / 🗺️ => Location
- 🗑 / ♻️ => Deleted
- 🔎 / 🕵️ => Search
- 📥 => Download
- 📤 => Upload
- 📦 => Pack
- 📧 => Email
- ⚙️ => Properties / Settings / Params
- ✨ => New
- 💀 => Header
- ⚰️ / 🔧 => Body
- 🏷️ / 🔖 => Tag / label
- 👂 => Listen
- 🛌 => Speep
- 📃 / 📄 => Message
- 🎚️ / 🔈 => Level
- ❓ => Not found

## Git rules

Using [gitflow](https://git-flow.readthedocs.io/fr/latest/presentation.html) as branch model,​ with merge strategy (no rebase)

![gitflow diagram](https://git-flow.readthedocs.io/fr/latest/_images/gitflow.png)
<!-- <div style="text-align:center">
    <img src="https://git-flow.readthedocs.io/fr/latest/_images/gitflow.png"
     alt="gitflow diagram"
     style="max-width: 50%"/>
</div> -->

### Branches

- `master` / `main` - Production branch
- `develop` - Development branch
- `feature/*` - Feature branches, started from `develop` and merged into `develop`
- `release/*` - Release branches, started from `develop` and merged into `develop` and `master` / `main`
- `fix/*` - Fix branches, started from `release` and merged into `release`
- `hotfix/*` - Hotfix branches, started from `master` / `main` and merged into `develop` and `master` / `main`

### Tags

- `staging-x.y.z(.b)` - Staging tag, put on `release` branch
- `production-x.y.z(.b)` - Production tag, put on `master` / `main` branch

Version name is based on [Semantic Versioning](https://semver.org/)​ :

- `x` - Major version
- `y` - Minor version
- `z` - Patch / Hotfix version, incremented for each hotfix on `master` / `main` branch
- `b` - Build version (optional), starts at 0 and incremented for each tags putted with same x.y.z version, reset to 0 when x.y.z version is incremented

### Commit message format / rules

```git
:emoji: Component - Add short message
:emoji: Component - Add short message
```

Example:

```git
✨ User - Add user creation
🐛 Logger - Fix log date format
    Wrong date format fixed to ISO 8601 format (YYYY-MM-DDTHH:mm:ss.sssZ)
```

#### 1. Use emojis

Use emojis ([gitmoji](https://gitmoji.dev)​) at the beginning of your commit message to give more context to your changes.​

#### 2. Specify component

Specify which component is affected by your commit (use Camel case)​

#### 3. Use imperative mood in your commit message

The imperative mood gives the tone you give to a command or request and this corresponds to the validation messages generated by the commands​

#### 4. Be concise​

The commit message should be short and concise (use Title Case).
Commit less changes at a time can help with this

#### 5. Add a body to your commit message (optional)

Useful for bug fixes or recycling to explain and give more context to our changes (Explain WHAT the change is, but especially WHY the change was necessary).​

## References
