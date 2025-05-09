window.onload = function () {
  setTimeout(() => {
    window.scrollTo(0, 0);
  }, 10);

  const projectLinks = {
    Sidestore: "https://github.com/SideStore/SideStore",
    Countdown: "https://github.com/neoarz/Countdown-App",
    StikNES: "https://stiknes.com/",
    Neosign: "https://discord.gg/MhhydftA2u",
    StikDebug: "https://stikdebug.xyz/",
  };

  // Make project cards clickable
  document.querySelectorAll(".project-card, .archived-project-card").forEach((card) => {
    card.addEventListener("click", function () {
      const projectTitle = this.querySelector(".project-title").textContent.trim().split("\n")[0].trim();
      
      for (const key in projectLinks) {
        if (projectTitle.includes(key)) {
          window.open(projectLinks[key], "_blank");
          break;
        }
      }
    });
  });
  
  // Enhanced hover effect for social buttons
  document.querySelectorAll(".social-button").forEach((button) => {
    button.addEventListener("mouseenter", function() {
      this.style.transform = "translateY(-5px) scale(1.05)";
    });
    
    button.addEventListener("mouseleave", function() {
      this.style.transform = "";
    });
  });
  
  // Horizontal scrolling for about/skills cards
  const scrollDots = document.querySelectorAll('.scroll-dot');
  const scrollWrapper = document.querySelector('.scroll-wrapper');
  const scrollContainer = document.querySelector('.horizontal-scroll-container');
  let currentIndex = 0;
  let userInteracted = false;
  
  // Function to scroll to a specific card
  function scrollToCard(index) {
    if (index < 0) index = 0;
    if (index > scrollDots.length - 1) index = scrollDots.length - 1;
    
    currentIndex = index;
    
    // Update active state
    document.querySelector('.scroll-dot.active').classList.remove('active');
    scrollDots[index].classList.add('active');
    
    // Scroll to the corresponding card
    scrollWrapper.style.transform = `translateX(-${index * 50}%)`;
  }
  
  // Click handling for dots
  scrollDots.forEach((dot, index) => {
    dot.addEventListener('click', function() {
      scrollToCard(index);
    });
  });
  
  // Mouse wheel scrolling for desktop - improved for trackpad
  scrollContainer.addEventListener('wheel', function(e) {
    e.preventDefault();
    
    // Check if it's likely a trackpad horizontal swipe (deltaX is significant)
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY) && Math.abs(e.deltaX) > 5) {
      if (e.deltaX > 0) {
        scrollToCard(currentIndex + 1);
      } else {
        scrollToCard(currentIndex - 1);
      }
    } 
    // Regular mouse wheel or vertical trackpad scroll
    else if (Math.abs(e.deltaY) > 5) {
      if (e.deltaY > 0) {
        scrollToCard(currentIndex + 1);
      } else {
        scrollToCard(currentIndex - 1);
      }
    }
  }, { passive: false });
  
  // Add click handling to cards to navigate between them
  document.querySelector('.about-card').addEventListener('click', function(e) {
    if (!e.target.closest('a')) {
      scrollToCard(1); // Scroll to skills card
    }
  });
  
  document.querySelector('.skills-card').addEventListener('click', function(e) {
    if (!e.target.closest('a')) {
      scrollToCard(0); // Scroll to about card
    }
  });
  
  // Add keyboard arrow navigation
  document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowRight') {
      scrollToCard(currentIndex + 1);
    } else if (e.key === 'ArrowLeft') {
      scrollToCard(currentIndex - 1);
    }
  });
  
  // Touch swiping for mobile
  let startX, moved;
  
  scrollContainer.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    moved = false;
  }, {passive: true});
  
  scrollContainer.addEventListener('touchmove', () => {
    moved = true;
  }, {passive: true});
  
  scrollContainer.addEventListener('touchend', (e) => {
    if (!moved) return;
    
    const endX = e.changedTouches[0].clientX;
    const diff = startX - endX;
    
    if (Math.abs(diff) > 50) { // Minimum swipe distance
      if (diff > 0) { // Swipe left
        scrollToCard(currentIndex + 1);
      } else { // Swipe right
        scrollToCard(currentIndex - 1);
      }
    }
  }, {passive: true});
}; 