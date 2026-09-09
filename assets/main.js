/* ============================================================
   포트폴리오 인터랙션
   1) 등장 애니메이션  2) 스크롤 스파이  3) 숫자 카운트업
   외부 라이브러리 없음.
   ============================================================ */
(function () {
  'use strict';

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- 1) 스크롤하며 요소 등장 ---------- */
  var revealTargets = document.querySelectorAll('[data-reveal]');

  if (reduce || !('IntersectionObserver' in window)) {
    // 모션을 줄이는 설정이거나 지원하지 않는 브라우저에서는 즉시 표시한다.
    revealTargets.forEach(function (el) { el.classList.add('is-in'); });
  } else {
    var revealIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-in');
        revealIO.unobserve(entry.target); // 한 번 보이면 다시 관찰하지 않는다.
      });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.08 });

    revealTargets.forEach(function (el, i) {
      // 같은 화면에 여러 개가 함께 들어올 때 약간씩 시차를 준다.
      el.style.transitionDelay = Math.min(i % 6, 5) * 55 + 'ms';
      revealIO.observe(el);
    });
  }

  /* ---------- 2) 현재 보고 있는 섹션을 사이드바에 표시 ---------- */
  var sections = Array.prototype.slice.call(document.querySelectorAll('[data-section]'));
  var navItems = Array.prototype.slice.call(document.querySelectorAll('[data-nav]'));

  function setActive(id) {
    navItems.forEach(function (a) {
      var on = a.getAttribute('href') === '#' + id;
      a.classList.toggle('is-active', on);
      if (on) { a.setAttribute('aria-current', 'true'); }
      else { a.removeAttribute('aria-current'); }
    });
  }

  if (sections.length && 'IntersectionObserver' in window) {
    var visible = {};

    var spyIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        visible[entry.target.id] = entry.isIntersecting ? entry.intersectionRatio : 0;
      });

      // 화면에 걸친 섹션 중 가장 많이 보이는 것을 현재 섹션으로 본다.
      var best = null, bestRatio = 0;
      Object.keys(visible).forEach(function (id) {
        if (visible[id] > bestRatio) { bestRatio = visible[id]; best = id; }
      });
      if (best) setActive(best);
    }, {
      // 상단 고정 바(모바일)를 감안해 위쪽을 조금 잘라낸다.
      rootMargin: '-25% 0px -55% 0px',
      threshold: [0, 0.25, 0.5, 0.75, 1]
    });

    sections.forEach(function (s) { spyIO.observe(s); });
  }

  /* ---------- 3) 히어로 숫자 카운트업 ---------- */
  var counters = Array.prototype.slice.call(document.querySelectorAll('[data-count]'));

  function runCount(el) {
    var target = parseInt(el.getAttribute('data-count'), 10) || 0;

    if (reduce) { el.textContent = String(target); return; }

    var duration = 1100;
    var started = null;

    function step(ts) {
      if (started === null) started = ts;
      var p = Math.min((ts - started) / duration, 1);
      // easeOutCubic — 끝으로 갈수록 느려진다.
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = String(Math.round(target * eased));
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  if (counters.length) {
    if (!('IntersectionObserver' in window)) {
      counters.forEach(runCount);
    } else {
      var countIO = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          runCount(entry.target);
          countIO.unobserve(entry.target);
        });
      }, { threshold: 0.5 });
      counters.forEach(function (el) { countIO.observe(el); });
    }
  }

  /* ---------- 4) 모바일에서 활성 탭이 보이도록 가로 스크롤 ---------- */
  var nav = document.querySelector('.nav');
  if (nav) {
    var syncNavScroll = function () {
      if (window.innerWidth > 1080) return;
      var active = nav.querySelector('.is-active');
      if (!active) return;
      var left = active.offsetLeft - (nav.clientWidth - active.clientWidth) / 2;
      nav.scrollTo({ left: Math.max(left, 0), behavior: reduce ? 'auto' : 'smooth' });
    };
    // 스크롤 스파이가 클래스를 바꿀 때마다 따라간다.
    new MutationObserver(syncNavScroll)
      .observe(nav, { attributes: true, subtree: true, attributeFilter: ['class'] });
  }
})();
