document.addEventListener('DOMContentLoaded', function() {
    let currentSlide = 0;
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const totalSlides = slides.length;
    
    function showSlide(n) {
        slides.forEach(slide => {
            slide.classList.remove('active');
        });
        dots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        currentSlide = (n + totalSlides) % totalSlides;
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }
    
    function autoSlide() {
        showSlide(currentSlide + 1);
    }
    
    let slideInterval = setInterval(autoSlide, 3200);
    
    document.querySelector('.prev').addEventListener('click', () => {
        clearInterval(slideInterval);
        showSlide(currentSlide - 1);
        slideInterval = setInterval(autoSlide, 3200);
    });
    
    document.querySelector('.next').addEventListener('click', () => {
        clearInterval(slideInterval);
        showSlide(currentSlide + 1);
        slideInterval = setInterval(autoSlide, 3200);
    });
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            clearInterval(slideInterval);
            showSlide(index);
            slideInterval = setInterval(autoSlide, 3200);
        });
    });
    
   showSlide(0);
    
    document.querySelector('.slider').addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });
    
    document.querySelector('.slider').addEventListener('mouseleave', () => {
        slideInterval = setInterval(autoSlide, 3200);
    });

    let currentTestimonial = 0;
    const testimonials = document.querySelectorAll('.testimonial-slide');
    const totalTestimonials = testimonials.length;

    function showTestimonial(n) {
        testimonials.forEach(testimonial => {
            testimonial.classList.remove('active');
        });
        
        currentTestimonial = (n + totalTestimonials) % totalTestimonials;
        testimonials[currentTestimonial].classList.add('active');
    }

    document.querySelector('.prev-testimonial').addEventListener('click', () => {
        showTestimonial(currentTestimonial - 1);
    });

    document.querySelector('.next-testimonial').addEventListener('click', () => {
        showTestimonial(currentTestimonial + 1);
    });

    setInterval(() => {
        showTestimonial(currentTestimonial + 1);
    }, 5000);

    showTestimonial(0);
});