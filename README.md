# liscap

## Description

**liscap** is a library designed to limit the number of listeners on an HTML element. This library helps prevent browser extensions from secretly stealing your data, like login passwords, emails, e.t.c.

## Usage

To use **liscap**, you can add the script to the head of your html file:

```html
<script src="https://liscap.vercel.app/liscap.min.js"></script>
```

### Example

```javascript
// app.js
// liscap is available globally

// Select an element
const element = document.querySelector("button");

// Add event listener
liscap.addEventListener(element, "click", () => console.log("Clicked"));

// Lock listeners
liscap.lock();

// Try adding another listener (will throw an error)
liscap.addEventListener(element, "click", () => console.log("Clicked")); // Error: You can't add more listeners

// Try adding listener directly to the element (will throw an error)
element.addEventListener("click", () => console.log("Clicked")); // Error: Max listeners exceeded
```

## API

### Methods

#### addEventListener(element, type, callback, options) → {void|Error}

- **Description**: Add an event listener to an element and limit the number of listeners on the element.
- **Parameters**:

| Name     | Type                               | Description            |
| -------- | ---------------------------------- | ---------------------- |
| element  | HTMLElement                        | DOM element            |
| type     | String                             | Event type             |
| callback | EventListenerOrEventListenerObject | Callback function      |
| options  | Object                             | Event listener options |

- **Returns**: void or throws an error
- **Type**: void | Error

#### lock() → {void}

- **Description**: Lock the instance to prevent adding more listeners. Note: This is a one-time operation and can't be undone.
- **Returns**: void

#### removeEventListener(element, type, callback, options) → {Number}

- **Description**: Remove an event listener from an element and decreases the number of listeners on the element.
- **Parameters**:

| Name     | Type                               | Description            |
| -------- | ---------------------------------- | ---------------------- |
| element  | HTMLElement                        | DOM element            |
| type     | String                             | Event type             |
| callback | EventListenerOrEventListenerObject | Callback function      |
| options  | Object                             | Event listener options |

- **Returns**: the number of listeners
- **Type**: Number

#### sayHello() → {void}

- **Description**: Check if the liscap instance is active.
- **Returns**: void

## Version

- **Version**: 1.0.0
- **Since**: 1.0.0

## Author

- **Author**: [Benedict Gabriel](mailto:benedictgabriel73@gmail.com)

## License

This project is licensed under the MIT License. See the [LICENSE](src/dist/liscap.min.js.LICENSE.txt) file for details.

## Source

The source code for this library can be found in [liscap.js](src/lib/liscap.js)
