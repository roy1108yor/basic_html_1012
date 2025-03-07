$(document).ready(function() {
    const greetings = ["你好！", "欢迎！", "很高兴见到你！", "祝你今天愉快！"];
    let currentIndex = 0;

    $("#changeGreeting").click(function() {
        currentIndex = (currentIndex + 1) % greetings.length;
        $("#greeting").text(greetings[currentIndex]);

        // 添加一个简单的动画效果
        $("#greeting").hide().fadeIn(500);
    });
    
    // Carousel functionality
    // Initialize carousel variables
    let slideIndex = 0;
    const slides = $(".slide");
    const indicators = $(".indicator");
    const totalSlides = slides.length;
    let slideInterval;
    const intervalTime = 5000; // Time between automatic slides (5 seconds)
    
    // Function to display a specific slide
    function showSlide(index) {
        // Handle index boundaries
        if (index >= totalSlides) {
            slideIndex = 0;
        } else if (index < 0) {
            slideIndex = totalSlides - 1;
        } else {
            slideIndex = index;
        }
        
        // Remove active class from all slides and indicators
        slides.removeClass("active");
        indicators.removeClass("active");
        
        // Add active class to current slide and indicator
        $(slides[slideIndex]).addClass("active");
        $(indicators[slideIndex]).addClass("active");
    }
    
    // Function to move to next slide
    function nextSlide() {
        showSlide(slideIndex + 1);
    }
    
    // Function to move to previous slide
    function prevSlide() {
        showSlide(slideIndex - 1);
    }
    
    // Start automatic slideshow
    function startSlideshow() {
        // Clear any existing interval
        if (slideInterval) {
            clearInterval(slideInterval);
        }
        
        // Set new interval
        slideInterval = setInterval(nextSlide, intervalTime);
    }
    
    // Pause slideshow on user interaction
    function pauseSlideshow() {
        clearInterval(slideInterval);
    }
    
    // Event listeners for navigation buttons
    $(".carousel-button.next").click(function() {
        pauseSlideshow();
        nextSlide();
        startSlideshow();
    });
    
    $(".carousel-button.prev").click(function() {
        pauseSlideshow();
        prevSlide();
        startSlideshow();
    });
    
    // Event listeners for indicators
    $(".indicator").click(function() {
        pauseSlideshow();
        const index = $(this).data("index");
        showSlide(index);
        startSlideshow();
    });
    
    // Pause slideshow when mouse enters carousel
    $(".carousel").mouseenter(function() {
        pauseSlideshow();
    });
    
    // Resume slideshow when mouse leaves carousel
    $(".carousel").mouseleave(function() {
        startSlideshow();
    });
    
    // Initialize the carousel
    showSlide(slideIndex);
    startSlideshow();
});