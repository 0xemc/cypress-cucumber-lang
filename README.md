1.  add `import "cypress-cucumber-lang";` to e2e.ts
2.  create a `.cypress-cucumber-preprocessorrc` file in the root folder of your project with the following contents:

```json
{
  "stepDefinitions": [
    "cypress/support/steps/**/*.{js,ts}",
    "node_modules/cypress-cucumber-lang/dist/steps/**/*.{js,ts}"
  ]
}
```
