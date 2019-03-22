'use strict';

function raceTimeout (ms, msg) {
  return new Promise((resolve, reject) => {
    const interval = setTimeout(() => {
      const err = new Error(msg || `Timeout expired [${ms}]`);
      reject(err);
    }, ms);
    if (interval.unref) interval.unref();
  })
}

/**
 * Creates a mixin for use in a class extends expression.
 * @module create-mixin
 */

/**
 * @alias module:create-mixin
 * @param {class} Src - The class containing the behaviour you wish to mix into another class.
 * @returns {function}
 */
function createMixin (Src) {
  return function (Base) {
    class Mixed extends Base {}
    for (const propName of Object.getOwnPropertyNames(Src.prototype)) {
      if (propName === 'constructor') continue
      Object.defineProperty(Mixed.prototype, propName, Object.getOwnPropertyDescriptor(Src.prototype, propName));
    }
    if (Src.prototype[Symbol.iterator]) {
      Object.defineProperty(Mixed.prototype, Symbol.iterator, Object.getOwnPropertyDescriptor(Src.prototype, Symbol.iterator));
    }
    return Mixed
  }
}

/**
 * @module composite-class
 */

const _children = new WeakMap();
const _parent = new WeakMap();

/**
 * A base class for building standard composite structures. Can also be mixed in.
 * @alias module:composite-class
 */
class Composite {
  /**
   * Children
   * @type {Array}
   */
  get children () {
    if (_children.has(this)) {
      return _children.get(this)
    } else {
      _children.set(this, []);
      return _children.get(this)
    }
  }

  set children (val) {
    _children.set(this, val);
  }


  /**
   * Parent
   * @type {Composite}
   */
  get parent () {
    return _parent.get(this)
  }
  set parent (val) {
    _parent.set(this, val);
  }

  /**
   * Add a child
   * @returns {Composite}
   */
  add (child) {
    if (!(isComposite(child))) throw new Error('can only add a Composite instance')
    child.parent = this;
    this.children.push(child);
    return child
  }

  /**
   * @param {Composite} child - the child node to append
   * @returns {Composite}
   */
  append (child) {
    if (!(child instanceof Composite)) throw new Error('can only add a Composite instance')
    child.parent = this;
    this.children.push(child);
    return child
  }

  /**
   * @param {Composite} child - the child node to prepend
   * @returns {Composite}
   */
  prepend (child) {
    if (!(child instanceof Composite)) throw new Error('can only add a Composite instance')
    child.parent = this;
    this.children.unshift(child);
    return child
  }

  /**
   * @param {Composite} child - the child node to remove
   * @returns {Composite}
   */
  remove (child) {
    return this.children.splice(this.children.indexOf(child), 1)
  }

  /**
   * depth level in the tree, 0 being root.
   * @returns {number}
   */
  level () {
    let count = 0;
    function countParent (composite) {
      if (composite.parent) {
        count++;
        countParent(composite.parent);
      }
    }
    countParent(this);
    return count
  }

  /**
   * @returns {number}
   */
  getDescendentCount () {
    return Array.from(this).length
  }

  /**
   * prints a tree using the .toString() representation of each node in the tree
   * @returns {string}
   */
  tree () {
    return Array.from(this).reduce((prev, curr) => {
      return prev += `${'  '.repeat(curr.level())}- ${curr}\n`
    }, '')
  }

  /**
   * Returns the root instance of this tree.
   * @returns {Composite}
   */
  root () {
    function getRoot (composite) {
      return composite.parent ? getRoot(composite.parent) : composite
    }
    return getRoot(this)
  }

  /**
   * default iteration strategy
   */
  * [Symbol.iterator] () {
    yield this;
    for (let child of this.children) {
      yield * child;
    }
  }

  /**
   * Used by node's `util.inspect`.
   */
  inspect (depth) {
    const clone = Object.assign({}, this);
    delete clone.parent;
    return clone
  }

  /**
   * Returns an array of ancestors
   * @return {Composite[]}
   */
  parents () {
    const output = [];
    function addParent (node) {
      if (node.parent) {
        output.push(node.parent);
        addParent(node.parent);
      }
    }
    addParent(this);
    return output
  }
}

function isComposite (item) {
  return item && item.children && item.add && item.level && item.root
}

/**
 * @module obso
 */

/**
 * @alias module:obso
 */
class Emitter {
  /**
   * Emit an event.
   * @param {string} eventName - the event name to emit.
   * @param ...args {*} - args to pass to the event handler
   */
  emit (eventName, ...args) {
    if (this._listeners && this._listeners.length > 0) {
      const toRemove = [];

      /* invoke each relevant listener */
      for (const listener of this._listeners) {
        const handlerArgs = args.slice();
        if (listener.eventName === '__ALL__') {
          handlerArgs.unshift(eventName);
        }

        if (listener.eventName === '__ALL__' || listener.eventName === eventName) {
          listener.handler.call(this, ...handlerArgs);

          /* remove once handler */
          if (listener.once) toRemove.push(listener);
        }
      }

      toRemove.forEach(listener => {
        this._listeners.splice(this._listeners.indexOf(listener), 1);
      });
    }

    /* bubble event up */
    if (this.parent) this.parent._emitTarget(eventName, this, ...args);
  }

  _emitTarget (eventName, target, ...args) {
    if (this._listeners && this._listeners.length > 0) {
      const toRemove = [];

      /* invoke each relevant listener */
      for (const listener of this._listeners) {
        const handlerArgs = args.slice();
        if (listener.eventName === '__ALL__') {
          handlerArgs.unshift(eventName);
        }

        if (listener.eventName === '__ALL__' || listener.eventName === eventName) {
          listener.handler.call(target, ...handlerArgs);

          /* remove once handler */
          if (listener.once) toRemove.push(listener);
        }
      }

      toRemove.forEach(listener => {
        this._listeners.splice(this._listeners.indexOf(listener), 1);
      });
    }

    /* bubble event up */
    if (this.parent) this.parent._emitTarget(eventName, target || this, ...args);
  }

   /**
    * Register an event listener.
    * @param {string} [eventName] - The event name to watch. Omitting the name will catch all events.
    * @param {function} handler - The function to be called when `eventName` is emitted. Invocated with `this` set to `emitter`.
    * @param {object} [options]
    * @param {boolean} [options.once] - If `true`, the handler will be invoked once then removed.
    */
  on (eventName, handler, options) {
    createListenersArray(this);
    options = options || {};
    if (arguments.length === 1 && typeof eventName === 'function') {
      handler = eventName;
      eventName = '__ALL__';
    }
    if (!handler) {
      throw new Error('handler function required')
    } else if (handler && typeof handler !== 'function') {
      throw new Error('handler arg must be a function')
    } else {
      this._listeners.push({ eventName, handler: handler, once: options.once });
    }
  }

  /**
   * Remove an event listener.
   * @param eventName {string} - the event name
   * @param handler {function} - the event handler
   */
  removeEventListener (eventName, handler) {
    if (!this._listeners || this._listeners.length === 0) return
    const index = this._listeners.findIndex(function (listener) {
      return listener.eventName === eventName && listener.handler === handler
    });
    if (index > -1) this._listeners.splice(index, 1);
  }

  /**
   * Once.
   * @param {string} eventName - the event name to watch
   * @param {function} handler - the event handler
   */
  once (eventName, handler) {
    /* TODO: the once option is browser-only */
    this.on(eventName, handler, { once: true });
  }

  /**
   * Propagate.
   * @param {string} eventName - the event name to propagate
   * @param {object} from - the emitter to propagate from
   */
  propagate (eventName, from) {
    from.on(eventName, (...args) => this.emit(eventName, ...args));
  }
}

/**
 * Alias for `on`.
 */
Emitter.prototype.addEventListener = Emitter.prototype.on;

function createListenersArray (target) {
  if (target._listeners) return
  Object.defineProperty(target, '_listeners', {
    enumerable: false,
    configurable: false,
    writable: false,
    value: []
  });
}

/**
 * Takes any input and guarantees an array back.
 *
 * - converts array-like objects (e.g. `arguments`) to a real array
 * - converts `undefined` to an empty array
 * - converts any another other, singular value (including `null`) into an array containing that value
 * - ignores input which is already an array
 *
 * @module array-back
 * @example
 * > const arrayify = require('array-back')
 *
 * > arrayify(undefined)
 * []
 *
 * > arrayify(null)
 * [ null ]
 *
 * > arrayify(0)
 * [ 0 ]
 *
 * > arrayify([ 1, 2 ])
 * [ 1, 2 ]
 *
 * > function f(){ return arrayify(arguments); }
 * > f(1,2,3)
 * [ 1, 2, 3 ]
 */

function isObject (input) {
  return typeof input === 'object' && input !== null
}

function isArrayLike (input) {
  return isObject(input) && typeof input.length === 'number'
}

/**
 * @param {*} - the input value to convert to an array
 * @returns {Array}
 * @alias module:array-back
 */
function arrayify (input) {
  if (Array.isArray(input)) {
    return input
  } else {
    if (input === undefined) {
      return []
    } else if (isArrayLike(input)) {
      return Array.prototype.slice.call(input)
    } else {
      return [ input ]
    }
  }
}

/**
 * @module fsm-base
 * @typicalname stateMachine
 */

const _state = new WeakMap();
const _validMoves = new WeakMap();

/**
 * @class
 * @alias module:fsm-base
 * @extends {Emitter}
 */
class StateMachine extends Emitter {
  constructor (validMoves) {
    super();
    _validMoves.set(this, arrayify(validMoves).map(move => {
      if (!Array.isArray(move.from)) move.from = [ move.from ];
      if (!Array.isArray(move.to)) move.to = [ move.to ];
      return move
    }));
  }

  /**
   * The current state
   * @type {string} state
   * @throws `INVALID_MOVE` if an invalid move made
   */
  get state () {
    return _state.get(this)
  }

  set state (state) {
    this.setState(state);
  }

  /**
   * Set the current state. The second arg onward will be sent as event args.
   * @param {string} state
   */
  setState (state, ...args) {
    /* nothing to do */
    if (this.state === state) return

    const validTo = _validMoves.get(this).some(move => move.to.indexOf(state) > -1);
    if (!validTo) {
      const msg = `Invalid state: ${state}`;
      const err = new Error(msg);
      err.name = 'INVALID_MOVE';
      throw err
    }

    let moved = false;
    const prevState = this.state;
    _validMoves.get(this).forEach(move => {
      if (move.from.indexOf(this.state) > -1 && move.to.indexOf(state) > -1) {
        _state.set(this, state);
        moved = true;
        /**
         * fired on every state change
         * @event module:fsm-base#state
         * @param state {string} - the new state
         * @param prev {string} - the previous state
         */
        this.emit('state', state, prevState);

        /**
         * fired on every state change
         * @event module:fsm-base#&lt;state value&gt;
         */
        this.emit(state, ...args);
      }
    });
    if (!moved) {
      let froms = _validMoves.get(this)
        .filter(move => move.to.indexOf(state) > -1)
        .map(move => move.from.map(from => `'${from}'`))
        .reduce(flatten);
      const msg = `Can only move to '${state}' from ${froms.join(' or ') || '<unspecified>'} (not '${prevState}')`;
      const err = new Error(msg);
      err.name = 'INVALID_MOVE';
      throw err
    }
  }
}

function flatten (prev, curr) {
  return prev.concat(curr)
}

/**
 * @module test-object-model
 */

/**
 * @param {string} [name]
 * @param {function} [testFn]
 * @param {object} [options]
 * @param {number} [options.timeout]
 * @alias module:test-object-model
 */
class Test extends createMixin(Composite)(StateMachine) {
  constructor (name, testFn, options) {
    if (typeof name === 'string') {
      if (isPlainObject(testFn)) {
        options = testFn;
        testFn = undefined;
      }
    } else if (typeof name === 'function') {
      options = testFn;
      testFn = name;
      name = '';
    } else if (typeof name === 'object') {
      options = name;
      testFn = undefined;
      name = '';
    }
    options = options || {};
    name = name || 'tom';
    super ([
      { from: undefined, to: 'pending' },
      { from: 'pending', to: 'in-progress' },
      { from: 'pending', to: 'skip' },
      { from: 'pending', to: 'ignored' },
      { from: 'in-progress', to: 'pass' },
      { from: 'in-progress', to: 'fail' },
      /* reset */
      { from: 'in-progress', to: 'pending' },
      { from: 'pass', to: 'pending' },
      { from: 'fail', to: 'pending' },
      { from: 'skip', to: 'pending' },
      { from: 'ignored', to: 'pending' },
    ]);
    /**
     * Test name
     * @type {string}
     */
    this.name = name;

    /**
     * Test function
     * @type {function}
     */
    this.testFn = testFn;

    /**
     * Position of this test within its parents children
     */
    this.index = 1;

    /**
     * Test state: pending, start, skip, pass or fail.
     */
    this.state = 'pending';
    this._markSkip = options._markSkip;
    this._skip = null;
    this._only = options.only;
    this.options = Object.assign({ timeout: 10000 }, options);

    /**
     * True if ended
     */
    this.ended = false;
  }

  toString () {
    return `${this.name}`
  }

  /**
   * Add a test.
   */
  test (name, testFn, options) {
    for (const child of this) {
      if (child.name === name) {
        throw new Error('Duplicate name: ' + name)
      }
    }
    const test = new this.constructor(name, testFn, options);
    this.add(test);
    test.index = this.children.length;
    this._skipLogic();
    return test
  }

  /**
   * Add a skipped test
   */
  skip (name, testFn, options) {
    options = options || {};
    options._markSkip = true;
    const test = this.test(name, testFn, options);
    return test
  }

  /**
   * Add an only test
   */
  only (name, testFn, options) {
    options = options || {};
    options.only = true;
    const test = this.test(name, testFn, options);
    return test
  }

  _onlyExists () {
    return Array.from(this.root()).some(t => t._only)
  }

  _skipLogic () {
    if (this._onlyExists()) {
      for (const test of this.root()) {
        if (test._markSkip) {
          test._skip = true;
        } else {
          test._skip = !test._only;
        }
      }
    } else {
      for (const test of this.root()) {
        test._skip = test._markSkip;
      }
    }
  }

  setState (state, target, data) {
    if (state === 'pass' || state === 'fail') {
      this.ended = true;
    }
    super.setState(state, target, data);
    if (state === 'pass' || state === 'fail') {
      this.emit('end');
    }
  }

  /**
   * Execute the stored test function.
   * @returns {Promise}
   */
  run () {
    if (this.testFn) {
      if (this._skip) {
        this.setState('skip', this);
        return Promise.resolve()
      } else {
        this.setState('in-progress', this);
        this.emit('start');
        const testFnResult = new Promise((resolve, reject) => {
          try {
            const result = this.testFn.call(new TestContext({
              name: this.name,
              index: this.index
            }));

            if (result && result.then) {
              result
                .then(testResult => {
                  this.setState('pass', this, testResult);
                  resolve(testResult);
                })
                .catch(err => {
                  this.setState('fail', this, err);
                  reject(err);
                });
            } else {
              this.setState('pass', this, result);
              resolve(result);
            }
          } catch (err) {
            this.setState('fail', this, err);
            reject(err);
          }
        });
        return Promise.race([ testFnResult, raceTimeout(this.options.timeout) ])
      }
    } else {
      this.setState('ignored', this);
      return Promise.resolve()
    }
  }

  /**
   * Reset state
   */
  reset (deep) {
    if (deep) {
      for (const tom of this) {
        tom.reset();
      }
    } else {
      this.index = 1;
      this.state = 'pending';
      this._skip = null;
      this._only = null;
    }
  }

  /**
   * Combine several TOM instances into a common root
   * @param {Array.<Test>} tests
   * @param {string} [name]
   * @return {Test}
   */
  static combine (tests, name) {
    let test;
    if (tests.length > 1) {
      test = new this(name);
      for (const subTom of tests) {
        test.add(subTom);
      }

    } else {
      test = tests[0];
    }
    test._skipLogic();
    return test
  }
}

/**
 * The test context, available as `this` within each test function.
 */
class TestContext {
  constructor (context) {
    this.name = context.name;
    this.index = context.index;
  }
}

function isPlainObject (input) {
  return input !== null && typeof input === 'object' && input.constructor === Object
}

/**
 * For type-checking Javascript values.
 * @module typical
 * @typicalname t
 * @example
 * const t = require('typical')
 */

/**
 * Returns true if input is a number
 * @param {*} - the input to test
 * @returns {boolean}
 * @static
 * @example
 * > t.isNumber(0)
 * true
 * > t.isNumber(1)
 * true
 * > t.isNumber(1.1)
 * true
 * > t.isNumber(0xff)
 * true
 * > t.isNumber(0644)
 * true
 * > t.isNumber(6.2e5)
 * true
 * > t.isNumber(NaN)
 * false
 * > t.isNumber(Infinity)
 * false
 */
function isNumber (n) {
  return !isNaN(parseFloat(n)) && isFinite(n)
}

/**
 * A plain object is a simple object literal, it is not an instance of a class. Returns true if the input `typeof` is `object` and directly decends from `Object`.
 *
 * @param {*} - the input to test
 * @returns {boolean}
 * @static
 * @example
 * > t.isPlainObject({ clive: 'hater' })
 * true
 * > t.isPlainObject(new Date())
 * false
 * > t.isPlainObject([ 0, 1 ])
 * false
 * > t.isPlainObject(1)
 * false
 * > t.isPlainObject(/test/)
 * false
 */
function isPlainObject$1 (input) {
  return input !== null && typeof input === 'object' && input.constructor === Object
}

/**
 * An array-like value has all the properties of an array, but is not an array instance. Examples in the `arguments` object. Returns true if the input value is an object, not null and has a `length` property with a numeric value.
 *
 * @param {*} - the input to test
 * @returns {boolean}
 * @static
 * @example
 * function sum(x, y){
 *     console.log(t.isArrayLike(arguments))
 *     // prints `true`
 * }
 */
function isArrayLike$1 (input) {
  return isObject$1(input) && typeof input.length === 'number'
}

/**
 * returns true if the typeof input is `'object'`, but not null!
 * @param {*} - the input to test
 * @returns {boolean}
 * @static
 */
function isObject$1 (input) {
  return typeof input === 'object' && input !== null
}

/**
 * Returns true if the input value is defined
 * @param {*} - the input to test
 * @returns {boolean}
 * @static
 */
function isDefined (input) {
  return typeof input !== 'undefined'
}

/**
 * Returns true if the input value is a string
 * @param {*} - the input to test
 * @returns {boolean}
 * @static
 */
function isString (input) {
  return typeof input === 'string'
}

/**
 * Returns true if the input value is a boolean
 * @param {*} - the input to test
 * @returns {boolean}
 * @static
 */
function isBoolean (input) {
  return typeof input === 'boolean'
}

/**
 * Returns true if the input value is a function
 * @param {*} - the input to test
 * @returns {boolean}
 * @static
 */
function isFunction (input) {
  return typeof input === 'function'
}

/**
 * Returns true if the input value is an es2015 `class`.
 * @param {*} - the input to test
 * @returns {boolean}
 * @static
 */
function isClass (input) {
  if (isFunction(input)) {
    return /^class /.test(Function.prototype.toString.call(input))
  } else {
    return false
  }
}

/**
 * Returns true if the input is a string, number, symbol, boolean, null or undefined value.
 * @param {*} - the input to test
 * @returns {boolean}
 * @static
 */
function isPrimitive (input) {
  if (input === null) return true
  switch (typeof input) {
    case 'string':
    case 'number':
    case 'symbol':
    case 'undefined':
    case 'boolean':
      return true
    default:
      return false
  }
}

/**
 * Returns true if the input is a Promise.
 * @param {*} - the input to test
 * @returns {boolean}
 * @static
 */
function isPromise (input) {
  if (input) {
    const isPromise = isDefined(Promise) && input instanceof Promise;
    const isThenable = input.then && typeof input.then === 'function';
    return !!(isPromise || isThenable)
  } else {
    return false
  }
}

/**
 * Returns true if the input is an iterable (`Map`, `Set`, `Array`, Generator etc.).
 * @param {*} - the input to test
 * @returns {boolean}
 * @static
 */
function isIterable (input) {
  if (input === null || !isDefined(input)) {
    return false
  } else {
    return (
      typeof input[Symbol.iterator] === 'function' ||
      typeof input[Symbol.asyncIterator] === 'function'
    )
  }
}

var t = {
  isNumber,
  isString,
  isBoolean,
  isPlainObject: isPlainObject$1,
  isArrayLike: isArrayLike$1,
  isObject: isObject$1,
  isDefined,
  isFunction,
  isClass,
  isPrimitive,
  isPromise,
  isIterable
};

const tom = new Test('typical');
let a;

async function start () {
  /* isomorphic: load assertion library */
  if (typeof window === 'undefined') {
    a = await Promise.resolve(require('assert'));
  } else {
    await Promise.resolve(require('https://www.chaijs.com/chai.js'));
    a = window.chai.assert;
    window.tom = tom;
  }

  tom.test('.isNumber(value)', function () {
    a.strictEqual(t.isNumber(0), true);
    a.strictEqual(t.isNumber(1), true);
    a.strictEqual(t.isNumber(1.1), true);
    a.strictEqual(t.isNumber(0xff), true);
    a.strictEqual(t.isNumber(6.2e5), true);
    a.strictEqual(t.isNumber(NaN), false);
    a.strictEqual(t.isNumber(Infinity), false);
  });

  tom.test('.isPlainObject(value)', function () {
    a.strictEqual(t.isPlainObject({ clive: 'hater' }), true, '{} is true');
    a.strictEqual(t.isPlainObject(new Date()), false, 'new Date() is false');
    a.strictEqual(t.isPlainObject([ 0, 1 ]), false, 'Array is false');
    a.strictEqual(t.isPlainObject(/test/), false, 'RegExp is false');
    a.strictEqual(t.isPlainObject(1), false, '1 is false');
    a.strictEqual(t.isPlainObject('one'), false, "'one' is false");
    a.strictEqual(t.isPlainObject(null), false, 'null is false');
  });

  tom.test('.isDefined(value)', function () {
    a.strictEqual(t.isDefined({}), true);
    a.strictEqual(t.isDefined({}.one), false);
    a.strictEqual(t.isDefined(0), true);
    a.strictEqual(t.isDefined(null), true);
    a.strictEqual(t.isDefined(undefined), false);
  });

  tom.test('.isString(value)', function () {
    a.strictEqual(t.isString(0), false);
    a.strictEqual(t.isString('1'), true);
    a.strictEqual(t.isString(1.1), false);
    a.strictEqual(t.isString(NaN), false);
    a.strictEqual(t.isString(Infinity), false);
  });

  tom.test('.isBoolean(value)', function () {
    a.strictEqual(t.isBoolean(true), true);
    a.strictEqual(t.isBoolean(false), true);
    a.strictEqual(t.isBoolean(0), false);
    a.strictEqual(t.isBoolean('1'), false);
    a.strictEqual(t.isBoolean(1.1), false);
    a.strictEqual(t.isBoolean(NaN), false);
    a.strictEqual(t.isBoolean(Infinity), false);
  });

  tom.test('.isFunction(value)', function () {
    a.strictEqual(t.isFunction(true), false);
    a.strictEqual(t.isFunction({}), false);
    a.strictEqual(t.isFunction(0), false);
    a.strictEqual(t.isFunction('1'), false);
    a.strictEqual(t.isFunction(1.1), false);
    a.strictEqual(t.isFunction(NaN), false);
    a.strictEqual(t.isFunction(Infinity), false);
    a.strictEqual(t.isFunction(function () {}), true);
    a.strictEqual(t.isFunction(Date), true);
  });

  tom.test('.isPrimitive(value)', function () {
    a.strictEqual(t.isPrimitive(true), true);
    a.strictEqual(t.isPrimitive({}), false);
    a.strictEqual(t.isPrimitive(0), true);
    a.strictEqual(t.isPrimitive('1'), true);
    a.strictEqual(t.isPrimitive(1.1), true);
    a.strictEqual(t.isPrimitive(NaN), true);
    a.strictEqual(t.isPrimitive(Infinity), true);
    a.strictEqual(t.isPrimitive(function () {}), false);
    a.strictEqual(t.isPrimitive(Date), false);
    a.strictEqual(t.isPrimitive(null), true);
    a.strictEqual(t.isPrimitive(undefined), true);
  });

  tom.test('.isPrimitive(value) ES6', function () {
    a.strictEqual(t.isPrimitive(Symbol()), true);
  });

  tom.test('.isClass(value)', function () {
    a.strictEqual(t.isClass(true), false);
    a.strictEqual(t.isClass({}), false);
    a.strictEqual(t.isClass(0), false);
    a.strictEqual(t.isClass('1'), false);
    a.strictEqual(t.isClass(1.1), false);
    a.strictEqual(t.isClass(NaN), false);
    a.strictEqual(t.isClass(Infinity), false);
    a.strictEqual(t.isClass(function () {}), false);
    a.strictEqual(t.isClass(Date), false);
    a.strictEqual(t.isClass(), false);
    a.strictEqual(t.isClass(class {}), true);

    function broken () { }
    broken.toString = function () { throw new Error() };
    a.strictEqual(t.isClass(broken), false);
  });

  tom.test('.isPromise', function () {
    a.strictEqual(t.isPromise(Promise.resolve()), true);
    a.strictEqual(t.isPromise(Promise), false);
    a.strictEqual(t.isPromise(true), false);
    a.strictEqual(t.isPromise({}), false);
    a.strictEqual(t.isPromise(0), false);
    a.strictEqual(t.isPromise('1'), false);
    a.strictEqual(t.isPromise(1.1), false);
    a.strictEqual(t.isPromise(NaN), false);
    a.strictEqual(t.isPromise(Infinity), false);
    a.strictEqual(t.isPromise(function () {}), false);
    a.strictEqual(t.isPromise(Date), false);
    a.strictEqual(t.isPromise(), false);
    a.strictEqual(t.isPromise({ then: function () {} }), true);
  });

  tom.test('.isObject', function () {
    a.strictEqual(t.isObject(Promise.resolve()), true);
    a.strictEqual(t.isObject(Promise), false);
    a.strictEqual(t.isObject(true), false);
    a.strictEqual(t.isObject({}), true);
    a.strictEqual(t.isObject(0), false);
    a.strictEqual(t.isObject('1'), false);
    a.strictEqual(t.isObject(1.1), false);
    a.strictEqual(t.isObject(NaN), false);
    a.strictEqual(t.isObject(Infinity), false);
    a.strictEqual(t.isObject(function () {}), false);
    a.strictEqual(t.isObject(Date), false);
    a.strictEqual(t.isObject(), false);
    a.strictEqual(t.isObject(new Map()), true);
    a.strictEqual(t.isObject([]), true);
    a.strictEqual(t.isObject({ then: function () {} }), true);
  });

  tom.test('.isArrayLike', function () {
    a.strictEqual(t.isArrayLike(arguments), true);
    a.strictEqual(t.isArrayLike(Promise.resolve()), false);
    a.strictEqual(t.isArrayLike(Promise), false);
    a.strictEqual(t.isArrayLike(true), false);
    a.strictEqual(t.isArrayLike({}), false);
    a.strictEqual(t.isArrayLike(0), false);
    a.strictEqual(t.isArrayLike('1'), false);
    a.strictEqual(t.isArrayLike(1.1), false);
    a.strictEqual(t.isArrayLike(NaN), false);
    a.strictEqual(t.isArrayLike(Infinity), false);
    a.strictEqual(t.isArrayLike(function () {}), false);
    a.strictEqual(t.isArrayLike(Date), false);
    a.strictEqual(t.isArrayLike(), false);
    a.strictEqual(t.isArrayLike(new Map()), false);
    a.strictEqual(t.isArrayLike([]), true);
    a.strictEqual(t.isArrayLike({ then: function () {} }), false);
  });

  tom.test('.isIterable', function () {
    a.strictEqual(t.isIterable(Promise.resolve()), false);
    a.strictEqual(t.isIterable(Promise), false);
    a.strictEqual(t.isIterable(true), false);
    a.strictEqual(t.isIterable({}), false);
    a.strictEqual(t.isIterable(0), false);
    a.strictEqual(t.isIterable('1'), true);
    a.strictEqual(t.isIterable(1.1), false);
    a.strictEqual(t.isIterable(null), false);
    a.strictEqual(t.isIterable(undefined), false);
    a.strictEqual(t.isIterable(NaN), false);
    a.strictEqual(t.isIterable(Infinity), false);
    a.strictEqual(t.isIterable(function () {}), false);
    a.strictEqual(t.isIterable(Date), false);
    a.strictEqual(t.isIterable(), false);
    a.strictEqual(t.isIterable(new Map()), true);
    a.strictEqual(t.isIterable([]), true);
    a.strictEqual(t.isIterable({ then: function () {} }), false);
    a.strictEqual(t.isIterable((function * () {})()), true);
  });
}

start().catch(console.error);

module.exports = tom;
