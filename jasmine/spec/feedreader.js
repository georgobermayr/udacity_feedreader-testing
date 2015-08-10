/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
         // Check for definition and existence of allFeeds array
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        // Check for existence and correct definition fo URL and name in the feeds
        describe('This feed has', function() {
            // Iterate through all elements of the allFeeds array
            allFeeds.forEach(function(allFeeds) {
                // check for URL definition and existence
                it('a url', function() {
                    expect(allFeeds.url).toBeDefined();
                    expect(allFeeds.url.length).not.toBe(0);
                });
                // check for name definition and existence
                it('and a name', function() {
                    expect(allFeeds.name).toBeDefined();
                    expect(allFeeds.name.length).not.toBe(0);
                });
            });
        });
    });

    // Test Suite to check if menu is not visible on launch and
    // behaves correct on click
    describe('The menu', function() {

        // If the menu-hidden class is attached to the document
        // body the menu is not visibla
        it('is hidden on start', function() {
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
        // First click should attach the class to the body and
        // therefore show the menu, secound click should detach the
        // class and hide the menu.
        it('changes visibility on click', function() {
            $('.menu-icon-link').trigger('click');
            expect($('body').hasClass('menu-hidden')).toBe(false);

            $('.menu-icon-link').trigger('click');
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
    });

    // Test suite to check for correct feed initialization
    describe('Initial Entries', function() {
        // Async load of the loadFeed function with the first entry
        beforeEach(function(done) {
            loadFeed(0, done);
        });

        // Check if DOM elements are present displaying the loaded feed
        it('at least on .entry element is present', function() {
            expect($('.feed .entry').length).toBeGreaterThan(0);
        });
    });

    // Test suite for check on feed change
    describe('New Feed Selection', function() {
        // Declare comparison variable
        var oldTitle;

        // Async load of the loadFeed function with
        // different than entry 0
        beforeEach(function(loadAnotherFeed) {
            // Get the currently show title on the page for later comparison
            oldTitle = $('.header-title').html();
            loadFeed(1, loadAnotherFeed);
        });

        // Back to normal after execution of the test
        afterEach(function(done) {
            loadFeed(0, done);
        });

        // Compare the current title with the old title
        it('changes display of feeds', function() {
            expect($('.header-title').html()).not.toBe(oldTitle);
        });
    });
}());
