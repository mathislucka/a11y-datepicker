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
            var dp = a11yDatepicker({ id: 'datepicker' })
        </script>
    </body>
</html>
```

### Options

a11yDatepicker supports the following options (with defaults)
```javascript
{
    // valid delimiters are '.', '-', '/'. Must contain 'd', 'm', 'yyyy'
    dateFormat: 'yyyy-mm-dd',
    // id of the div where the datepicker should be placed
    id: 'a1-',
    // date where the datepicker modal should open
    initialDate: null,
    // name-attribute of the input field inserted (for form submissions)
    inputName: 'datepicker-input',
    // used for weekday and month translations (any BCP 47 locale identifier) 
    locale: 'en-EN',
    // How weekdays should be displayed ('narrow', 'short' or 'long').
    weekDayFormat: 'short',
    // lower date limit. Must be a String in the specified dateFormat.
    minDate: null,
    // upper date limit. Must be a String in the specified dateFormat.
    maxDate: null,
    // How many months to display before the currently active month.
    monthsBeforeCurrent: 0,
    // How many months to display after the currently active month.
    monthsAfterCurrent: 0,
    // What day should the week start on. 0 is Sunday, 6 is Saturday.
    weekStartsOn: 1,
    // all elements of the datepicker instance receive a class consisting of prefix and tag name (e.g. ad-table). Can be used for custom styling.
    classPrefix: 'a1-',
    // class that should be added to the datepicker input element
    inputClass: '',
    // class that should be added to the datepicker root element
    rootClass: '',
    // mark date input as required
    required: false,
    // disable date input
    disabled: false,
    // callback function called after opening the datepicker and receiving the datepicker container element as an argument
    onAfterOpen: function (datePickerContainterElement) {}
}
```