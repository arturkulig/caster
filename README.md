# caster.js

Little library that has few functions to make best guess while casting unknown (or just various values) to other type. There are times where language itself tries to do it, but this is for creating **most useful** output possible for various scenarios.

#Docs
```javascript
toNumber(input: any): number
```
For whatever input, outputs a valid number useful for further computation.
..assuming you agree on `0` being more useful than `NaN`.

```javascript
toString(input: any): string
```
Converts any input to most human-readable string. That should be not useful for dumping a variable for purpose of a debugging, but will do simplified user output.

```javascript
toArray(input: any): Array<any>
```
Returns given array or wraps defined (yet not a `null`) value in an array.

```javascript
toObject(input: any): {[id:string]: any}
```
Returns an object to given input.
Deals with: undefined, null, string, number, Map.


```javascript
toFormData(input: {[id:string]: any}): FormData
```
>TODO
