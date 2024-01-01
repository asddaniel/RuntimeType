# `runtimetype` Package Documentation

## General Overview

`runtimetype` is a type checking package for JavaScript. It ensures that the values you pass to your functions and the properties you assign to your objects are of the correct type at runtime in the browser. This can assist in detecting type errors and enhancing the robustness of your application. It complements TypeScript by ensuring specific types during both development and production.

## How to Use `runtimetype`

to use `runtimetype`, you must first install it via npm or Yarn.
```bash
npm i '@asddaniel/runtimetype' 
```

Once installed, you can import it into your project and use it as follows:
Note: Always ensure to pass an object as a parameter to the Type function; it does not support primitives.

```typescript
import { Type } from '@asddaniel/runtimetype';

// Create a Type object with  a initial value
const message = Type({msg:'hello'});

// assign the new value to the message object
// this will throw an error exception.
message.msg = 123;
```

### advanced options

You can also provide an errorCallback function to the Type function to handle type errors in a custom manner. This function is called when the type of a value does not match the expected type.

```typescript
import { Type } from '@asddaniel/runtimetype';

//  Create a typed object with the initial value "Hello"
const message = Type({msg:'Hello'}, (expectedType, receivedType) => {
    // Handle the type error here
    console.error(`type ${receivedType} is not assignable to type ${expectedType}`);
});
```

### Supported Types

`runtimetype` supports the following primitive types:

* `number`
* `string`
* `boolean`
* `function`
* `undefined`
* `symbol`
* `bigint`

It also supports the following object types:

* `array`
* `object`
* `class`



## Usage Examples
Here are some usage examples of runtimetype:

Checking function argument types:

```typescript
import { Type } from '@asddaniel/runtimetype';

function addNumbers(a: number, b: number): number {
    // Check that the arguments are numbers
    a = Type({value:a});
    b = Type({value:b});

    return a.value + b.value;
}
```



## Benefits of Using `runtimetype`

Using `runtime` offers several advantages, including:

* Enhanced code robustness: By ensuring that the values you pass to your functions and the properties you assign to your objects are of the correct type and cannot be executed with truncated values, you can reduce the risk of type errors.

* Improved code readability: By using runtimetype, you can make your code more explicit and easier to understand, as the types of variables and properties are clearly specified.

* Enhanced code maintainability de votre code : En utilisant `runtimetype`, you can make your code easier to maintain, as it is easier to detect and correct type errors.

## Conclusion

`runtimetype` is a powerful tool that can help you enhance the robustness, readability, and maintainability of your JavaScript code. It is easy to use and can be integrated into your project within minutes.