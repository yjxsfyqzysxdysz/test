export default {
  bind: function(el, binding) {
    const value = binging.value || 'active-bg'
    el.addEventListener('touchstart', () => {
      el.classList.add(value)
    }, { passive: true })
    el.addEventListener('touchend', () => {
      el.classList.remove(value)
    }, { passive: true })
    el.addEventListener('touchcancel', () => {
      el.classList.remove(value)
    }, { passive: true })
  }
}