# a11y-datepicker

This is an early work in progress datepicker component.

It aims to be accessible to keyboard and screenreader users.

It should be small.

It does not have any external dependencies.

It should natively support IE11 (no babel needed).

It should fall back to HTML native date input on mobile.

[See the demo](https://mathislucka.github.io/a11y-datepicker)

## Usage

### Installation
```
npm install a11y-datepicker --save
```

### Basics
#### Initializing the datepicker
```javascript
import Datepicker from 'a11y-datepicker'

var dp = Datepicker({ id: 'datepicker' })
```

#### Getting and setting a date programmatically
```javascript
import Datepicker from 'a11y-datepicker'

var dp = Datepicker({ id: 'datepicker' })
dp.setDate(new Date()) // sets the date to todays date
dp.getDate() // returns the date set before
dp.getDateString() // returns the date set before as a string
```

### Basic example
```html
<!doctype html>
<html>
    <head>
        <meta charset="utf-8"/>
        <title>A11y-Datepicker</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0"/>
        <link rel="stylesheet" href="themes/light.css" />
    </head>
    <body>
        <!-- place a div with an id where you want your datepicker to appear -->
        <div id="datepicker"></div>
        
        <script src="index.browser.min.js" type="text/javascript"></script>
        <script type="text/javascript">
            // initialise a new datepicker instance using the same id as used on the div
            var dp = a11yDatepicker({ id: 'datepicker', theme: 'light' })
        </script>
    </body>
</html>
```

### Options

a11yDatepicker supports the following options (with defaults)
```javascript
{
    dateFormat: 'yyyy-mm-dd', // valid delimiters are '.', '-', '/'. Must contain 'd', 'm', 'yyyy'.
    id: '_ad', // id of the div where the datepicker should be placed
    initialDate: null, // date where the datepicker modal should open
    inputName: 'datepicker-input', // name-attribute of the input field inserted (for form submissions)
    locale: 'en-EN', // used for weekday and month translations (any BCP 47 locale identifier) 
    weekDayFormat: 'short', // How weekdays should be displayed ('narrow', 'short' or 'long').
    minDate: null, // lower date limit. Must be a String in the specified dateFormat.
    maxDate: null, // upper date limit. Must be a String in the specified dateFormat.
    monthsBeforeCurrent: 0, // How many months to display before the currently active month.
    monthsAfterCurrent: 0, // How many months to display after the currently active month.
    weekStartsOn: 1, // What day should the week start on. 0 is Sunday, 6 is Saturday.
    theme: 'dark' // class-attribute added to the datepicker div. Can be used to scope your CSS. Available themes: 'dark', 'light'
}
```