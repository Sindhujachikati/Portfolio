// Enhanced JavaScript with better animations and interactions

// Theme toggle functionality
const themeToggle = document.getElementById("theme-toggle");
const themeIcon = themeToggle.querySelector("i");
const themeText = themeToggle.querySelector("span");

function updateThemeIcon() {
  const isDark = document.body.classList.contains("dark-mode");
  themeIcon.className = isDark ? "fas fa-sun" : "fas fa-moon";
  themeText.textContent = isDark ? "Light Mode" : "Dark Mode";
}

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  updateThemeIcon();
  
  // Add a subtle animation to the toggle button
  themeToggle.style.transform = "scale(0.95)";
  setTimeout(() => {
    themeToggle.style.transform = "";
  }, 150);
});

// Initialize theme icon
updateThemeIcon();

// Enhanced scroll reveal animation
const reveals = document.querySelectorAll(".reveal");

const scrollHandler = () => {
  const windowHeight = window.innerHeight;
  const elementTop = reveals[0]?.getBoundingClientRect().top || 0;
  
  reveals.forEach((el, index) => {
    const elementTop = el.getBoundingClientRect().top;
    const elementVisible = 150;
    
    if (elementTop < windowHeight - elementVisible) {
      el.classList.add("visible");
      
      // Add staggered animation for child elements
      const animatedElements = el.querySelectorAll('.highlight, .project, #skills li, #certifications li, #education li');
      animatedElements.forEach((item, itemIndex) => {
        setTimeout(() => {
          item.style.opacity = "0";
          item.style.transform = "translateY(20px)";
          item.style.transition = "all 0.6s ease";
          
          setTimeout(() => {
            item.style.opacity = "1";
            item.style.transform = "translateY(0)";
          }, 100);
        }, itemIndex * 100);
      });
    }
  });
};

window.addEventListener("scroll", scrollHandler);
scrollHandler(); // Trigger once on load

// Smooth scrolling for navigation links
document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Add hover effects to navigation
document.querySelectorAll('nav a').forEach(link => {
  link.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-3px) scale(1.05)';
  });
  
  link.addEventListener('mouseleave', function() {
    this.style.transform = '';
  });
});

// Add typing effect to header
const headerTitle = document.querySelector('header h1');
if (headerTitle) {
  const text = headerTitle.textContent;
  headerTitle.textContent = '';
  
  let i = 0;
  const typeWriter = () => {
    if (i < text.length) {
      headerTitle.textContent += text.charAt(i);
      i++;
      setTimeout(typeWriter, 100);
    }
  };
  
  // Start typing effect after a delay
  setTimeout(typeWriter, 500);
}

// Add parallax effect to header
window.addEventListener('scroll', () => {
  const header = document.querySelector('header');
  const scrolled = window.pageYOffset;
  const rate = scrolled * -0.5;
  header.style.transform = `translateY(${rate}px)`;
});

// Add loading animation to project links
document.querySelectorAll('.project a').forEach(link => {
  link.addEventListener('click', function(e) {
    // Add loading state
    const originalText = this.innerHTML;
    this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
    
    // Reset after a short delay (simulating loading)
    setTimeout(() => {
      this.innerHTML = originalText;
    }, 1000);
  });
});

// Add counter animation for skills
const animateCounters = () => {
  const counters = document.querySelectorAll('#skills li');
  counters.forEach((counter, index) => {
    setTimeout(() => {
      counter.style.opacity = '0';
      counter.style.transform = 'translateX(-20px)';
      
      setTimeout(() => {
        counter.style.transition = 'all 0.6s ease';
        counter.style.opacity = '1';
        counter.style.transform = 'translateX(0)';
      }, 100);
    }, index * 200);
  });
};

// Trigger counter animation when skills section is visible
const skillsSection = document.querySelector('#skills');
if (skillsSection) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounters();
        observer.unobserve(entry.target);
      }
    });
  });
  
  observer.observe(skillsSection);
}

// Add floating animation to project icons
document.querySelectorAll('.project-icon').forEach(icon => {
  icon.addEventListener('mouseenter', function() {
    this.style.animation = 'float 2s ease-in-out infinite';
  });
  
  icon.addEventListener('mouseleave', function() {
    this.style.animation = '';
  });
});

// Add CSS for floating animation
const style = document.createElement('style');
style.textContent = `
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
  }
`;
document.head.appendChild(style);

// Add ripple effect to buttons
function createRipple(event) {
  const button = event.currentTarget;
  const ripple = document.createElement('span');
  const rect = button.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  const x = event.clientX - rect.left - size / 2;
  const y = event.clientY - rect.top - size / 2;
  
  ripple.style.width = ripple.style.height = size + 'px';
  ripple.style.left = x + 'px';
  ripple.style.top = y + 'px';
  ripple.classList.add('ripple');
  
  button.appendChild(ripple);
  
  setTimeout(() => {
    ripple.remove();
  }, 600);
}

// Add ripple effect to resume button
const resumeBtn = document.querySelector('.resume-btn');
if (resumeBtn) {
  resumeBtn.addEventListener('click', createRipple);
}

// Add ripple effect to top resume button
const topResumeBtn = document.querySelector('.top-resume-btn');
if (topResumeBtn) {
  topResumeBtn.addEventListener('click', createRipple);
}

// Add CSS for ripple effect
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
  .ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.3);
    transform: scale(0);
    animation: ripple-animation 0.6s linear;
    pointer-events: none;
  }
  
  @keyframes ripple-animation {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
`;
document.head.appendChild(rippleStyle);

// Add scroll progress indicator
const progressBar = document.createElement('div');
progressBar.style.cssText = `
  position: fixed;
  top: 0;
  left: 0;
  width: 0%;
  height: 3px;
  background: linear-gradient(90deg, #667eea, #764ba2);
  z-index: 9999;
  transition: width 0.3s ease;
`;
document.body.appendChild(progressBar);

window.addEventListener('scroll', () => {
  const scrollTop = document.documentElement.scrollTop;
  const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrollPercent = (scrollTop / scrollHeight) * 100;
  progressBar.style.width = scrollPercent + '%';
});

// Add back to top button
const backToTop = document.createElement('button');
backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
backToTop.style.cssText = `
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: var(--gradient);
  color: white;
  border: none;
  cursor: pointer;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
  z-index: 1000;
  box-shadow: var(--shadow);
`;

document.body.appendChild(backToTop);

window.addEventListener('scroll', () => {
  if (window.pageYOffset > 300) {
    backToTop.style.opacity = '1';
    backToTop.style.visibility = 'visible';
  } else {
    backToTop.style.opacity = '0';
    backToTop.style.visibility = 'hidden';
  }
});

backToTop.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// Add hover effect to back to top button
backToTop.addEventListener('mouseenter', function() {
  this.style.transform = 'translateY(-3px) scale(1.1)';
});

backToTop.addEventListener('mouseleave', function() {
  this.style.transform = '';
});

console.log('Portfolio enhanced with modern animations and interactions! 🚀');
