// Shared nav + footer + tweaks panel for all pages.
// Usage: include <script src="assets/site.js" data-page="home"></script> at end of body.
(function(){
  const script = document.currentScript;
  const activePage = (script && script.dataset.page) || "home";

  // Compute path prefix based on actual URL depth so links work from subfolders too.
  // Anything inside /blog/ needs ../ to reach root files.
  const path = window.location.pathname;
  const inBlog = /\/blog\//.test(path);
  const prefix = inBlog ? "../" : "";

  const navLinks = [
    { href: prefix + "index.html#offerings", label: "Work with me", page: "home" },
    { href: prefix + "index.html#about",     label: "About",        page: "home" },
    { href: prefix + "blog/index.html",      label: "Blog",         page: "blog" },
    { href: prefix + "contact.html",         label: "Contact",      page: "contact" }
  ];

  const topStrip = `
    <div class="topstrip">
      <div class="wrap">
        <span><span class="dot"></span>Open for Q3 2026 workshops · Singapore + Remote</span>
        <span>Est. 2026 · EN / 中文</span>
      </div>
    </div>`;

  const nav = `
    <nav class="main">
      <div class="wrap">
        <a href="${activePage === 'home' ? '#' : prefix + 'index.html'}" class="brand"><span class="mark">G</span>GEARGINA</a>
        <ul>
          ${navLinks.map(l => `<li><a href="${l.href}" ${l.page===activePage?'class="active"':''}>${l.label}</a></li>`).join("")}
        </ul>
        <a href="${prefix}contact.html" class="btn">Book a call
          <svg class="arr" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
        </a>
      </div>
    </nav>`;

  const footer = `
    <footer>
      <div class="wrap">
        <div class="foot-top">
          <div>
            <a href="${prefix}index.html" class="brand"><span class="mark">G</span>GEARGINA</a>
            <p class="foot-blurb" style="margin-top:16px;">AI coaching and workshops for curious humans. Based in Singapore, working globally.</p>
          </div>
          <div>
            <h5>Work</h5>
            <ul>
              <li><a href="${prefix}index.html#offerings">Workshops</a></li>
              <li><a href="${prefix}index.html#offerings">1:1 Coaching</a></li>
              <li><a href="${prefix}contact.html">Book a call</a></li>
            </ul>
          </div>
          <div>
            <h5>Read</h5>
            <ul>
              <li><a href="${prefix}blog/index.html">Blog</a></li>
              <li><a href="${prefix}index.html#testi">Reviews</a></li>
              <li><a href="${prefix}index.html#about">About</a></li>
            </ul>
          </div>
          <div>
            <h5>Say hi</h5>
            <ul>
              <li><a href="mailto:hello@iamcoachgina.com">hello@iamcoachgina.com</a></li>
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

  // Inject footer
  const footHost = document.getElementById("site-footer");
  if (footHost) footHost.innerHTML = footer;
})();
