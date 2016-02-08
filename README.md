# modweb-router

Object based router with Express-style route format.

## Example

```javascript
var Router = require("modweb-router");

var pages = [
	{
		href: "/test",
		routes: [ "/test-:year/:page" ],
		custom: "data"
	}
];

var router = new Router(pages);

var page = router.resolve("/test-2016/5");

console.log(page);
```

Outputs:
```javascript
{ page:
   { href: '/test',
     routes: [ '/test-:year/:page' ],
     custom: 'data' },
  params: { year: '2016', page: '5' } }
```

## License

MIT
