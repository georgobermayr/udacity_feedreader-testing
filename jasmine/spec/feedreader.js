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
         // Check for definition and existance of allFeeds array
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        describe('This feed has', function() {
            // Iterate through all elements of the allFeeds array
            allFeeds.forEach(function(allFeeds) {
                // check for URL definition and existance
                it('a url', function() {
                    expect(allFeeds.url).toBeDefined();
                    expect(allFeeds.url.length).not.toBe(0);
                });
                // check for name definition and existance
                it('and a name', function() {
                    expect(allFeeds.name).toBeDefined();
                    expect(allFeeds.name.length).not.toBe(0);
                });
            });
        });
    });


    /* TODO: Write a new test suite named "The menu" */
    describe('The menu', function() {

        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        // If the menu-hidden class is attached to the document
        // body the menu is not visibla
        it('is hidden on start', function() {
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
         /* TODO: Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
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

    /* TODO: Write a new test suite named "Initial Entries" */
    describe('Initial Entries', function() {
        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test wil require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        // Async load of the loadFeed function with the first entry
        beforeEach(function(done) {
            loadFeed(0, done);
        });

        // Check if DOM elements are present displaying the loaded feed
        it('at least on .entry element is present', function() {
            expect($('.feed .entry').length).toBeGreaterThan(0);
        });
    });

    /* TODO: Write a new test suite named "New Feed Selection" */
    describe('New Feed Selection', function() {
        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
        // Get the currently show title on the page for later comparison
        var oldTitle = $('.header-title').html();

        // Async load of the loadFeed function with
        // different than current entry
        beforeEach(function(done) {
            loadFeed(2, done);
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
