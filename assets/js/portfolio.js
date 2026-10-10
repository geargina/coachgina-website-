/* Geargina Tan — portfolio. Plain JS, no framework. All copy comes from window.DATA (data.js). */
(function () {
  'use strict';
  var D = window.DATA || {}, P = D.profile || {};
  var doc = document, root = doc.documentElement;
  var RM = window.matchMedia('(prefers-reduced-motion: reduce)');
  var FINE = window.matchMedia('(hover: hover) and (pointer: fine)');
  var $ = function (s, r) { return (r || doc).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || doc).querySelectorAll(s)); };
  var esc = function (s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); };
  var clamp = function (v, a, b) { return Math.min(b, Math.max(a, v)); };
  var pad2 = function (n) { return (n < 10 ? '0' : '') + n; };
  var slug = function (s) { return String(s).toLowerCase().replace(/[^a-z0-9]+/g, '-'); };

  /* ---------- shared bits ---------- */
  function tag(n, label) { return '<p class="tag rv"><b>' + pad2(n) + '</b> · ' + esc(label) + '</p>'; }
  /* suffix: optional visually-hidden keyword tail for crawlers and screen readers (visible words unchanged) */
  function h2(id, text, word, suffix) {
    return '<h2 class="h2" id="' + id + '"><span class="rv-mask"><span>' + esc(text) + ' <em>' + esc(word) + '</em></span></span>' +
      (suffix ? '<span class="sr-only">. ' + esc(suffix) + '</span>' : '') + '</h2>';
  }
  /* Idempotent render: a section that already has child elements (pre-rendered by scripts/prerender.mjs)
     is left alone; only the wiring below runs. */
  function fill(sel, html) {
    var el = typeof sel === 'string' ? $(sel) : sel;
    if (el && !el.firstElementChild) el.innerHTML = typeof html === 'function' ? html() : html;
    return el;
  }
  var ARROW = '<span class="arr" aria-hidden="true">↗</span>';

  /* concept line icons for skills without a brand logo (viewBox 48) */
  var dots = '';
  for (var k = 0; k < 12; k++) { var a = k / 12 * Math.PI * 2; dots += '<circle cx="' + (24 + Math.cos(a) * 16).toFixed(2) + '" cy="' + (24 + Math.sin(a) * 16).toFixed(2) + '" r="1.3" fill="currentColor" stroke="none"/>'; }
  var ICONS = {
    'OpenAI': '<path d="M24 6l15.6 9v18L24 42 8.4 33V15z"/><circle cx="24" cy="24" r="6"/><path d="M24 6v12M39.6 33l-10.4-6M8.4 33l10.4-6"/>',
    'HeyGen AI': '<rect x="8" y="8" width="32" height="32" rx="7"/><circle cx="24" cy="21" r="6"/><path d="M13 38c2-6 6-9 11-9s9 3 11 9"/>',
    'Vanta': '<path d="M8 10h8l8 22 8-22h8L28 40h-8z"/>',
    'SOC 2': '<path d="M24 5l15 6v11c0 10-6.5 17-15 21C15.5 39 9 32 9 22V11z"/><path d="M17 24l5 5 9-10"/>',
    'ISO 27001': '<circle cx="24" cy="19" r="12"/><circle cx="24" cy="19" r="6"/><path d="M17 29l-3 13 6-3 4 4M31 29l3 13-6-3-4 4"/>',
    'GDPR': dots + '<rect x="18.5" y="23" width="11" height="9" rx="1.6"/><path d="M20.5 23v-3a3.5 3.5 0 017 0v3"/>',
    'Risk workshops': '<path d="M24 7l18 32H6z"/><path d="M24 19v10"/><circle cx="24" cy="34" r="1" fill="currentColor"/>',
    'Policy authoring': '<path d="M12 6h17l9 9v27H12z"/><path d="M29 6v9h9M17 22h14M17 28h14M17 34h8"/>',
    'Salesforce': '<path d="M14.5 36a8 8 0 01-.8-15.9A10.5 10.5 0 0133.5 17a8.5 8.5 0 011.5 19z"/>',
    'Tableau': '<path d="M24 7v15M16.5 14.5h15M24 29v12M18 35h12M12 19v10M7 24h10M36 19v10M31 24h10"/>',
    'Power BI': '<rect x="9" y="26" width="7" height="15" rx="1.5"/><rect x="20.5" y="17" width="7" height="24" rx="1.5"/><rect x="32" y="7" width="7" height="34" rx="1.5"/>',
    'Microsoft Office 365': '<rect x="9" y="9" width="13" height="13" rx="2"/><rect x="26" y="9" width="13" height="13" rx="2"/><rect x="9" y="26" width="13" height="13" rx="2"/><rect x="26" y="26" width="13" height="13" rx="2"/>',
    'Canva': '<circle cx="24" cy="24" r="17"/><path d="M31 18c-2-2.4-5-3.4-8-2.4-4.6 1.6-6.4 7.6-3.6 11.8 2.2 3.3 6.8 4 10.2 1.6"/>',
    'Multimedia Suite': '<rect x="6" y="11" width="36" height="26" rx="4"/><path d="M21 19v10l8-5z"/><path d="M6 18h5M6 30h5M37 18h5M37 30h5"/>'
  };
  var GENERIC = '<circle cx="24" cy="24" r="15"/><path d="M24 15v18M15 24h18"/>';
  var CAP = '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round" aria-hidden="true"><path d="M1.5 6.5L8 3.5l6.5 3L8 9.5z"/><path d="M4.5 8v3c1.8 1.4 5.2 1.4 7 0V8M14.5 6.5v3.5"/></svg>';

  var SKILLS = [], BY_NAME = {};
  (D.skillGroups || []).forEach(function (g) {
    (g.skills || []).forEach(function (s) {
      var o = Object.assign({}, s, { family: g.family, n: SKILLS.length + 1 });
      SKILLS.push(o); BY_NAME[s.name] = o;
    });
  });
  function logoHTML(s, size) {
    var sz = size ? ' style="--sz:' + size + 'px"' : '';
    if (s && s.logo) {
      return '<span class="blogo" aria-hidden="true" style="--c:' + esc(s.hex || '#0d0d0d') + ';--m:url(/assets/img/portfolio/logos/' + esc(s.logo) + ')' + (size ? ';--sz:' + size + 'px' : '') + '"><i></i></span>';
    }
    var paths = (s && ICONS[s.name]) || GENERIC;
    return '<span class="cicon" aria-hidden="true"' + sz + '><svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="vector-effect:non-scaling-stroke">' + paths + '</svg></span>';
  }

  /* ---------- NAV + MENU ---------- */
  var navItems = (D.nav || []).map(function (l) { return { label: l, id: slug(l) }; });
  $('#navMark').textContent = P.initials || '';
  $('#navName').textContent = P.name || '';
  fill('#navLinks', function () { return navItems.map(function (n) { return '<li><a href="#' + n.id + '" data-id="' + n.id + '">' + esc(n.label) + '</a></li>'; }).join(''); });
  fill('#menuList', function () { return navItems.map(function (n, i) { return '<li><a href="#' + n.id + '" style="--i:' + i + '"><span>' + pad2(i + 1) + '</span>' + esc(n.label) + '</a></li>'; }).join(''); });

  /* ---------- HERO ---------- */
  var hv = P.heroVideo;
  var hasVideo = !!(hv && typeof hv === 'object' && (hv.webm || hv.mp4));
  var heroMedia = hasVideo
    ? '<video class="hero__video" muted loop playsinline preload="metadata" poster="' + esc(hv.poster || 'assets/video/hero.webp') + '" aria-label="' + esc(P.name) + ', AI educator and operator, introduces herself as an animated 3D character">' +
        /* mp4 (H.264) first: WebKit/iOS accepts the VP9 4:4:4 webm, loads metadata, then never decodes a frame
           and never errors, so it would never fall through. webm stays as a second source only. */
        (hv.mp4 ? '<source src="' + esc(hv.mp4) + '" type="video/mp4">' : '') +
        (hv.webm ? '<source src="' + esc(hv.webm) + '" type="video/webm">' : '') + '</video>'
    : '<picture><source srcset="assets/video/hero.webp" type="image/webp"><img src="assets/video/hero.png" width="768" height="960" alt="3D cartoon character of ' + esc(P.name) + ' standing in a white shirt and black trousers" fetchpriority="high" decoding="async"></picture>';
  var rh = P.roleHeading || [P.role || ''];
  fill('.hero',
    '<div class="hero__ghost" aria-hidden="true">' + esc((P.firstName || '').toUpperCase()) + '</div>' +
    '<figure class="hero__figure' + (hasVideo ? ' is-video' : '') + '">' + heroMedia + '</figure>' +
    (P.heroTranscript ? '<p class="hero__transcript">' + esc(P.heroTranscript) + '</p>' : '') +
    '<button class="sound" id="soundBtn" type="button" aria-label="Turn sound on"' + (hasVideo ? '' : ' hidden') + '><span aria-hidden="true">▶</span></button>' +
    '<div class="hero__copy">' +
      '<p class="hero__eyebrow rv" style="--i:2">' + esc(P.name) + ' · ' + esc(P.location) + '</p>' +
      '<h1 class="h1" id="heroTitle"><span class="sr-only">' + esc(P.name) + ', ' + esc(P.role) + '</span>' +
        '<span class="rv-mask" style="--i:3" aria-hidden="true"><span>' + esc(rh[0]) + '</span></span>' +
        (rh[1] ? '<span class="rv-mask" style="--i:4" aria-hidden="true"><span>&amp; <em>' + esc(rh[1]) + '</em></span></span>' : '') +
      '</h1>' +
    '</div>' +
    '<div class="hero__side">' +
      '<p class="hero__meta rv" style="--i:5"><b>' + esc(P.currentRole) + '</b><br>Since ' + esc(P.since) + '</p>' +
      '<div class="btns rv" style="--i:6">' +
        '<a class="btn btn--solid" href="#work">Explore work</a>' +
        '<a class="btn" href="#contact">Let’s talk</a>' +
        '<a class="btn" href="' + esc(P.resumePath) + '" download>CV <span aria-hidden="true">↓</span></a>' +
      '</div>' +
    '</div>');

  /* ---------- ABOUT ---------- */
  var idc = P.idCard || {};
  var strapTxt = '';
  for (var r = 0; r < 4; r++) strapTxt += '<span>' + esc(P.name) + ' · ' + esc(P.role) + '</span>';
  fill('#about', '<div class="wrap about__grid">' +
    '<div class="about__left">' + tag(1, 'About') +
      h2('aboutTitle', 'Hi, I’m', (P.firstName || '') + '.') +
      '<p class="lede rv" style="--i:1">' + esc(P.summary) + '</p>' +
      '<p class="about__extra rv" style="--i:2">' + esc(P.extraLine) + '</p>' +
      '<div class="btns rv" style="--i:3">' +
        '<a class="btn btn--solid" href="' + esc(P.resumePath) + '" download>CV <span aria-hidden="true">↓</span></a>' +
        (P.linkedin ? '<a class="btn" href="' + esc(P.linkedin) + '" target="_blank" rel="noopener">LinkedIn ' + ARROW + '</a>' : '') +
      '</div>' +
    '</div>' +
    '<div class="about__mid">' +
      '<div class="lanyard" id="lanyard">' +
        '<div class="strap" aria-hidden="true"><div class="strap__roll">' + strapTxt + strapTxt + '</div></div>' +
        '<div class="clip" aria-hidden="true"></div>' +
        '<button class="idcard" id="idcard" type="button" aria-pressed="false" title="Press to flip and read the back">' +
          '<span class="idcard__inner">' +
            '<span class="idcard__face idcard__front">' +
              '<span class="id__band">' + esc(idc.band) + '<i>' + esc(P.initials) + '</i></span>' +
              '<span class="id__photo"><span><img src="assets/img/portfolio/portrait-bust.webp" width="480" height="600" alt="' + esc(P.name) + ', AI educator and operator, Singapore" loading="lazy" decoding="async"></span></span>' +
              '<span class="id__name">' + esc(P.name) + '</span>' +
              '<span class="id__role">' + esc(P.role) + '</span>' +
              '<span class="id__rows">' + (idc.rows || []).map(function (row) { return '<span><b>' + esc(row[0]) + '</b>' + esc(row[1]) + '</span>'; }).join('') + '</span>' +
              '<span class="id__foot"><span class="barcode" aria-hidden="true"></span><span class="holo" aria-hidden="true"></span></span>' +
            '</span>' +
            '<span class="idcard__face idcard__back">' +
              '<span class="id__back">' +
                '<span class="id__back-t">What I am</span>' +
                (idc.back || []).map(function (l) { return '<span class="id__back-l">' + esc(l) + '</span>'; }).join('') +
                '<span class="id__sig">' + esc(P.name) + '</span>' +
                '<span class="id__found">' + esc(idc.foundLine) + '</span>' +
              '</span>' +
            '</span>' +
          '</span>' +
        '</button>' +
        '<span class="id__hint" aria-hidden="true">' + (FINE.matches ? 'Hover' : 'Tap') + ' to flip</span>' +
      '</div>' +
    '</div>' +
    '<div class="about__right">' +
      '<div class="facts rv" style="--i:2"><h3>Quick facts</h3><dl>' +
        (P.quickFacts || []).map(function (f) { return '<div><dt>' + esc(f[0]) + '</dt><dd>' + esc(f[1]) + '</dd></div>'; }).join('') +
      '</dl></div>' +
      (P.quote ? '<blockquote class="quote rv" style="--i:3">' + esc(P.quote) + '</blockquote>' : '') +
    '</div>' +
  '</div>');

  /* ---------- STACK ---------- */
  var families = (D.skillGroups || []).map(function (g) { return g.family; });
  fill('#stack', '<div class="wrap">' +
    '<div class="stack__head"><div>' + tag(2, 'Stack') + h2('stackTitle', 'The periodic table of my', 'stack.') + '</div>' +
      '<div class="chips rv" role="group" aria-label="Filter by family">' +
        '<button class="chip" type="button" aria-pressed="true" data-f="">All</button>' +
        families.map(function (f) { return '<button class="chip" type="button" aria-pressed="false" data-f="' + esc(f) + '">' + esc(f) + '</button>'; }).join('') +
      '</div></div>' +
    '<div class="ptable">' +
      '<div class="ptable__grid" id="ptGrid">' + SKILLS.map(function (s, i) {
        return '<button class="el" type="button" data-i="' + i + '" data-f="' + esc(s.family) + '" aria-label="' + esc(s.name) + ', ' + esc(s.family) + '">' +
          '<span class="el__n">' + s.n + '</span><span class="el__s" aria-hidden="true">' + esc(s.symbol) + '</span>' +
          '<span class="el__name" aria-hidden="true">' + esc(s.name) + '</span><span class="el__f" aria-hidden="true">' + esc(s.family) + '</span></button>';
      }).join('') + '</div>' +
      '<aside class="insp" id="insp" aria-live="polite" aria-label="Skill details"></aside>' +
    '</div></div>');

  /* ---------- WORK ---------- */
  function miniUI(kind, p) {
    var h = '';
    if (kind === 'chat') {
      h = '<div class="ui ui--chat"><div class="ui__bar" style="margin-bottom:auto"><span class="dot"></span>Group chat<small>' + esc(p.title) + '</small></div>' +
        '<div class="bub"><span class="sk" style="width:120px"></span><span class="sk" style="width:84px"></span></div>' +
        '<div class="bub me"><span class="sk" style="width:96px"></span></div>' +
        '<div class="bub"><span class="sk" style="width:140px"></span><span class="sk" style="width:60px"></span></div>' +
        '<div class="botcard"><b>Mr. Fox</b><span class="sk d" style="width:80%"></span><span class="row">Lead captured<span>✓</span></span><span class="row">CRM updated<span>✓</span></span></div>' +
        '<div class="typing"><i></i><i></i><i></i></div></div>';
    } else if (kind === 'controls') {
      var rows = (p.features || []).map(function (f, i) { return '<div class="crow"><span>' + esc(f) + '</span><b class="pill' + (i % 3 === 2 ? '' : ' ok') + '">' + (i % 3 === 2 ? 'Review' : 'OK') + '</b></div>'; }).join('');
      h = '<div class="ui"><div class="ui__bar"><span class="dot"></span>Programme<small>Vanta</small></div>' +
        '<div class="meter">' + (p.tech || []).filter(function (t) { return t !== 'Vanta'; }).map(function (t, i) { return '<div>' + esc(t) + '<i style="--w:' + [72, 58, 64][i % 3] + '%"></i></div>'; }).join('') + '</div>' + rows + '</div>';
    } else if (kind === 'slides') {
      h = '<div class="ui"><div class="slide"><span class="pill" style="align-self:flex-start">' + esc(p.kicker) + '</span><b>' + esc(p.title) + '</b><span class="sk" style="width:80%"></span><span class="sk" style="width:64%"></span><span class="sk" style="width:72%"></span><span class="slide__art" aria-hidden="true"><i style="--h:38%;--k:0"></i><i style="--h:56%;--k:1"></i><i style="--h:48%;--k:2"></i><i style="--h:74%;--k:3"></i><i style="--h:66%;--k:4"></i><i style="--h:88%;--k:5"></i></span></div>' +
        '<div class="thumbs"><span></span><span class="on"></span><span></span><span></span><span></span></div><div class="prog"><i></i></div></div>';
    } else if (kind === 'room') {
      var seats = ''; for (var s = 0; s < 40; s++) seats += '<i style="--k:' + s + '"></i>';
      h = '<div class="ui"><div class="room"><span class="board"></span><span class="fac"><i></i>Facilitator</span><div class="seats" aria-hidden="true">' + seats + '</div></div></div>';
    } else if (kind === 'tickets') {
      var tr = ''; [78, 54, 66, 42, 70].forEach(function (w, i) { tr += '<div class="trow"><span class="av"></span><span class="sk" style="--w:' + w + '%"></span><b class="pill' + (i < 2 ? ' ok' : '') + '">' + (i < 2 ? 'Bot' : 'Open') + '</b></div>'; });
      h = '<div class="ui"><div class="timer"><small>Response<br>time</small><b class="tmr" data-from="30" data-to="5">30:00</b></div>' + tr + '</div>';
    } else if (kind === 'terminal') {
      var st = [['12', 'systems'], ['5,000', 'sensors'], ['700', 'CCTVs'], ['200', 'devices']].map(function (x) { return '<div><b>' + x[0] + '</b><span>' + x[1] + '</span></div>'; }).join('');
      h = '<div class="ui"><div class="ui__bar"><span class="dot"></span>SMART command centre<small>Jewel</small></div>' +
        '<div class="stats" aria-hidden="true">' + st + '</div>' +
        '<div class="meter"><div>Tenants launched<i style="--w:100%"></i><em>270 / 270</em></div><div>Attractions<i style="--w:100%"></i><em>6 / 6</em></div></div>' +
        '<div class="crow"><span>Week one visitors</span><b class="pill ok">500,000</b></div></div>';
    } else if (kind === 'park') {
      var rides = [['Universal Studios Singapore', 'Open'], ['Dolphin Island', 'Open'], ['S.E.A. Aquarium', 'Open'], ['Adventure Cove Waterpark', 'Open']].map(function (x) { return '<div class="crow"><span>' + x[0] + '</span><b class="pill ok">' + x[1] + '</b></div>'; }).join('');
      h = '<div class="ui"><div class="ui__bar"><span class="dot"></span>Park status<small>Resorts World Sentosa</small></div>' + rides +
        '<div class="meter"><div>Footfall, event season<i style="--w:78%"></i><em>+57%</em></div><div>Season to annual pass<i style="--w:10%"></i><em>10%</em></div></div></div>';
    }
    return h;
  }
  var projects = D.projects || [];
  fill('#work', function () { return '<div class="wrap">' +
    '<div class="work__head"><div>' + tag(3, 'Work') + h2('workTitle', 'Things I’ve', 'built.') + '</div>' +
    '<p class="work__note rv">' + projects.length + ' projects. Hover, focus or tap a panel to open it.</p></div>' +
    '<div class="acc rv" id="acc">' + projects.map(function (p, i) {
      return '<article class="panel' + (i === 0 ? ' is-open' : '') + '" data-i="' + i + '" aria-labelledby="pt-' + esc(p.id) + '">' +
        '<button class="panel__spine" type="button" aria-expanded="' + (i === 0) + '" aria-controls="pb-' + esc(p.id) + '">' +
          '<span class="num">' + esc(p.index) + '</span><span class="vt" id="pt-' + esc(p.id) + '">' + esc(p.title) + '</span><span class="plus" aria-hidden="true">+</span></button>' +
        '<div class="panel__body" id="pb-' + esc(p.id) + '">' +
          '<div class="pb__text">' +
            '<p class="pb__kick"><b>' + esc(p.index) + '</b>' + esc(p.kicker) + '</p>' +
            '<h3 class="pb__title">' + esc(p.title) + '</h3>' +
            '<p class="pb__desc">' + esc(p.description) + '</p>' +
            '<ul class="pb__feat">' + (p.features || []).map(function (f) { return '<li>' + esc(f) + '</li>'; }).join('') + '</ul>' +
            '<ul class="pb__tech" aria-label="Tools">' + (p.tech || []).map(function (t) { return '<li class="tchip">' + logoHTML(BY_NAME[t] || { name: t }, 15) + esc(t) + '</li>'; }).join('') + '</ul>' +
          '</div>' +
          '<div class="pb__ui" role="img" aria-label="Illustrative interface sketch for ' + esc(p.title) + '">' + miniUI(p.ui, p) + '<span class="pb__ui-label" aria-hidden="true">Illustrative UI</span></div>' +
        '</div></article>';
    }).join('') + '</div></div>'; });

  /* ---------- SPEAKING (data) ---------- */
  var talks = D.speaking || [];
  /* ---------- WORKSHOPS ---------- */
  var W = D.workshops || { offers: [], testimonials: [] };
  fill('#workshops', function () { return '<span id="offerings"></span><div class="wrap">' +
    '<div class="ws__head"><div>' + tag(4, 'Workshops') + h2('wsTitle', 'Work with', 'me.', 'AI workshops and 1:1 tutoring, Singapore') + '</div>' +
    '<p class="ws__lede rv">' + esc(W.lede || '') + '</p></div>' +
    '<div class="offers">' + (W.offers || []).map(function (o, i) {
      return '<article class="offer rv" style="--i:' + i + '"><div class="offer__top"><span class="offer__idx">' + esc(o.index) + '</span><span class="offer__kind">' + esc(o.kind) + '</span></div>' +
        '<h3 class="offer__title">' + esc(o.title) + '</h3><p class="offer__body">' + esc(o.body) + '</p>' +
        '<ul class="offer__facts">' + (o.facts || []).map(function (f) { return '<li>' + esc(f) + '</li>'; }).join('') + '</ul>' +
        '<div class="offer__ctas"><a class="btn" href="' + esc(o.cta.href) + '">' + esc(o.cta.label) + ' <span class="arr" aria-hidden="true">↗</span></a>' +
        (o.more ? '<a class="offer__more" href="' + esc(o.more.href) + '">' + esc(o.more.label) + ' <span aria-hidden="true">↗</span></a>' : '') + '</div></article>';
    }).join('') + '</div>' +
    '<p class="tag rv ws__sub">What people say</p>' +
    '<div class="testi" id="testi">' + (W.testimonials || []).map(function (t, i) {
      return '<figure class="tq rv" style="--i:' + i + '"><blockquote>' + esc(t.quote) + '</blockquote>' +
        '<figcaption><span class="tq__av" aria-hidden="true">' + esc(t.initials) + '</span><span><b>' + esc(t.name) + '</b><small>' + esc(t.role) + '</small></span></figcaption></figure>';
    }).join('') + '</div>' +
    (W.cta ? '<div class="ws__cta rv"><div><h3>' + esc(W.cta.title) + '</h3><p>' + esc(W.cta.body) + '</p></div><div class="btns">' +
      '<a class="btn btn--solid" href="' + esc(W.cta.primary.href) + '">' + esc(W.cta.primary.label) + ' <span class="arr" aria-hidden="true">↗</span></a>' +
      (W.cta.secondary ? '<a class="btn" href="' + esc(W.cta.secondary.href) + '" target="_blank" rel="noopener">' + esc(W.cta.secondary.label) + '</a>' : '') + '</div></div>' : '') +
    '</div>'; });

  /* ---------- FAQ ---------- */
  fill('#faq', function () { return '<div class="wrap faq__grid">' +
    '<div class="faq__head">' + tag(5, 'Questions') + h2('faqTitle', 'Questions people', 'ask.') + '</div>' +
    '<div class="faq__list">' + (D.faq || []).map(function (f) {
      return '<details class="qa"><summary><span>' + esc(f.q) + '</span><i class="qa__m" aria-hidden="true">+</i></summary><p>' + esc(f.a) + '</p></details>';
    }).join('') + '</div></div>'; });

  /* ---------- SPEAKING ---------- */
  fill('#speaking', function () { return '<div class="wrap speak__grid">' +
    '<div class="speak__head">' + tag(6, 'Speaking') + h2('speakTitle', 'Always', 'teaching.', 'Conference talks and panels across Southeast Asia') +
      '<p class="speak__count rv">' + talks.length + ' stages and rooms</p></div>' +
    '<ol class="slist">' + talks.map(function (t, i) {
      return '<li class="srow rv" tabindex="0" style="--i:' + (i % 5) + '"><span class="n">' + pad2(i + 1) + '</span><span><span class="t">' + esc(t.title) + '</span><span class="s">' + esc(t.issuer) + '</span></span><span class="a" aria-hidden="true">↗</span></li>';
    }).join('') + '</ol></div>'; });

  /* ---------- EXPERIENCE ---------- */
  fill('#experience', function () { return '<div class="wrap exp__grid">' +
    '<div class="exp__head">' + tag(7, 'Experience') + h2('expTitle', 'The path so', 'far.') + '</div>' +
    '<div><ol class="tl" id="tl"><span class="tl__spine" aria-hidden="true"><i></i></span>' + (D.timeline || []).map(function (t) {
      var edu = t.kind === 'education';
      return '<li class="stop">' +
        '<p class="stop__y">' + esc(t.year) + (edu ? CAP + '<span class="sr">Education</span>' : '') + '</p>' +
        '<h3 class="stop__t">' + esc(t.title) + '</h3>' +
        '<p class="stop__p">' + esc(t.place) + '</p>' +
        (t.detail ? '<p class="stop__d">' + esc(t.detail) + '</p>' : '') + '</li>';
    }).join('') + '</ol>' +
    '<a class="next rv" href="#contact"><span>Next →</span><b><em class="it">Your team?</em></b></a></div></div>'; });

  /* ---------- NUMBERS ---------- */
  var ach = D.achievements || [];
  var fmt = function (n) { return Math.round(n).toLocaleString('en-US'); };
  fill('#numbers', function () { return '<div class="num__pin" id="numPin">' +
    '<div class="num__head"><div>' + tag(8, 'Numbers') + h2('numTitle', 'By the', 'numbers.') + '</div><div class="num__bar" aria-hidden="true"><i id="numBar"></i></div></div>' +
    '<ul class="track" id="track">' + ach.map(function (a, i) {
      var full = (a.prefix || '') + fmt(a.value) + (a.suffix || '');
      return '<li class="ncard" data-v="' + a.value + '">' +
        '<div class="ncard__top"><span class="ntile" aria-hidden="true">' + esc(a.logoText) + '</span><span class="nidx">' + pad2(i + 1) + ' / ' + pad2(ach.length) + '</span></div>' +
        '<div class="ncard__bot"><div class="ncard__txt"><b>' + esc(a.label) + '</b><span>' + esc(a.caption) + '</span><small>' + esc(a.detail) + '</small></div>' +
        '<p class="nval' + (full.length > 6 ? ' long' : '') + '"><span class="sr">' + esc(full) + '</span><span aria-hidden="true">' + esc(a.prefix || '') + '<span class="cnt">' + fmt(a.value) + '</span>' + esc(a.suffix || '') + '</span></p></div></li>';
    }).join('') + '<li class="ncard ncard--end" aria-hidden="true"><p><em class="it">and counting</em> →</p></li></ul></div>'; });

  /* ---------- CONTACT + FOOTER ---------- */
  var C = D.contact || {}, lines = C.headingLines || [];
  var headAria = lines.join(' ');
  var headHTML = lines.map(function (line, li) {
    var words = line.split(' ');
    return '<span class="rv-mask" style="--i:' + li + '"><span class="line">' + words.map(function (w, wi) {
      var chars = Array.from(w).map(function (c) { return '<span class="ch">' + esc(c) + '</span>'; }).join('');
      var last = li === lines.length - 1 && wi === words.length - 1;
      return (last ? '<em class="w it">' : '<span class="w">') + chars + (last ? '</em>' : '</span>');
    }).join(' ') + '</span></span>';
  }).join('');
  var badgeTxt = C.badgeText || '';
  fill('#contact', '<div class="wrap">' + tag(9, 'Contact') +
    '<h2 class="contact__h" id="contactTitle" aria-label="' + esc(headAria) + '"><span aria-hidden="true">' + headHTML + '</span></h2>' +
    '<div class="contact__row"><div>' +
      '<div class="email rv"><a href="mailto:' + esc(P.email) + '">' + esc(P.email) + '</a><button class="copy" id="copyBtn" type="button">Copy</button><span class="sr" id="copyStatus" aria-live="polite"></span></div>' +
      '<div class="clinks rv" style="--i:1">' +
        (P.phone ? '<a href="' + esc(P.phoneHref) + '"><small>Phone</small><span>' + esc(P.phone) + '</span></a>' : '') +
        (P.linkedin ? '<a href="' + esc(P.linkedin) + '" target="_blank" rel="noopener"><small>LinkedIn</small><span>' + esc(P.linkedinLabel || P.linkedin) + ' ↗</span></a>' : '') +
        '<a href="' + esc(P.resumePath) + '" download><small>Résumé</small><span>CV ↓</span></a>' +
      '</div></div>' +
      '<a class="badge rv" style="--i:2" href="mailto:' + esc(P.email) + '" aria-label="Say hello by email">' +
        '<svg viewBox="0 0 150 150" aria-hidden="true"><defs><path id="bc" d="M75,75 m-58,0 a58,58 0 1,1 116,0 a58,58 0 1,1 -116,0"/></defs><text><textPath href="#bc" textLength="362">' + esc(badgeTxt) + '</textPath></text></svg>' +
        '<b aria-hidden="true">↗</b></a>' +
    '</div></div>');
  var SITE_LINKS = [['Workshops', 'ai-workshops-singapore.html'], ['Claude workshop', 'claude-workshop-singapore.html'], ['Speaking', 'speaking.html'], ['Case studies', 'case-studies.html'], ['1:1 Coaching', '#offerings'], ['Blog', 'blog/index.html'], ['Reviews', '#testi'], ['About', '#about'], ['Contact', 'contact.html'], ['WTFox.ai CRM', 'https://app.wtfox.ai/signup', 1], ['LinkedIn', 'https://www.linkedin.com/in/gearginatan/', 1], ['Instagram', 'https://www.instagram.com/i_am_coachgina/', 1], ['Privacy', 'privacy.html'], ['Terms', 'terms.html']];
  fill('#foot', '<div class="wrap"><nav class="foot__links" aria-label="Site">' + SITE_LINKS.map(function (l) { return '<a href="' + l[1] + '"' + (l[2] ? ' target="_blank" rel="noopener"' : '') + '>' + l[0] + '</a>'; }).join('') + '</nav>' +
    '<span>© <span id="footYear">' + new Date().getFullYear() + '</span> ' + esc(P.name) + '</span><span>Built by hand, no framework.</span><a href="#top">Back to top ↑</a></div>');
  var fy = $('#footYear'); if (fy) fy.textContent = new Date().getFullYear();

  /* =====================================================================
     BEHAVIOUR
     ===================================================================== */
  var hero = $('.hero');
  /* id-card hint depends on the viewer's pointer, not the pre-render machine's */
  var hint = $('.id__hint'); if (hint) hint.textContent = (FINE.matches ? 'Hover' : 'Tap') + ' to flip';
  requestAnimationFrame(function () { requestAnimationFrame(function () { hero.classList.add('is-ready'); }); });

  /* Reveal observer (once) */
  var revealEls = $$('.rv, .rv-mask');
  if ('IntersectionObserver' in window && !RM.matches) {
    var ro = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('is-in'); ro.unobserve(e.target); } });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
    revealEls.forEach(function (el) { ro.observe(el); });
  } else revealEls.forEach(function (el) { el.classList.add('is-in'); });

  /* Nav: active section indicator */
  var nav = $('#nav'), ind = $('#navInd'), linkEls = $$('#navLinks a');
  var activeId = null;
  function placeIndicator() {
    var a = activeId && $('#navLinks a[data-id="' + activeId + '"]');
    linkEls.forEach(function (l) { l.classList.toggle('is-active', l === a); });
    if (!a) { ind.style.opacity = '0'; return; }
    ind.style.opacity = '1'; ind.style.width = a.offsetWidth + 'px';
    ind.style.transform = 'translateX(' + (a.offsetLeft + 5) + 'px)';
  }
  if ('IntersectionObserver' in window) {
    var so = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { activeId = e.target.id; placeIndicator(); } });
    }, { rootMargin: '-45% 0px -50% 0px' });
    ['top', 'about', 'stack', 'work', 'workshops', 'speaking', 'experience', 'numbers', 'contact'].forEach(function (id) { var el = doc.getElementById(id); if (el) so.observe(el); });
  }

  /* Mobile menu */
  var menu = $('#menu'), menuBtn = $('#menuBtn'), menuClose = $('#menuClose');
  function openMenu() {
    menu.hidden = false; doc.body.classList.add('is-locked'); menuBtn.setAttribute('aria-expanded', 'true');
    requestAnimationFrame(function () { requestAnimationFrame(function () { menu.classList.add('is-open'); }); });
    setTimeout(function () { var f = $('a', menu); if (f) f.focus(); }, 60);
  }
  function closeMenu(focusBack) {
    menu.classList.remove('is-open'); doc.body.classList.remove('is-locked'); menuBtn.setAttribute('aria-expanded', 'false');
    setTimeout(function () { if (!menu.classList.contains('is-open')) menu.hidden = true; }, RM.matches ? 0 : 700);
    if (focusBack) menuBtn.focus();
  }
  menuBtn.addEventListener('click', openMenu);
  menuClose.addEventListener('click', function () { closeMenu(true); });
  $$('a', menu).forEach(function (a) { a.addEventListener('click', function () { closeMenu(false); }); });
  doc.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !menu.hidden) closeMenu(true);
    if (e.key === 'Tab' && !menu.hidden) {
      var f = $$('button, a', menu), first = f[0], last = f[f.length - 1];
      if (e.shiftKey && doc.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && doc.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });

  /* Hero video (gated: only runs when DATA.profile.heroVideo is set) */
  (function initHeroVideo() {
    if (!hasVideo) return;
    var video = $('.hero__video'), btn = $('#soundBtn');
    if (!video || !btn) return;
    /* markup ships preload="metadata" (phones); desktops upgrade to auto */
    if (!window.matchMedia('(max-width:860px)').matches) video.preload = 'auto';
    var userChose = false, inView = true;
    function sync() {
      var on = !video.muted;
      btn.firstChild.textContent = on ? '❚❚' : '▶';
      btn.setAttribute('aria-label', on ? 'Turn sound off' : 'Turn sound on');
    }
    function play() { var p = video.play(); return p && p.catch ? p : Promise.resolve(); }
    video.muted = false;
    /* Stall safety net: if no frame decodes (readyState < 2) or the source errors, retry on the mp4,
       then fall back to the poster as a plain <img> (same blend + mask via .hero__figure img). */
    var fellBack = false, posterShown = false;
    function mp4Src() { return hv.mp4 || ''; }
    function showPoster() {
      if (posterShown || video.readyState >= 2) return;
      posterShown = true;
      var img = doc.createElement('img');
      img.className = 'hero__poster'; img.src = hv.poster || video.getAttribute('poster') || '';
      img.alt = ''; img.setAttribute('aria-hidden', 'true'); img.decoding = 'async';
      video.parentNode.insertBefore(img, video);
      video.classList.add('is-stalled');
      video.addEventListener('playing', function () { if (img.parentNode) img.parentNode.removeChild(img); video.classList.remove('is-stalled'); }, { once: true });
    }
    function rescue() {
      if (video.readyState >= 2) return;
      var cur = video.currentSrc || '';
      if (!fellBack && mp4Src() && !/\.mp4(\?|$)/i.test(cur)) {
        fellBack = true;
        $$('source', video).forEach(function (s) { s.parentNode.removeChild(s); });
        video.src = mp4Src(); video.load(); play().catch(function () {});
        setTimeout(rescue, 2500);
      } else showPoster();
    }
    video.addEventListener('error', rescue, true);
    setTimeout(rescue, 2500);
    play().then(function () { btn.classList.remove('is-blocked'); sync(); }).catch(function () {
      video.muted = true; sync();
      btn.classList.add('is-blocked');
      play().catch(function () {});
    });
    function unlock(e) {
      ['pointerdown', 'keydown', 'touchend'].forEach(function (t) { window.removeEventListener(t, unlock, true); });
      if (userChose || (e && e.target && btn.contains(e.target))) return; // the sound button handles its own first press
      video.muted = false; btn.classList.remove('is-blocked');
      if (inView) play().catch(function () { video.muted = true; }).then(sync); else sync();
    }
    ['pointerdown', 'keydown', 'touchend'].forEach(function (t) { window.addEventListener(t, unlock, true); });
    btn.addEventListener('click', function (e) {
      e.stopPropagation(); userChose = true;
      video.muted = !video.muted; btn.classList.remove('is-blocked');
      if (video.paused && inView) play().catch(function () {});
      sync();
    });
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (en) {
        var r = en[0].intersectionRatio; inView = r >= 0.35;
        if (inView) play().catch(function () {}); else video.pause();
      }, { threshold: [0, 0.2, 0.35, 0.5, 1] }).observe(hero);
    }
  })();

  /* ID card: flip + damped pendulum */
  var card = $('#idcard'), lan = $('#lanyard'), mid = $('.about__mid');
  function setFlip(v) { card.classList.toggle('is-flipped', v); }
  var pressed = false;
  card.addEventListener('click', function () { pressed = !pressed; card.setAttribute('aria-pressed', String(pressed)); setFlip(pressed); });
  card.addEventListener('mouseenter', function () { if (FINE.matches) setFlip(!pressed); });
  card.addEventListener('mouseleave', function () { if (FINE.matches) setFlip(pressed); });
  if (!RM.matches) {
    var ang = 0, vel = 0, lastX = null, lastT = 0, running = false, prev = 0;
    mid.addEventListener('pointermove', function (e) {
      var now = performance.now();
      if (lastX !== null && now - lastT < 100) {
        var vx = (e.clientX - lastX) / Math.max(8, now - lastT);
        vel += clamp(vx * 0.9, -2.6, 2.6);
      }
      lastX = e.clientX; lastT = now;
    });
    mid.addEventListener('pointerleave', function () { lastX = null; });
    var step = function (t) {
      if (!running) return;
      var dt = Math.min(3, (t - (prev || t)) / 16.667 || 1); prev = t;
      var idle = Math.sin(t / 1400) * 1.3 + Math.sin(t / 2300) * 0.6;
      vel += -(ang - idle) * 0.025 * dt;
      vel *= Math.pow(0.93, dt);
      ang = clamp(ang + vel * dt, -24, 24);
      lan.style.transform = 'rotate(' + ang.toFixed(3) + 'deg)';
      requestAnimationFrame(step);
    };
    new IntersectionObserver(function (en) {
      var vis = en[0].isIntersecting;
      if (vis && !running) { running = true; prev = 0; requestAnimationFrame(step); }
      else if (!vis) running = false;
    }).observe(mid);
  }

  /* Stack: periodic table */
  var grid = $('#ptGrid'), tiles = $$('.el', grid), insp = $('#insp');
  function cols() { return window.matchMedia('(max-width:980px)').matches ? 4 : 8; }
  function waveDelays() { var c = cols(); tiles.forEach(function (t, i) { t.style.setProperty('--d', ((Math.floor(i / c) + i % c) * 40) + 'ms'); }); }
  waveDelays();
  function inspect(i) {
    var s = SKILLS[i]; if (!s) return;
    tiles.forEach(function (t, j) { t.classList.toggle('is-on', j === i); });
    insp.innerHTML = '<div class="insp__top"><span>No. ' + s.n + '</span><span>' + esc(s.symbol) + '</span></div>' +
      '<div class="insp__logo">' + logoHTML(s, 150) + '</div>' +
      '<p class="insp__name">' + esc(s.name) + '</p><p class="insp__fam">' + esc(s.family) + '</p>' +
      (s.uses && s.uses.length ? '<div class="insp__uses"><h3>Used in</h3><ul>' + s.uses.map(function (u) { return '<li>' + esc(u) + '</li>'; }).join('') + '</ul></div>' : '');
  }
  var current = 0;
  inspect(0);
  tiles.forEach(function (t, i) {
    var go = function () { if (current !== i) { current = i; inspect(i); } };
    t.addEventListener('mouseenter', go); t.addEventListener('focus', go); t.addEventListener('click', go);
  });
  $$('.chip').forEach(function (ch) {
    ch.addEventListener('click', function () {
      var f = ch.getAttribute('data-f');
      $$('.chip').forEach(function (c) { c.setAttribute('aria-pressed', String(c === ch)); });
      tiles.forEach(function (t) { t.classList.toggle('is-dim', !!f && t.getAttribute('data-f') !== f); });
      if (f) { var first = tiles.findIndex(function (t) { return t.getAttribute('data-f') === f; }); if (first > -1) { current = first; inspect(first); } }
    });
  });
  if ('IntersectionObserver' in window && !RM.matches) {
    var go2 = new IntersectionObserver(function (en) {
      if (en[0].isIntersecting) {
        grid.classList.add('is-in'); go2.disconnect();
        setTimeout(function () { grid.classList.add('is-settled'); }, 1800);
      }
    }, { threshold: 0.15 });
    go2.observe(grid);
  } else grid.classList.add('is-in', 'is-settled');

  /* Work accordion */
  var acc = $('#acc'), panels = $$('.panel', acc);
  var MOBILE_ACC = window.matchMedia('(max-width:900px)');
  function sizePanels() {
    var n = panels.length, w = acc.clientWidth - 10 * (n - 1);
    acc.style.setProperty('--ow', Math.max(320, Math.round(w * 8 / (8 + n - 1))) + 'px');
  }
  function runTimer(p) {
    var el = $('.tmr', p); if (!el || el.dataset.done) return;
    el.dataset.done = '1';
    var from = +el.dataset.from, to = +el.dataset.to, t0 = performance.now(), dur = RM.matches ? 0 : 2600;
    (function tick(t) {
      var k = dur ? clamp((t - t0) / dur, 0, 1) : 1, e = 1 - Math.pow(1 - k, 4);
      var secs = Math.round((from - (from - to) * e) * 60);
      el.textContent = pad2(Math.floor(secs / 60)) + ':' + pad2(secs % 60);
      if (k < 1) requestAnimationFrame(tick);
    })(t0);
  }
  function openPanel(i) {
    panels.forEach(function (p, j) {
      var on = j === i;
      p.classList.toggle('is-open', on);
      $('.panel__spine', p).setAttribute('aria-expanded', String(on));
      if (on) runTimer(p);
    });
  }
  panels.forEach(function (p, i) {
    $('.panel__spine', p).addEventListener('click', function () {
      if (MOBILE_ACC.matches && p.classList.contains('is-open')) { p.classList.remove('is-open'); this.setAttribute('aria-expanded', 'false'); return; }
      openPanel(i);
    });
    p.addEventListener('mouseenter', function () { if (FINE.matches && !MOBILE_ACC.matches) openPanel(i); });
    p.addEventListener('focusin', function () { if (!MOBILE_ACC.matches && !p.classList.contains('is-open')) openPanel(i); });
  });
  sizePanels();
  /* first panel opens on load (pre-rendered markup ships with none open so no-JS readers see every panel) */
  if (panels.length && !acc.querySelector('.panel.is-open')) openPanel(0);

  /* Copy email */
  var copyBtn = $('#copyBtn'), copyStatus = $('#copyStatus');
  copyBtn.addEventListener('click', function () {
    var done = function () {
      copyBtn.textContent = 'Copied ✓'; copyBtn.classList.add('is-done'); copyStatus.textContent = 'Email address copied to clipboard';
      setTimeout(function () { copyBtn.textContent = 'Copy'; copyBtn.classList.remove('is-done'); copyStatus.textContent = ''; }, 2200);
    };
    var fallback = function () {
      var ta = doc.createElement('textarea'); ta.value = P.email; ta.setAttribute('readonly', ''); ta.style.position = 'fixed'; ta.style.opacity = '0';
      doc.body.appendChild(ta); ta.select();
      try { doc.execCommand('copy'); done(); } catch (e) { copyStatus.textContent = 'Copy failed. The address is ' + P.email; }
      doc.body.removeChild(ta);
    };
    if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(P.email).then(done, fallback); else fallback();
  });

  /* Contact letters hop */
  if (!RM.matches) {
    $('#contactTitle').addEventListener('mouseover', function (e) {
      var c = e.target.closest && e.target.closest('.ch');
      if (c && !c.classList.contains('hop')) { c.classList.add('hop'); c.addEventListener('animationend', function h() { c.classList.remove('hop'); c.removeEventListener('animationend', h); }); }
    });
  }

  /* Numbers: pinned horizontal track + count-up */
  var numSec = $('#numbers'), track = $('#track'), numBar = $('#numBar'), ncards = $$('.ncard:not(.ncard--end)', track);
  var travel = 0, pinned = false;
  function layoutNumbers() {
    pinned = !RM.matches;
    numSec.classList.toggle('is-static', !pinned);
    if (!pinned) { numSec.style.height = ''; return; }
    travel = Math.max(0, track.scrollWidth - window.innerWidth);
    numSec.style.height = (window.innerHeight + travel) + 'px';
  }
  function countUp(card) {
    var el = $('.cnt', card), v = +card.getAttribute('data-v'), t0 = performance.now(), dur = RM.matches ? 0 : 1400;
    (function tick(t) {
      var k = dur ? clamp((t - t0) / dur, 0, 1) : 1;
      el.textContent = fmt(v * (1 - Math.pow(1 - k, 4)));
      if (k < 1) requestAnimationFrame(tick);
    })(t0);
  }
  if ('IntersectionObserver' in window) {
    /* markup carries final values for no-JS readers; zero them so the count-up has somewhere to start */
    ncards.forEach(function (c) { var el = $('.cnt', c); if (el) el.textContent = '0'; });
    var co = new IntersectionObserver(function (en) {
      en.forEach(function (e) { if (e.isIntersecting) { countUp(e.target); co.unobserve(e.target); } });
    }, { threshold: 0.5 });
    ncards.forEach(function (c) { co.observe(c); });
  } else ncards.forEach(countUp);

  /* Timeline */
  var tl = $('#tl'), spine = $('.tl__spine i', tl), stops = $$('.stop', tl);

  /* One scroll loop */
  var progressBar = $('#progressBar'), ticking = false, centerIdx = -1;
  function onScroll() {
    ticking = false;
    var y = window.scrollY, vh = window.innerHeight, max = root.scrollHeight - vh;
    progressBar.style.transform = 'scaleX(' + (max > 0 ? y / max : 0) + ')';
    nav.classList.toggle('is-scrolled', y > 40);
    // timeline
    var r = tl.getBoundingClientRect();
    var p = clamp((vh * 0.62 - r.top) / r.height, 0, 1);
    spine.style.setProperty('--p', p.toFixed(4));
    var reach = p * r.height;
    stops.forEach(function (s) { s.classList.toggle('is-lit', RM.matches || s.offsetTop <= reach + 4); });
    // numbers
    if (pinned) {
      var nr = numSec.getBoundingClientRect();
      var np = travel ? clamp(-nr.top / travel, 0, 1) : 0;
      track.style.transform = 'translate3d(' + (-np * travel).toFixed(1) + 'px,0,0)';
      numBar.style.transform = 'scaleX(' + np + ')';
      if (nr.top < vh && nr.bottom > 0) {
        var best = -1, bd = 1e9, cx = window.innerWidth / 2;
        ncards.forEach(function (c, i) { var b = c.getBoundingClientRect(); var d = Math.abs(b.left + b.width / 2 - cx); if (d < bd) { bd = d; best = i; } });
        if (best !== centerIdx) { ncards.forEach(function (c, i) { c.classList.toggle('is-center', i === best); }); centerIdx = best; }
      }
    }
  }
  function req() { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }
  window.addEventListener('scroll', req, { passive: true });
  var rzT;
  window.addEventListener('resize', function () {
    clearTimeout(rzT);
    rzT = setTimeout(function () { layoutNumbers(); sizePanels(); waveDelays(); placeIndicator(); req(); }, 120);
  });
  RM.addEventListener && RM.addEventListener('change', function () { layoutNumbers(); req(); });
  layoutNumbers(); onScroll();
  if (doc.fonts && doc.fonts.ready) doc.fonts.ready.then(function () { layoutNumbers(); sizePanels(); placeIndicator(); req(); });
  window.addEventListener('load', function () { layoutNumbers(); req(); });
})();
