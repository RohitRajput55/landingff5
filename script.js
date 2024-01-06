function toggleAnswer(id) {
    // Hide all answers
    var answers = document.querySelectorAll('.answer');
    answers.forEach(function(answer) {
      answer.style.display = 'none';
    });

    // Show the clicked answer
    var clickedAnswer = document.getElementById(id);
    clickedAnswer.style.display = (clickedAnswer.style.display === 'none' || clickedAnswer.style.display === '') ? 'block' : 'none';
  }

  const wrapper = document.querySelector(".wrapper");
  const carousel = document.querySelector(".carousel");
  const firstCardWidth = carousel.querySelector(".card").offsetWidth;
  const arrowBtns = document.querySelectorAll(".wrapper i");
  const carouselChildrens = [...carousel.children];
  
  let isDragging = false, isAutoPlay = true, startX, startScrollLeft, timeoutId;
  
  // Get the number of cards that can fit in the carousel at once
  let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);
  
  // Insert copies of the last few cards to beginning of carousel for infinite scrolling
  carouselChildrens.slice(-cardPerView).reverse().forEach(card => {
      carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
  });
  
  // Insert copies of the first few cards to end of carousel for infinite scrolling
  carouselChildrens.slice(0, cardPerView).forEach(card => {
      carousel.insertAdjacentHTML("beforeend", card.outerHTML);
  });
  
  // Scroll the carousel at appropriate postition to hide first few duplicate cards on Firefox
  carousel.classList.add("no-transition");
  carousel.scrollLeft = carousel.offsetWidth;
  carousel.classList.remove("no-transition");
  
  // Add event listeners for the arrow buttons to scroll the carousel left and right
  arrowBtns.forEach(btn => {
      btn.addEventListener("click", () => {
          carousel.scrollLeft += btn.id == "left" ? -firstCardWidth : firstCardWidth;
      });
  });
  
  const dragStart = (e) => {
      isDragging = true;
      carousel.classList.add("dragging");
      // Records the initial cursor and scroll position of the carousel
      startX = e.pageX;
      startScrollLeft = carousel.scrollLeft;
  }
  
  const dragging = (e) => {
      if(!isDragging) return; // if isDragging is false return from here
      // Updates the scroll position of the carousel based on the cursor movement
      carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
  }
  
  const dragStop = () => {
      isDragging = false;
      carousel.classList.remove("dragging");
  }
  
  const infiniteScroll = () => {
      // If the carousel is at the beginning, scroll to the end
      if(carousel.scrollLeft === 0) {
          carousel.classList.add("no-transition");
          carousel.scrollLeft = carousel.scrollWidth - (2 * carousel.offsetWidth);
          carousel.classList.remove("no-transition");
      }
      // If the carousel is at the end, scroll to the beginning
      else if(Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth) {
          carousel.classList.add("no-transition");
          carousel.scrollLeft = carousel.offsetWidth;
          carousel.classList.remove("no-transition");
      }
  
      // Clear existing timeout & start autoplay if mouse is not hovering over carousel
      clearTimeout(timeoutId);
      if(!wrapper.matches(":hover")) autoPlay();
  }
  
  const autoPlay = () => {
      if(window.innerWidth < 800 || !isAutoPlay) return; // Return if window is smaller than 800 or isAutoPlay is false
      // Autoplay the carousel after every 2500 ms
      timeoutId = setTimeout(() => carousel.scrollLeft += firstCardWidth, 2500);
  }
  autoPlay();
  
  carousel.addEventListener("mousedown", dragStart);
  carousel.addEventListener("mousemove", dragging);
  document.addEventListener("mouseup", dragStop);
  carousel.addEventListener("scroll", infiniteScroll);
  wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));
  wrapper.addEventListener("mouseleave", autoPlay);



  gsap.to(".bubble--container", 20, {
    rotation: 360,
    transformOrigin: "left 50%",
    repeat: -1,
    ease: "none"
  });
  
  var quotes = [
    '"Thank you so much for all of your help with everything!',
    '"Hands down the best support I have ever received."',
    '"The best service I have ever received!"',
    '"We could not have done it without you!"',
    '"Beyond grateful for the service I received!"',
    '"A wonderful experience all around!"'
  ];
  
  var previousInt = 0;
  
  function animateOut() {
    gsap.fromTo(".text", 2, { opacity: 1 }, { opacity: 0 });
  }
  
  function animateIn() {
    gsap.fromTo(".text", 2, { opacity: 0 }, { opacity: 1 });
  }
  
  // returns a random integer for the quote randomizer
  function getRandomInt() {
    return Math.floor(Math.random() * quotes.length);
  }
  
  function handleAnimation() {
    var randomInt = getRandomInt();
  
    // prevents the new quote from being the same as the previous quote
    while (randomInt == previousInt) {
      randomInt = getRandomInt();
    }
  
    previousInt = randomInt;
  
    // fades the animation out after a second
    setTimeout(() => {
      animateOut();
    }, 1000);
  
    // changes the text of the quote after 2.8 seconds
    setTimeout(() => {
      document.querySelector(".text").innerHTML = quotes[randomInt];
    }, 2800);
  
    // fades the quote back in after 3 seconds
    setTimeout(() => {
      animateIn();
    }, 3000);
  }
  
  // changes the quote every 7 seconds
  setInterval(handleAnimation, 7000);
  