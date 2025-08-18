$(document).ready(function() {
    // 页面加载完成后的初始化动画
    function initializePageAnimations() {
        // 为信息卡片添加渐入动画
        $('.info-card').each(function(index) {
            $(this).css({
                'opacity': '0',
                'transform': 'translateY(50px)'
            });
            
            setTimeout(() => {
                $(this).css({
                    'transition': 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                    'opacity': '1',
                    'transform': 'translateY(0)'
                });
            }, 200 + (index * 100));
        });
        
        // 主标题动画
        $('h1').css({
            'opacity': '0',
            'transform': 'translateY(-30px)'
        }).animate({
            'opacity': 1
        }, 800).css({
            'transform': 'translateY(0)',
            'transition': 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
        });
    }
    
    // 轮播图功能增强
    let slideIndex = 0;
    const slides = $(".slide");
    const indicators = $(".indicator");
    const totalSlides = slides.length;
    let slideInterval;
    let intervalTime = 5000; // 自动切换时间间隔
    let isAnimating = false; // 防止动画冲突
    
    // 显示指定幻灯片的函数（增强版）
    function showSlide(index, direction = 'next') {
        if (isAnimating) return; // 如果正在动画中，忽略操作
        
        // 处理索引边界
        if (index >= totalSlides) {
            slideIndex = 0;
        } else if (index < 0) {
            slideIndex = totalSlides - 1;
        } else {
            slideIndex = index;
        }
        
        isAnimating = true;
        
        // 移除所有活动状态
        slides.removeClass("active prev");
        indicators.removeClass("active");
        
        // 设置动画方向
        if (direction === 'prev') {
            slides.css('transform', 'translateX(-100%)');
            $(slides[slideIndex]).css('transform', 'translateX(100%)');
        } else {
            slides.css('transform', 'translateX(100%)');
            $(slides[slideIndex]).css('transform', 'translateX(-100%)');
        }
        
        // 执行切换动画
        setTimeout(() => {
            $(slides[slideIndex]).addClass("active").css('transform', 'translateX(0)');
            $(indicators[slideIndex]).addClass("active");
            
            setTimeout(() => {
                isAnimating = false;
            }, 500);
        }, 50);
    }
    
    // 下一张幻灯片
    function nextSlide() {
        showSlide(slideIndex + 1, 'next');
    }
    
    // 上一张幻灯片
    function prevSlide() {
        showSlide(slideIndex - 1, 'prev');
    }
    
    // 开始自动轮播
    function startSlideshow() {
        if (slideInterval) {
            clearInterval(slideInterval);
        }
        slideInterval = setInterval(nextSlide, intervalTime);
    }
    
    // 暂停自动轮播
    function pauseSlideshow() {
        clearInterval(slideInterval);
    }
    
    // 导航按钮事件处理
    $(".carousel-button.next").click(function() {
        pauseSlideshow();
        nextSlide();
        startSlideshow();
        
        // 添加按钮点击动画效果
        $(this).addClass('clicked');
        setTimeout(() => {
            $(this).removeClass('clicked');
        }, 200);
    });
    
    $(".carousel-button.prev").click(function() {
        pauseSlideshow();
        prevSlide();
        startSlideshow();
        
        // 添加按钮点击动画效果
        $(this).addClass('clicked');
        setTimeout(() => {
            $(this).removeClass('clicked');
        }, 200);
    });
    
    // 指示器点击事件处理
    $(".indicator").click(function() {
        if (isAnimating) return;
        
        pauseSlideshow();
        const targetIndex = $(this).data("index");
        const currentIndex = slideIndex;
        const direction = targetIndex > currentIndex ? 'next' : 'prev';
        
        showSlide(targetIndex, direction);
        startSlideshow();
        
        // 添加指示器点击动画
        $(this).addClass('clicked');
        setTimeout(() => {
            $(this).removeClass('clicked');
        }, 300);
    });
    
    // 轮播图鼠标悬停事件
    $(".carousel").mouseenter(function() {
        pauseSlideshow();
        $(this).addClass('hovered');
    }).mouseleave(function() {
        startSlideshow();
        $(this).removeClass('hovered');
    });
    
    // 信息卡片交互效果增强
    $('.info-card').hover(
        function() {
            // 鼠标进入时的效果
            $(this).find('.card-icon').css({
                'transform': 'scale(1.1) rotate(5deg)',
                'transition': 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
            });
        },
        function() {
            // 鼠标离开时的效果
            $(this).find('.card-icon').css({
                'transform': 'scale(1) rotate(0deg)',
                'transition': 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
            });
        }
    );
    
    // 卡片点击波纹效果
    $('.info-card').click(function(e) {
        const card = $(this);
        const ripple = $('<div class="ripple"></div>');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.css({
            'position': 'absolute',
            'border-radius': '50%',
            'background': 'rgba(59, 130, 246, 0.3)',
            'width': size + 'px',
            'height': size + 'px',
            'left': x + 'px',
            'top': y + 'px',
            'transform': 'scale(0)',
            'animation': 'ripple-animation 0.6s ease-out',
            'pointer-events': 'none'
        });
        
        card.css('position', 'relative').append(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
    
    // 滚动时的视差效果
    $(window).scroll(function() {
        const scrollTop = $(this).scrollTop();
        const windowHeight = $(this).height();
        
        // 轮播图视差效果
        $('.carousel').css({
            'transform': `translateY(${scrollTop * 0.1}px)`
        });
        
        // 信息卡片滚动动画
        $('.info-card').each(function() {
            const cardTop = $(this).offset().top;
            const cardBottom = cardTop + $(this).outerHeight();
            
            if (cardTop < scrollTop + windowHeight && cardBottom > scrollTop) {
                $(this).addClass('in-viewport');
            }
        });
    });
    
    // 响应式处理
    function handleResponsive() {
        const windowWidth = $(window).width();
        
        // 移动端优化
        if (windowWidth <= 768) {
            // 减少自动切换时间
            intervalTime = 4000;
            
            // 简化动画效果
            $('.info-card').css({
                'transition': 'all 0.3s ease'
            });
        } else {
            // 桌面端恢复正常
            intervalTime = 5000;
            
            $('.info-card').css({
                'transition': 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
            });
        }
    }
    
    // 窗口大小改变时的处理
    $(window).resize(function() {
        handleResponsive();
    });
    
    // 键盘导航支持
    $(document).keydown(function(e) {
        switch(e.keyCode) {
            case 37: // 左箭头
                e.preventDefault();
                pauseSlideshow();
                prevSlide();
                startSlideshow();
                break;
            case 39: // 右箭头
                e.preventDefault();
                pauseSlideshow();
                nextSlide();
                startSlideshow();
                break;
        }
    });
    
    // 触摸滑动支持（移动端）
    let touchStartX = 0;
    let touchEndX = 0;
    
    $('.carousel').on('touchstart', function(e) {
        touchStartX = e.originalEvent.touches[0].clientX;
    });
    
    $('.carousel').on('touchmove', function(e) {
        e.preventDefault(); // 防止页面滚动
    });
    
    $('.carousel').on('touchend', function(e) {
        touchEndX = e.originalEvent.changedTouches[0].clientX;
        handleSwipe();
    });
    
    function handleSwipe() {
        const swipeThreshold = 50; // 最小滑动距离
        const swipeDistance = touchEndX - touchStartX;
        
        if (Math.abs(swipeDistance) > swipeThreshold) {
            pauseSlideshow();
            
            if (swipeDistance > 0) {
                // 向右滑动，显示上一张
                prevSlide();
            } else {
                // 向左滑动，显示下一张
                nextSlide();
            }
            
            startSlideshow();
        }
    }
    
    // 页面可见性API支持（节能优化）
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            pauseSlideshow();
        } else {
            startSlideshow();
        }
    });
    
    // 初始化所有功能
    function initialize() {
        handleResponsive();
        initializePageAnimations();
        showSlide(slideIndex);
        startSlideshow();
        
        // 延迟执行滚动检测
        setTimeout(() => {
            $(window).trigger('scroll');
        }, 500);
    }
    
    // 页面加载完成后初始化
    initialize();
});

// CSS动画关键帧（通过JavaScript动态添加）
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple-animation {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
    
    .carousel-button.clicked {
        transform: translateY(-50%) scale(0.9) !important;
    }
    
    .indicator.clicked {
        transform: scale(0.8) !important;
    }
    
    .info-card.in-viewport {
        animation: slideInUp 0.6s ease-out forwards;
    }
    
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .carousel.hovered .carousel-button {
        opacity: 1 !important;
    }
`;
document.head.appendChild(style);