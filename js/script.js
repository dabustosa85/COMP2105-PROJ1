$(document).ready(function () {
    const initialClouds = 5;
    const totalStars = 300;
    const messageFadeDuration = 300;
    const starAppearanceDelayMax = 5000;
    const cloudSizeRange = { min: 0.5, max: 1.2 };
    const cloudAnimationDurationRange = { min: 15, max: 30 };
    const starAnimationDurationRange = { min: 1, max: 2 };
    const dayMessage = "What a beautiful day 🌞";
    const nightMessage = "What a peaceful and serene night 🌝";

    // Generate clouds initially if not in dark mode
    if (!$('body').hasClass('dark-mode')) {
        generateClouds(initialClouds);
    }

    // Toggle theme and update UI components on switch click
    $('#switch').click(function () {
        $('body').toggleClass('dark-mode');
        $('.switch-circle').toggleClass('switched');

        // Update UI based on current theme mode
        if ($('body').hasClass('dark-mode')) {
            // Switch to night mode: hide sun icon, show moon, remove clouds, and generate stars
            $('.icon-sun').hide();
            $('.icon-moon').show();
            $('.cloud').remove();
            generateStars(totalStars);
            changeMessage(nightMessage, true);
        } else {
            // Switch to day mode: show sun icon, hide moon, remove stars, and generate clouds
            $('.icon-sun').show();
            $('.icon-moon').hide();
            $('.star').remove();
            generateClouds(initialClouds);
            changeMessage(dayMessage, false);
        }
    });

    // Updates the message with a fade effect based on the current mode
    function changeMessage(message, isNight) {
        $("#message").slideUp(messageFadeDuration, function () {
            $(this).text(message).css({
                "opacity": "0",
                "color": isNight ? "#FFF" : "#000"
            }).slideDown(messageFadeDuration).animate({opacity: 1}, 500);
        });
    }

    // Generates cloud elements with varying sizes and animation durations
    function generateClouds(numberOfClouds) {
        $('.cloud').remove(); // Clear existing clouds before generating new ones

        for (let i = 0; i < numberOfClouds; i++) {
            const cloud = $('<div>').addClass('cloud');
            const size = Math.random() * (cloudSizeRange.max - cloudSizeRange.min) + cloudSizeRange.min;
            const animationDuration = Math.random() * (cloudAnimationDurationRange.max - cloudAnimationDurationRange.min) + cloudAnimationDurationRange.min;

            cloud.css({
                left: `${-10}%`, // Position clouds off-screen initially for entrance animation
                top: `${Math.random() * 80}%`,
                transform: `scale(${size})`,
                opacity: Math.random() * (0.8 - 0.4) + 0.4,
                animation: `moveClouds ${animationDuration}s linear infinite`
            });

            $('body').append(cloud);
        }
    }

    // Generates star elements with random delays and animation durations for twinkling effect
    function generateStars(numberOfStars) {
        $('.star').remove(); // Clear existing stars before generating new ones

        for (let i = 0; i < numberOfStars; i++) {
            const delay = Math.random() * starAppearanceDelayMax;

            setTimeout(function () {
                // Ensure stars are added only if in dark mode, avoiding stars appearing after mode switch
                if ($('body').hasClass('dark-mode')) {
                    const star = $('<div>').addClass('star');
                    const animationDuration = Math.random() * (starAnimationDurationRange.max - starAnimationDurationRange.min) + starAnimationDurationRange.min;

                    star.css({
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        animation: `blink ${animationDuration}s infinite ease-in-out alternate`
                    });

                    $('body').append(star);
                }
            }, delay);
        }
    }
});
