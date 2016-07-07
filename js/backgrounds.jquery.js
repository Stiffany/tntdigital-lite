(function ( $ ) {

    $.fn.backgrounds = function( options ) {

        // This is the easiest way to have default options.
        var settings = $.extend({
            'duration': 6000, // Milliseconds determining duration between slide changes
            'transition': 'horizontal' // Boolean determines the direction of transition. Default is 'horizontal'
        }, options );

        // Store the root object
        var rootObj = this;
        // Store the window
        var windowObj = $(window);
        // Array to store image urls
        var images = getImages(rootObj);
        // Store the duration between slide changes
        var duration = settings['duration'];
        // Store the transition type
        var transition = settings['transition'];
        // Store the current slide
        var slideIndex = 1;
        // Store the total number of slides
        var totalSlides = 0;
        // Store the interval
        var timerInterval;
        // Store bg width
        var windowWidth = windowObj.outerWidth(true);
        // Store bg height
        var windowHeight = windowObj.outerHeight(true);
        // Store boolean to say whether transition is running
        var isTransitioning = false;
        // Store the current slide
        var currentSlide;
        // Store the next slide
        var nextSlide;
        // Store whether window is being resized or not
        var isResizing;

        function getImages(obj) {
            // Return array
            var returnArray = [];
            // Loop through all img tags and add src to array
            obj.find('img').each(function(index) {
                // Get img source
                var src = $(this).attr('src');
                // Hide image
                $(this).css('display', 'none');
                // Add to array
                returnArray.push(src);
            });

            return returnArray;
        }

        function startSlides() {
            // Create interval
            timerInterval = setTimeout(goToNextSlide, duration);
        }

        function goToNextSlide() {
            slideIndex++;
            if(slideIndex > totalSlides) {
                slideIndex = 1;
            }
            goToSlide(slideIndex);

            // Clear interval and start timer again
            resetTimer();
        }

        function goToSlide(slideNum) {
            // Set to next slide
            nextSlide = rootObj.find('[data-index="' + slideIndex + '"]');

            // Store the type of easing
            var easeType = 'easeInOutExpo';

            if(transition == 'horizontal') {
                // Make sure the window width is up to date
                windowWidth = windowObj.outerWidth(true);

                // Move the new slide to the edge of the
                // left hand side of the window
                nextSlide.css({
                    'top': '0px',
                    'left': windowWidth + 'px',
                    'display': 'block'
                });

                // Animate the current slide across the screen
                currentSlide.animate({
                    'left': -windowWidth + 'px'
                }, 2000, easeType, function() {
                    // Move the current slide to the edge of the
                    // left hand side of the window
                    currentSlide.css({
                        'top': '0px',
                        'left': windowWidth + 'px',
                        'display': 'block'
                    });
                    currentSlide = nextSlide;
                });

                // Animate the next slide across the screen
                nextSlide.animate({
                    'left': '0px'
                }, 2000, easeType);
            } else if(transition == 'vertical') {
                // Make sure the window height is up to date
                windowHeight = windowObj.outerHeight(true);

                // Move current slide to the edge of the
                // left hand side of the window
                nextSlide.css({
                    'top': windowHeight + 'px',
                    'left': '0px',
                    'display': 'block'
                });

                // Animate the current slide across the screen
                currentSlide.animate({
                    'top': -windowHeight + 'px'
                }, 2000, easeType, function() {
                    // Move the current slide to the edge of the
                    // top edge of the window
                    currentSlide.css({
                        'top': windowHeight + 'px',
                        'left': '0px',
                        'display': 'none'
                    });
                    currentSlide = nextSlide;
                });

                // Animate the next slide across the screen
                nextSlide.animate({
                    'top': '0px'
                }, 2000, easeType);
            } else {
                currentSlide.fadeOut(3000, 'easeInCubic', function() {
                    currentSlide = nextSlide;
                });
                nextSlide.fadeIn(3000, 'easeInCubic');
            }
        }

        function resetSlides() {
            if(transition == 'horizontal') {
                // Make sure the window width is up to date
                windowWidth = windowObj.outerWidth(true);

                // Set all slides to start position
                rootObj.find('[data-index]').css({
                    'top': '0px',
                    'left': windowWidth + 'px',
                    'display': 'none'
                });
            } else {
                // Make sure the window height is up to date
                windowHeight = windowObj.outerHeight(true);

                // Set all slides to start position
                rootObj.find('[data-index]').css({
                    'top': -windowHeight + 'px',
                    'left': '0px',
                    'display': 'none'
                });
            }

            if(nextSlide != null) {
                // Move the new slide to the edge of the
                // left hand side of the window
                nextSlide.css({
                    'top': '0px',
                    'left': '0px',
                    'display': 'block'
                });
            }
        }

        function resetTimer() {
            // Clear the timer
            clearTimer();
            // Reset the timer
            startSlides();
        }

        function clearTimer() {
            // Clear the timer
            clearInterval(timerInterval);
        }

        function onResizeStartHandler() {
            // Clear the timer
            clearTimer();

            // Reposition slides
            resetSlides();
        }

        function onResizeEndHandler() {
            // Reset the timer
            startSlides();
        }

        function init(obj) {
            // Loop through slides array and create element for each one
            $.each(images, function(index) {

                if(transition == 'horizontal' || transition == 'vertical') {
                    // Calculate distance left of element
                    var left = 100 * index;
                } else {
                    var left = 0;
                }

                // Store the display setting
                var display = 'display: none;';

                // Create element for background image
                var image = '<div style="position: absolute; width: 100%; height: 100%; left: ' + left + '%; background: url(\'' + images[index] + '\') no-repeat center center; background-size: cover; ' + display + '" data-index="' + (index + 1) + '"></div>';

                // Write element to the DOM
                obj.append(image);

                // Increment the total number of slides
                totalSlides++;
            });

            currentSlide = obj.find('[data-index="1"]');

            currentSlide.fadeIn(500, function() {
                startSlides();
            });

            // Stores variable that declares whether resize has started
            isResizing = false;
            //$(window).resize(onResizeStartHandler);

            // Function that updates canvas on window resize end
            //onWindowResize(onResizeEndHandler);
        }

        /*-----------------------------------------------------------------------------------------------

         Function that triggers once the resize event is COMPLETE, instead of continuously
         while the window is resized.

         Using it is pretty simple:

         onWindowResize(function() {
         // handle the resize event here
         ...
         });

         Initializing a page (by executing the resize handler when the page loads) couldn't be easier:

         onWindowResize(function() {
         ...
         })(); // these parenthesis does the trick

         https://github.com/louisremi/jquery-smartresize

         ----------------------------------------------------------------------------------------------*/
        function onWindowResize(c,t){onresize=function(){clearTimeout(t);t=setTimeout(c,100)};return c};

        // Initialise the slideshow
        init(rootObj);
    };

}( jQuery ));