## ufx-ui/example

Example app built using components from `@ufx-ui/core` and `@ufx-ui/bfx-containers`

## Install and Run example app

Environment variables for authentication:

```
REACT_APP_UFX_API_KEY=<api-key>
REACT_APP_UFX_API_SECRET=<api-secret>
```

Environment variable to provide cors proxy url:
```
REACT_APP_UFX_CORS_PROXY_URL=<your-cors-url>
```

```bash
cd [proj_dir]
npm run bootstrap
npm run install:peer
cd packages/example
<setup env variables>
npm start or npm run build
```

It will generate bundle at 'example/build' path
