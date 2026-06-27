/* Elite VFO Collective 2026 — shared top navbar.
   Single source of truth for site navigation. Include on every page with:
     <script src="nav.js" defer></script>
   No build step: this injects the <header> markup + its CSS and highlights
   the active item from the current URL. To add/rename a nav item, edit NAV below. */
(function () {
  "use strict";

  /* ---- Navigation model (single source of truth) ----
     Top-level links render left-to-right. An item with `children` renders as the
     "Deep Dive" hover dropdown. `active` is derived from the page filename. */
  var NAV = [
    { label: "Agenda",       href: "index.html#agenda" },
    { label: "Slide Decks",  href: "index.html#slides" },
    { label: "Deep Dive",    href: "transformation.html", children: [
      { label: "Transformation — From Transactions to Transformations", href: "transformation.html" },
      { label: "Rothish: Premium Financing",           href: "rothish.html" },
      { label: "Advanced Charitable Tax Planning",     href: "charitable-tax-planning.html" },
      { label: "Time's Up: Subscription Model",        href: "subscription-model.html" },
      { label: "Succession Planning",                  href: "succession-planning.html" },
      { label: "How to Sell Tax Plans",                href: "selling-tax-plans.html" },
      { label: "Turning Opportunities Into Outcomes",  href: "turning-opportunities.html" },
      { label: "Practice Growth — 2 Businesses Under 1 Roof", href: "business.html" },
      { label: "Astrahome × VFO — 会议纪要 / Meeting Summary", href: "meeting-summary.html" }
    ]},
    { label: "Client Personas", href: "personas.html" },
    { label: "Strategies",      href: "strategies.html" },
    { label: "Partnership",     href: "partnership.html" },
    { label: "Books",           href: "books.html" }
  ];

  /* ---- Helpers ---- */
  function esc(s){ return String(s).replace(/[&<>"]/g, function(c){ return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]; }); }
  // filename without extension; "/", "" and "index.html" all normalize to "index"
  function key(href){ return (href || "").split("#")[0].split("?")[0].split("/").pop().replace(/\.html$/, "") || "index"; }
  var here = key(location.pathname.replace(/\/+$/, "/").split("/").pop() || "index.html");

  // Deep-dive pages: any child of the Deep Dive item → its trigger shows as active.
  var deepItem = NAV.filter(function (i) { return i.children; })[0] || { children: [] };
  var deepKeys = deepItem.children.map(function (c) { return key(c.href); });
  var onDeep = deepKeys.indexOf(here) >= 0;

  /* ---- Styles (self-contained so a page needs nothing but the <script>) ---- */
  var css = [
    "header.site{position:sticky;top:0;z-index:50;background:rgba(255,255,255,.92);",
    "  backdrop-filter:saturate(180%) blur(10px);-webkit-backdrop-filter:saturate(180%) blur(10px);",
    "  border-bottom:1px solid #e2e8f2;font-family:'Inter',system-ui,-apple-system,'Segoe UI',Roboto,'PingFang SC','Microsoft YaHei',sans-serif}",
    "header.site .nav{max-width:1080px;margin:0 auto;padding:0 22px;display:flex;align-items:center;justify-content:space-between;height:62px}",
    "header.site .brand{display:flex;align-items:center;gap:10px;font-weight:800;color:#0b2545;letter-spacing:.2px}",
    "header.site .brand .mark{width:30px;height:30px;border-radius:8px;background:linear-gradient(135deg,#1d6fce,#0b2545);display:grid;place-items:center;color:#fff;font-size:14px;font-weight:800}",
    "header.site nav{display:flex;align-items:center}",
    "header.site nav a{color:#5b6b82;font-weight:600;font-size:14px;margin-left:20px;text-decoration:none;font-family:inherit}",
    "header.site nav a:hover,header.site nav a.active{color:#1d6fce}",
    /* Deep Dive dropdown */
    "header.site nav .dd{position:relative;margin-left:20px}",
    "header.site nav .dd .dd-trigger{margin-left:0;cursor:pointer}",
    "header.site nav .dd .dd-trigger::after{content:' \\25BE';font-size:10px;opacity:.75}",
    "header.site nav .dd-menu{position:absolute;top:100%;left:0;background:#fff;border:1px solid #e2e8f2;border-radius:12px;",
    "  box-shadow:0 14px 44px rgba(13,40,80,.14);padding:8px;min-width:320px;opacity:0;visibility:hidden;transform:translateY(6px);transition:.16s ease;z-index:60}",
    "header.site nav .dd-menu::before{content:'';position:absolute;top:-10px;left:0;right:0;height:10px}",
    "header.site nav .dd:hover .dd-menu,header.site nav .dd:focus-within .dd-menu{opacity:1;visibility:visible;transform:none}",
    "header.site nav .dd-menu a{display:block;margin:0;padding:9px 12px;border-radius:8px;font-size:13px;font-weight:600;color:#1b2535;white-space:nowrap}",
    "header.site nav .dd-menu a:hover{background:#eaf2fb;color:#1d6fce}",
    "header.site nav .dd-menu a.active{color:#1d6fce}",
    "@media(max-width:820px){header.site nav a{margin-left:13px;font-size:13px}header.site nav .dd{margin-left:13px}header.site nav .brand .label{display:none}header.site .brand .label{display:none}header.site nav .dd-menu{left:auto;right:0}}"
  ].join("\n");

  /* ---- Build markup ---- */
  function linkHTML(item){
    var active = key(item.href) === here ? " class=\"active\"" : "";
    return '<a href="' + item.href + '"' + active + '>' + esc(item.label) + '</a>';
  }
  function dropdownHTML(item){
    var trig = 'class="dd-trigger' + (onDeep ? " active" : "") + '"';
    var items = item.children.map(function (c) {
      var a = key(c.href) === here ? ' class="active"' : '';
      return '          <a href="' + c.href + '"' + a + '>' + esc(c.label) + '</a>';
    }).join("\n");
    return '<span class="dd">\n' +
      '        <a href="' + item.href + '" ' + trig + '>' + esc(item.label) + '</a>\n' +
      '        <div class="dd-menu">\n' + items + '\n        </div>\n' +
      '      </span>';
  }
  var navHTML = NAV.map(function (i) { return i.children ? dropdownHTML(i) : linkHTML(i); }).join("\n      ");

  var header = document.createElement("header");
  header.className = "site";
  header.innerHTML =
    '<div class="wrap nav">' +
      '<div class="brand"><span class="mark">VFO</span> <span class="label">Elite VFO Collective ' +
        '<span style="color:#1d6fce;font-weight:800;">2026</span></span></div>' +
      '<nav>\n      ' + navHTML + '\n    </nav>' +
    '</div>';

  /* ---- Mount (inject CSS once, prepend header) ---- */
  function mount(){
    if (!document.getElementById("vfo-nav-css")) {
      var st = document.createElement("style");
      st.id = "vfo-nav-css"; st.textContent = css;
      document.head.appendChild(st);
    }
    if (!document.querySelector("header.site")) {
      document.body.insertBefore(header, document.body.firstChild);
    }
  }
  if (document.body) mount();
  else document.addEventListener("DOMContentLoaded", mount);
})();
