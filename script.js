document.addEventListener('DOMContentLoaded', () => {
  const gsap = window.gsap;
  const SplitText = window.SplitText;

  if (!gsap || !SplitText) {
    return;
  }

  gsap.registerPlugin(SplitText);

  const introTile = document.querySelector('.intro-tile');
  const heroNaam = document.getElementById('hero-naam');
  let splitNaam;
  let hoverTimer;

  if (introTile && heroNaam) {
    
    splitNaam = new SplitText(heroNaam, { type: "chars" });
    
    let isClickable = false;

    introTile.addEventListener('mouseenter', () => {
      
      // GSAP Splittext 3D animatie
      gsap.fromTo(splitNaam.chars, 
        { 
          y: -30, 
          opacity: 0, 
          scale: 1.5, 
          rotateX: -90, 
          color: "var(--accent-2)" 
        },
        { 
          y: 0, 
          opacity: 1, 
          scale: 1, 
          rotateX: 0, 
          color: "var(--text-color)", 
          stagger: 0.04, 
          duration: 0.6, 
          ease: "back.out(2)", 
          overwrite: "auto" 
        }
      );

      hoverTimer = setTimeout(() => {
        isClickable = true;
        introTile.classList.add('is-ready');
        
        gsap.to(introTile, { scale: 1.02, duration: 0.15, yoyo: true, repeat: 1 });
      }, 3000);
    });

    introTile.addEventListener('mouseleave', () => {
      clearTimeout(hoverTimer);
      isClickable = false;
      introTile.classList.remove('is-ready');
    });

    introTile.addEventListener('click', () => {
      if (isClickable) {
        document.body.classList.toggle('theme-blob-party');
        document.documentElement.classList.toggle('theme-blob-party');
      }
    });
  }
});