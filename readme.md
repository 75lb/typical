<a id="api-typical"></a>

- [typical](#api-typical) 
  - [isNumber](#api-isNumber)

# typical

Isomorphic, functional type-checking for Javascript.



**Example**

```
import t from 'typical'
const allDefined = array.every(t.isDefined)
```


<a id="api-isNumber"></a>

## isNumber

Returns true if input is a number (including infinity). It is a more reasonable alternative to `typeof n` which returns `number` for `NaN`.

**Returns**: `boolean`

**Params**

n | * | The input to test

**Example**

```
> t.isNumber(0)
true
> t.isNumber(1)
true
> t.isNumber(1.1)
true
> t.isNumber(0xff)
true
> t.isNumber(0644)
true
> t.isNumber(6.2e5)
true
> t.isNumber(NaN)
false
> t.isNumber(Infinity)
true
```

