module.exports = {
  root: true,
  // This tells ESLint to load the config from the package `eslint-config-myth`
  extends: ["myth"],
  settings: {
    next: {
      rootDir: ["apps/*/"],
    },
  },
};
