/**
 * @file Library to limit the number of listeners on an element
 * @author Benedict Gabriel <benedictgabriel73@gmail.com>
 * @version 1.0.0
 * @since 1.0.0
 * @license MIT
 *
 *
 * @example <caption>Example usage of liscap</caption>
 * const liscap = new liscap();
 * const element = document.querySelector('button');
 * liscap.addEventListener(element, 'click', () => console.log('Clicked'));
 * liscap.lock();
 * liscap.addEventListener(element, 'click', () => console.log('Clicked')); // Error: You can't add more listeners
 * element.addEventListener('click', () => console.log('Clicked')); // Error: Max listeners exceeded
 */

// @ts-check

/**
 * @class liscap
 * @classdesc Create a new liscap instance
 */
var liscap = new (class liscap {
  constructor() {
    this._maxListeners = {};
    this._lock = false;
  }

  /**
   * addEventListener - Add an event listener to an element and limit the number of listeners on the element
   * @param {HTMLElement | Window | Document} element - DOM element
   * @param {String} type - Event type
   * @param {EventListenerOrEventListenerObject} callback - Callback function
   * @param {Object} options - Event listener options
   * @returns {void | Error} - Returns void or throws an error
   */
  addEventListener(element, type, callback = () => {}, options = {}) {
    if (
      !(
        element instanceof HTMLElement ||
        element instanceof Window ||
        element instanceof Document
      )
    ) {
      throw new Error("Invalid element");
    }

    if (this._lock) {
      throw new Error("You cannot add more listeners");
    }

    this._maxListeners[element] = (this._maxListeners[element] || 0) + 1;

    element.addEventListener = (function (maxListeners) {
      let count = 0;
      const original = element.addEventListener;
      return function (type, listener, options) {
        if (count >= maxListeners[element]) {
          throw new Error("Max listeners exceeded");
        }
        count++;
        original.call(this, type, listener, options);
      };
    })(this._maxListeners);

    element.addEventListener(type, callback, options);
  }

  /**
   * removeEventListener - Remove an event listener from an element and decreases the number of listeners on the element
   * @param {HTMLElement | Window | Document} element - DOM element
   * @param {String} type - Event type
   * @param {EventListenerOrEventListenerObject} callback - Callback function
   * @param {Object} options - Event listener options
   * @returns {void | Error} - Returns void or throws an error
   */
  removeEventListener(element, type, callback, options = {}) {
    if (this._lock) {
      throw new Error("You cannot remove more listeners");
    }

    if (
      !(
        element instanceof HTMLElement ||
        element instanceof Window ||
        element instanceof Document
      )
    ) {
      throw new Error("Invalid element");
    }

    element.removeEventListener(type, callback, options);
  }

  /**
   * lock - Lock the instance to prevent adding more listeners
   * Note: This is a one-time operation and can't be undone
   * @returns {void}
   */
  lock() {
    (() => {
      [
        window,
        document,
        document.documentElement,
        document.body,
        document.head,
      ].forEach((element) => {
        if (element)
          // @ts-ignore
          this.addEventListener(element, "custom", () => {});
      });

      ["button", "input", "select", "textarea", "form"].forEach((tag) => {
        document.querySelectorAll(tag)?.forEach((element) => {
          if (element)
            // @ts-ignore
            this.addEventListener(element, "custom", () => {});
        });
      });
    })();
    this._lock = true;
    Object.freeze(this);
  }

  /**
   * sayHello - Check if the liscap instance is active
   * @returns {void}
   */
  sayHello() {
    console.log("Hello from liscap");
  }
})();

module.exports = liscap;
