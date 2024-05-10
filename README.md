# table-fixed-scroll

## About
JavaScript plugin __table-fixed-scroll__ allow you to make
table headers adapt. Table headers will be pinned to top after they were scrolled.
<hr>
<picture>
  <img src="https://raw.githubusercontent.com/kirgk25/storage/main/table-fixed-scroll.gif">
</picture>
<hr>

## How to use it

### Step 1
Install plugin:<br>
```
npm install table-fixed-scroll
```

### Step 2
Load plugin into your JavaScript code by one of two methods:<br>

#### Method 1. Using import
```
import * as tableFixedScroll from 'table-fixed-scroll'
```

#### Method 2. Using require
```
const tableFixedScroll = require('table-fixed-scroll');
```

### Step 3
Initialize plugin in your JavaScript code:<br>
```
tableFixedScroll.init();
```

### Step 4
Add class __table-fixed-scroll__ to table that you want to be with adapt header:<br>
```html
<table class="table-fixed-scroll">
    <thead>...</thead>
    <tbody>...</tbody>
</table>
```
