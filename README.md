# a11y-datepicker

This is an early work in progress datepicker component.

It aims to be accessible to keyboard and screenreader users.

It should be small.

It does not have any external dependencies.

It should natively support IE11 (no babel needed).

It should fall back to HTML native date input on mobile.

[See the demo](https://mathislucka.github.io/a11y-datepicker)

## Roadmap

- support custom icons
- add a control bar for closing the datepicker and getting to the current date
- move necessary css to js
- add some missing aria controls
- add documentation
- add more tests
- add cjs and esm builds
- add methods to destroy datepicker instance
- emit current state of datepicker (possibly using events)