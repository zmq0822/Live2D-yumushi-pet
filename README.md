# yumushi-pet

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run electron:serve
```

### Compiles and minifies for production
```
npm run electron:build
```

### Lints and fixes files
```
npm run lint
```

### How to download electron offline

Open the folder .\node_modules\electron, change the install.js, then put `electron-v13.1.8-win32-x64.zip` together with the install.js and run `node install.js` in the folder. https://npm.taobao.org/mirrors/electron/ (mirror for china)

```js
// downloads if not cached
extractFile('electron-v13.1.8-win32-x64.zip');
// downloadArtifact({
//   version,
//   artifactName: 'electron',
//   force: process.env.force_no_cache === 'true',
//   cacheRoot: process.env.electron_config_cache,
//   platform: process.env.npm_config_platform || process.platform,
//   arch: process.env.npm_config_arch || process.arch
// }).then(extractFile).catch(err => {
//   console.error(err.stack);
//   process.exit(1);
// });
```

