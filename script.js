
gsap.registerPlugin(ScrollTrigger);

const root = document.documentElement;
const body = document.body;

const switchButton = document.querySelector("#switch");
const darkButton = document.querySelector("#toggledark");
const replayButton = document.querySelector("#replay");
const progressBar = document.querySelector("#progressBar");

const contactForm = document.querySelector("#contactForm");
const formNotice = document.querySelector("#formNotice");

// Footer year
document.querySelector("#year").textContent = new Date().getFullYear();

// Dark mode toggle
darkButton.addEventListener("click", () => {
  root.classList.toggle("dark");

  const isDark = root.classList.contains("dark");

  darkButton.textContent = isDark
    ? "Switch to Light"
    : "Switch to Dark";
});

// Switch maroon and gold accents
switchButton.addEventListener("click", () => {
  body.classList.toggle("alternate-orange");

  const isGold = body.classList.contains("alternate-orange");

  switchButton.textContent = isGold
    ? "Switch to Maroon"
    : "Switch to Gold";
});

// Intro animation
const introTimeline = gsap.timeline({
  paused: true,
  defaults: {
    duration: 0.8,
    ease: "power3.out"
  }
});

introTimeline
  .from(".top-controls", {
    y: -20,
    opacity: 0
  })
  .from(".profile-heading > *", {
    y: 25,
    opacity: 0,
    stagger: 0.15
  }, "-=0.35")
  .from(".hero-section > div:first-child > *", {
    y: 25,
    opacity: 0,
    stagger: 0.12
  }, "-=0.25")
  .from(".hero-image", {
    x: 35,
    opacity: 0,
    duration: 1
  }, "-=0.6");

// Play initial animation
introTimeline.play();

// Replay animation button
replayButton.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

  introTimeline.restart();
});

// Reveal sections on scroll
gsap.utils.toArray(".reveal").forEach((element) => {
  gsap.fromTo(
    element,
    {
      y: 35,
      opacity: 0
    },
    {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: "power2.out",
      scrollTrigger: {
        trigger: element,
        start: "top 88%",
        once: true
      }
    }
  );
});

// Scroll progress bar
gsap.to(progressBar, {
  scaleX: 1,
  ease: "none",
  scrollTrigger: {
    trigger: document.documentElement,
    start: "top top",
    end: "max",
    scrub: 0.2
  }
});

// Demo contact form
contactForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = document.querySelector("#name").value.trim();
  const eventType = document.querySelector("#eventType").value;
  const eventDate = document.querySelector("#eventDate").value;
  const guests = document.querySelector("#guests").value;

  let message = `Thank you${name ? `, ${name}` : ""}! `;
  message += `Your inquiry for ${eventType.toLowerCase()} has been prepared.`;

  if (eventDate) {
    message += ` Preferred date: ${eventDate}.`;
  }

  if (guests) {
    message += ` Estimated guests: ${guests}.`;
  }

  message += " This demo does not send an actual email.";

  formNotice.textContent = message;
  contactForm.reset();
});

// Respect reduced-motion preferences
if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  gsap.globalTimeline.timeScale(2);
}
