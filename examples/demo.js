var Router = require("../");

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
