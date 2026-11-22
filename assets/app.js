/* 명인산업 (miwash.kr) — assets/app.js */
(function () {
  'use strict';

  var PHONE = '01045601767';
  var EMAIL = 'wonho1767@naver.com';

  /* ---------- 헤더 / 모바일 메뉴 ---------- */
  var header = document.getElementById('siteHeader');
  var nav = document.getElementById('mainNav');
  var toggle = document.getElementById('navToggle');

  function closeNav() {
    if (!nav || !toggle) return;
    nav.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', '메뉴 열기');
    document.body.style.overflow = '';
  }

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.setAttribute('aria-label', open ? '메뉴 닫기' : '메뉴 열기');
      document.body.style.overflow = open && window.innerWidth <= 960 ? 'hidden' : '';
    });

    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) closeNav();
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeNav();
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth > 960) closeNav();
    });
  }

  function onScroll() {
    if (header) header.classList.toggle('is-scrolled', window.scrollY > 8);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- 현재 섹션 메뉴 강조 ---------- */
  var navLinks = Array.prototype.slice.call(document.querySelectorAll('.nav ul a[href^="#"]'));
  var sectionEls = navLinks
    .map(function (a) { return document.querySelector(a.getAttribute('href')); })
    .filter(Boolean);

  function markActive() {
    if (!sectionEls.length) return;
    var line = (header ? header.getBoundingClientRect().height : 70) + 120;
    var current = null;
    sectionEls.forEach(function (el) {
      if (el.getBoundingClientRect().top <= line) current = el;
    });
    navLinks.forEach(function (a) {
      a.classList.toggle('is-active', !!current && a.getAttribute('href') === '#' + current.id);
    });
  }
  window.addEventListener('scroll', markActive, { passive: true });
  window.addEventListener('resize', markActive);
  markActive();

  /* ---------- 견적 문의 폼 ---------- */
  var form = document.getElementById('quoteForm');
  var statusEl = document.getElementById('formStatus');

  function say(msg, isError) {
    if (!statusEl) return;
    statusEl.textContent = msg;
    statusEl.classList.toggle('is-error', !!isError);
  }

  function readForm() {
    return {
      company: (document.getElementById('company').value || '').trim(),
      phone: (document.getElementById('phone').value || '').trim(),
      industry: document.getElementById('industry').value || '',
      region: document.getElementById('region').value || '',
      message: (document.getElementById('message').value || '').trim()
    };
  }

  function buildText(d) {
    var lines = [
      '[명인산업 견적·샘플 문의]',
      '업체명: ' + (d.company || '-'),
      '연락처: ' + (d.phone || '-'),
      '업종: ' + (d.industry || '미선택'),
      '지역: ' + (d.region || '미선택'),
      '문의내용: ' + (d.message || '-')
    ];
    return lines.join('\n');
  }

  function validate(d) {
    if (!d.company) {
      say('업체명을 입력해 주세요.', true);
      document.getElementById('company').focus();
      return false;
    }
    if (!d.phone) {
      say('연락처를 입력해 주세요.', true);
      document.getElementById('phone').focus();
      return false;
    }
    if (!/^[0-9+\-\s()]{7,}$/.test(d.phone)) {
      say('연락처 형식을 확인해 주세요. (예: 010-0000-0000)', true);
      document.getElementById('phone').focus();
      return false;
    }
    return true;
  }

  // 모바일 사파리·크롬에서도 안정적으로 열리도록 앵커 클릭으로 실행합니다.
  function openLink(href) {
    var a = document.createElement('a');
    a.href = href;
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    setTimeout(function () { a.remove(); }, 0);
  }

  function mailtoLink(d) {
    var subject = '[명인산업] 견적·샘플 문의' + (d.company ? ' - ' + d.company : '');
    return 'mailto:' + EMAIL +
      '?subject=' + encodeURIComponent(subject) +
      '&body=' + encodeURIComponent(buildText(d));
  }

  function smsLink(text) {
    var isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) ||
      (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    var sep = isIOS ? '&' : '?';
    return 'sms:' + PHONE + sep + 'body=' + encodeURIComponent(text);
  }

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var d = readForm();
      if (!validate(d)) return;
      say('메일 앱으로 문의 내용을 담았습니다. 전송 전에 내용을 확인해 주세요.');
      openLink(mailtoLink(d));
    });

    var btnSms = document.getElementById('btnSms');
    if (btnSms) {
      btnSms.addEventListener('click', function () {
        var d = readForm();
        if (!validate(d)) return;
        say('문자 앱으로 문의 내용을 담았습니다. 전송 버튼을 눌러 주세요.');
        openLink(smsLink(buildText(d)));
      });
    }

    var btnCopy = document.getElementById('btnCopy');
    if (btnCopy) {
      btnCopy.addEventListener('click', function () {
        var d = readForm();
        if (!validate(d)) return;
        var text = buildText(d);

        function done() { say('입력하신 내용을 복사했습니다. 문자·카카오톡에 붙여넣어 보내 주세요.'); }
        function fail() { say('복사가 되지 않았습니다. 내용을 직접 선택해 복사해 주세요.', true); }

        if (navigator.clipboard && window.isSecureContext) {
          navigator.clipboard.writeText(text).then(done).catch(fallback);
        } else {
          fallback();
        }

        function fallback() {
          var ta = document.createElement('textarea');
          ta.value = text;
          ta.setAttribute('readonly', '');
          ta.style.cssText = 'position:fixed;top:0;left:-9999px;opacity:0';
          document.body.appendChild(ta);
          ta.select();
          var ok = false;
          try { ok = document.execCommand('copy'); } catch (err) { ok = false; }
          document.body.removeChild(ta);
          ok ? done() : fail();
        }
      });
    }

    form.addEventListener('input', function () {
      if (statusEl && statusEl.textContent) say('');
    });
  }

  /* ---------- 공장 사진 라이트박스 ---------- */
  var lb = document.getElementById('lightbox');
  var lbImg = document.getElementById('lbImage');
  var lbCap = document.getElementById('lbCaption');
  var lbClose = document.getElementById('lbClose');
  var lastFocus = null;

  function openLb(btn) {
    if (!lb || !lbImg) return;
    lastFocus = btn;
    lbImg.src = btn.getAttribute('data-src');
    lbImg.alt = (btn.querySelector('img') || {}).alt || '';
    if (lbCap) lbCap.textContent = btn.getAttribute('data-caption') || '';
    lb.hidden = false;
    document.body.classList.add('lb-open');
    if (lbClose) lbClose.focus();
  }

  function closeLb() {
    if (!lb) return;
    lb.hidden = true;
    lbImg.src = '';
    document.body.classList.remove('lb-open');
    if (lastFocus) lastFocus.focus();
  }

  Array.prototype.forEach.call(document.querySelectorAll('.g-btn'), function (btn) {
    btn.addEventListener('click', function () { openLb(btn); });
  });

  if (lb) {
    lb.addEventListener('click', function (e) {
      if (e.target === lb) closeLb();
    });
    if (lbClose) lbClose.addEventListener('click', closeLb);
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !lb.hidden) closeLb();
    });
  }

  /* ---------- 연도 ---------- */
  var y = document.getElementById('year');
  if (y) y.textContent = String(new Date().getFullYear());
})();
