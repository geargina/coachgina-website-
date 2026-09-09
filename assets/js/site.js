// Shared nav + footer for all pages (top strip, hamburger nav, footer, analytics tag).
// Usage: include <script src="assets/js/site.js" data-page="home"></script> at end of body.
(function(){
  const script = document.currentScript;
  const activePage = (script && script.dataset.page) || "home";

  // Compute path prefix based on actual URL depth so links work from subfolders too.
  // Anything inside /blog/ needs ../ to reach root files.
  const path = window.location.pathname;
  const inBlog = /\/blog\//.test(path);
  const prefix = inBlog ? "../" : "";

  const navLinks = [
    { href: prefix + "ai-workshops-singapore.html", label: "Workshops", page: "workshops" },
    { href: prefix + "index.html#about",     label: "About",        page: "home" },
    { href: prefix + "speaking.html",        label: "Speaking",     page: "speaking" },
    { href: prefix + "blog/index.html",      label: "Blog",         page: "blog" },
    { href: prefix + "contact.html",         label: "Contact",      page: "contact" }
  ];

  const topStrip = `
    <div class="topstrip">
      <div class="wrap">
        <span><span class="dot"></span>Booking Q4 2026 workshops<span class="strip-more"> · Singapore + Online</span></span>
      </div>
    </div>`;

  const nav = `
    <nav class="main">
      <div class="wrap">
        <a href="${activePage === 'home' ? '#' : prefix + 'index.html'}" class="brand"><img class="mark" src="${prefix}assets/img/logo/mark.svg" alt="" width="28" height="28" />GEARGINA</a>
        <ul id="nav-menu">
          ${navLinks.map(l => `<li><a href="${l.href}" ${l.page===activePage?'class="active"':''}>${l.label}</a></li>`).join("")}
        </ul>
        <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="nav-menu" aria-label="Menu">
          <span></span><span></span><span></span>
        </button>
        <a href="${prefix}contact.html" class="btn">Get in touch
          <svg class="arr" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
        </a>
      </div>
    </nav>`;

  const footer = `
    <footer>
      <div class="wrap">
        <div class="foot-top">
          <div>
            <a href="${prefix}index.html" class="brand"><img class="mark" src="${prefix}assets/img/logo/mark.svg" alt="" width="28" height="28" />GEARGINA</a>
            <p class="foot-blurb" style="margin-top:16px;">AI coaching and workshops for curious humans. Based in Singapore, working globally.</p>
          </div>
          <div>
            <h2 class="foot-h">Work</h2>
            <ul>
              <li><a href="${prefix}ai-workshops-singapore.html">Workshops</a></li>
              <li><a href="${prefix}claude-workshop-singapore.html">Claude workshop</a></li>
              <li><a href="${prefix}speaking.html">Speaking</a></li>
              <li><a href="${prefix}case-studies.html">Case studies</a></li>
              <li><a href="${prefix}index.html#offerings">1:1 Coaching</a></li>
              <li><a href="${prefix}contact.html">Get in touch</a></li>
            </ul>
          </div>
          <div>
            <h2 class="foot-h">Read</h2>
            <ul>
              <li><a href="${prefix}blog/index.html">Blog</a></li>
              <li><a href="${prefix}index.html#testi">Reviews</a></li>
              <li><a href="${prefix}index.html#about">About</a></li>
            </ul>
          </div>
          <div>
            <h2 class="foot-h">Say hi</h2>
            <ul>
              <li><a href="mailto:hello@iamcoachgina.com">hello@iamcoachgina.com</a></li>
              <li><a href="https://www.linkedin.com/in/gearginatan/" target="_blank" rel="noopener">LinkedIn</a></li>
              <li><a href="https://www.instagram.com/i_am_coachgina/" target="_blank" rel="noopener">Instagram</a></li>
              <li><a href="${prefix}contact.html">Contact form</a></li>
              <li><a href="${prefix}privacy.html">Privacy</a></li>
              <li><a href="${prefix}terms.html">Terms</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div class="wordmark">GEARGINA</div>
      <div class="foot-bottom">
        <div class="wrap">
          <span>© 2026 Geargina · All rights reserved</span>
          <span>Built by a human + an AI</span>
        </div>
      </div>
    </footer>`;

  // Inject top strip + nav at top
  const navHost = document.getElementById("site-nav");
  if (navHost) navHost.innerHTML = topStrip + nav;

  // Mobile nav. The hamburger only renders at <=960px; the handlers are harmless
  // above that width because the button is display:none and cannot be clicked.
  const navEl = navHost ? navHost.querySelector("nav.main") : null;
  const navToggle = navHost ? navHost.querySelector(".nav-toggle") : null;
  const navMenu = navHost ? navHost.querySelector("#nav-menu") : null;

  function setNavOpen(open){
    if (!navEl || !navToggle) return;
    navEl.classList.toggle("open", open);
    navToggle.setAttribute("aria-expanded", open ? "true" : "false");
  }

  if (navToggle && navEl) {
    navToggle.addEventListener("click", function(){
      setNavOpen(!navEl.classList.contains("open"));
    });
    document.addEventListener("keydown", function(e){
      if (e.key !== "Escape") return;
      if (!navEl.classList.contains("open")) return;
      setNavOpen(false);
      navToggle.focus();
    });
  }

  if (navMenu) {
    navMenu.addEventListener("click", function(e){
      if (e.target && e.target.closest && e.target.closest("a")) setNavOpen(false);
    });
  }

  // Inject footer
  const footHost = document.getElementById("site-footer");
  if (footHost) footHost.innerHTML = footer;

  // Vercel Web Analytics. 404s until analytics is switched on for the project,
  // which is expected and harmless.
  if (document.body) {
    const insights = document.createElement("script");
    insights.defer = true;
    insights.src = "/_vercel/insights/script.js";
    document.body.appendChild(insights);
  }
})();
