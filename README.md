# Library-TOP

## Decisions

- MVC architecture to achieve clear separation of concerns.
  - tradeoff: code usability and separation of concerns at the cost of added initial complexity and steeper learning curve.
- IndexedDB as client-side persistence solution
  - i chosed it over localStorage for these reasons, aside from storage capacity and non-blocking nature, i wanted the ability to store more complex data types like JS objects, arrays, Blobs, files and binary data.
  - tradeoff: massive, asynchronous client-side storage for complex data at the cost of steep learning curve due to its low-level
- Optimistic UI updates
  - memory is the source of truth for the UI and storage is a side effect, so the UI feels instant
  - tradeoff: faster, more responsive user experience at the cost of increased code complexity and potential of roll backs due to failures.
- In ui.js file, html shell + query string selectors instead of string interpolation, for easy access, edit, and attaching event listeners.
- In ui.js file, book cards delegate click event to a common parent and the common parent click event listener calls the appropriate event handler based on the action of the button.
  - one event listener only instead of 2 per card for each button
  - attaching event listener to a static parent makes it survive re-rendering and don't need to re-bind with every render
  - tradeoff: reduces memory consumption and simplifies DOM management, at the cost of introducing minor CPU overhead from event bubbling and complex conditional matching [extra traveling + extra sorting]
