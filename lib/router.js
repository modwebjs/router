var pathToRegexp = require("path-to-regexp");

function Router(pages) {
	this.pages = pages;
	this.jumps = {};
}

// call this when your pages are static or every time you mutate it
Router.prototype.mapJumpRoutes = function() {
	this.jumps = {};

	for (var i in this.pages) {
		var href = this.pages[i].href;

		if (href) {
			this.jumps[href] = this.pages[i];
		}
	}
};

Router.prototype.resolve = function(path) {
	var jumpRoute = this.jumps[path];

	if (jumpRoute) {
		return page;
	}

	for (var i in this.pages) {
		var page = this.pages[i];

		// skip unbound / floating pages
		if (!page.href && !page.routes) {
			continue;
		}

		if (path == page.href) {
			return { page: page, params: {} };
		}

		// nothing left to try here
		if (!page.routes) {
			continue;
		}

		// if it's a fresh page, convert to regex
		if (!page._routes) {
			var parsedRoutes = page.routes.map(function(pathStr) {
				var keys = [];
				var regex = pathToRegexp(pathStr, keys);
				regex.keys = keys;
				return regex;
			});

			Object.defineProperty(page, "_routes", {
				value: parsedRoutes,
				enumerable: false
			});
		}

		for (var j in page._routes) {
			var route = page._routes[j];

			// match the path against the regular expression
			var match = route.exec(path);

			// skip route if there's no match (null)
			if (!match) {
				continue;
			}

			// slice out the bit that matters
			var args = match.slice(1);
			var params = {};

			// populate the params
			for (var k in route.keys) {
				params[route.keys[k].name] = args[k];
			}

			// return a new object
			return { page: page, params: params };
		}
	}
};

module.exports = Router;
