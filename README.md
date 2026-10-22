# Library-TOP

## Decisions
- MVC architecture to achieve clear separation of concerns.
- In ui.js file, html shell + query string selectors instead of string interpolation, for easy access, edit, and attaching event listeners.
- In ui.js file, the function responsible for creating the book cards is passed "actions" object which contains a set of callback functions, thus making the ui.js file doesn't need to know anything about the state or the logic and only responsible to catch the event and delegate to the controller.