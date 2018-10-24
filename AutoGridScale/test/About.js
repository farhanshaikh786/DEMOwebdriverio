var assert = require('assert');
describe('my webdriverio tests', function(){
	it('Github test',function() {
 		browser.url('https://ecs-digital.co.uk/about-us')
 		const title = browser.getTitle();
 		console.log('Title was: ' + title);
 		assert(title === 'About-us');
 	});
});