document.addEventListener('DOMContentLoaded', function () {
  'use strict';
  const languageButtons = document.querySelectorAll('[data-set-language]');
  function setLanguage(language, remember) {
    language = language === 'ko' ? 'ko' : 'en';
    document.documentElement.lang = language;
    document.querySelectorAll('[data-language]').forEach(function (element) {
      element.hidden = element.dataset.language !== language;
      element.lang = element.dataset.language;
    });
    languageButtons.forEach(function (button) {
      button.setAttribute('aria-pressed', String(button.dataset.setLanguage === language));
    });
    document.title = language === 'ko'
      ? '리더암을 이용한 양팔 로봇 원격조작 | 양방향 힘반사'
      : 'Teleoperating Leader Arm for Dual Arm | Bilateral Force Feedback';
    if (remember) {
      try { localStorage.setItem('bilateral-language', language); } catch (_) {}
    }
  }
  languageButtons.forEach(function (button) {
    button.addEventListener('click', function () { setLanguage(button.dataset.setLanguage, true); });
  });
  let language = 'en';
  try { language = localStorage.getItem('bilateral-language') || 'en'; } catch (_) {}
  setLanguage(language, false);

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const states = Array.from(document.querySelectorAll('video')).map(function (video) {
    return { video: video, visible: false, userPaused: false, started: false, automaticPause: false };
  });
  function shouldPlay(state) {
    if (document.hidden || state.userPaused || state.video.closest('details:not([open])')) return false;
    const rect = state.video.getBoundingClientRect();
    if (!rect.width || !rect.height || rect.right <= 0 || rect.left >= window.innerWidth) return false;
    const height = Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0);
    return height >= Math.min(rect.height, window.innerHeight) * 0.35;
  }
  function pauseAutomatically(state) {
    if (!state.video.paused) {
      state.automaticPause = true;
      state.video.pause();
    }
  }
  function updatePlayback() {
    states.forEach(function (state) {
      if (shouldPlay(state)) {
        state.visible = true;
        if (state.video.paused && !reducedMotion.matches) {
          const playback = state.video.play();
          if (playback) playback.then(function () {
            if (!shouldPlay(state)) pauseAutomatically(state);
          }).catch(function () {});
        }
      } else {
        state.visible = false;
        pauseAutomatically(state);
      }
    });
  }
  states.forEach(function (state) {
    state.video.addEventListener('play', function () {
      state.started = true;
      state.userPaused = false;
      // Manual playback remains available even when reduced motion is enabled.
      if (document.hidden || state.video.closest('details:not([open])')) pauseAutomatically(state);
    });
    state.video.addEventListener('pause', function () {
      if (state.automaticPause) state.automaticPause = false;
      else if (state.started && state.visible) state.userPaused = true;
    });
  });
  let scheduled = null;
  function schedulePlayback() {
    if (scheduled !== null) return;
    scheduled = window.requestAnimationFrame(function () { scheduled = null; updatePlayback(); });
  }
  window.addEventListener('scroll', schedulePlayback, { passive: true });
  window.addEventListener('resize', schedulePlayback);
  window.addEventListener('load', schedulePlayback);
  document.addEventListener('visibilitychange', updatePlayback);
  document.querySelectorAll('details').forEach(function (details) { details.addEventListener('toggle', updatePlayback); });
  if (window.ResizeObserver) new ResizeObserver(schedulePlayback).observe(document.body);
  reducedMotion.addEventListener('change', schedulePlayback);
  document.querySelectorAll('a[href="#principle"]').forEach(function (link) {
    link.addEventListener('click', function () { document.getElementById('control-principle').open = true; });
  });
  schedulePlayback();
});
