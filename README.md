# markup-refine-lib.js

## How to use

Paste following links into your <head> section of your html:

```html
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/gh/bartlomiej-aleksiejczyk/markup-refine-lib.js@0.3.2/dist/markupRefineLibJs.min.css"
/>
<script
  src="https://cdn.jsdelivr.net/gh/bartlomiej-aleksiejczyk/markup-refine-lib.js@0.3.2/dist/markupRefineLibJs.min.js"
  crossorigin="anonymous"
></script>
```

## markup-refine-lib.css integration

Since this library uses the same css variables as markup-refine-lib.css to prevent color theme conflicts remove this code from your html:

```html
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/gh/bartlomiej-aleksiejczyk/markup-refine-lib.js@0.3.2/dist/markupRefineLibJs.min.css"
/>
```

## How to run locally

To run a development, server use this command:

```bash
npm run dev
```

To run tests, use this command:

```bash
npm run test
```
