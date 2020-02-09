# Finnish translator

## Building and running on localhost

First install dependencies:

```sh
npm install
```

To run in hot module reloading mode:

```sh
npm start
```

Access the app through `http://localhost:1234`

To create a production build:

```sh
npm run build-prod
```

## Running

Open the file `dist/index.html` in your browser

## Credits

Made with [createapp.dev](https://createapp.dev/)

## VS Code setup

For best DX using [VS Code](https://code.visualstudio.com/) and utilizing [linting](https://eslint.org/) and [prettier](https://prettier.io/), these editor settings might be useful

Required plugins:

- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

```json
"typescript.preferences.importModuleSpecifier": "non-relative",
"editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
},
"eslint.enable": true,
```

# Environment

Create your own `.env` out of `.env-example`

```sh
TRANSLATION_API_URL=your-translation-api-url
```
