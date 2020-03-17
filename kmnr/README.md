# kmnr

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## Project Structure
The `public/` directory contains the favicon and `index.html`, which has some CDN links for MateralizeCSS.

The rest of the important files are located in the `src` folder:

- `assets/` contains pictures.
- `components/` contains small Vue components. These components will likely be single-file.
- `router/` contains files for the router.
- `store/` contains files for the Vuex store.
- `views/` contains larger, page-sized Vue components.
- `App.vue` is the root component.
- `main.ts` is the Typescript file that compiles the root view, router, and store.
