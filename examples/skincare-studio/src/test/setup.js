import '@testing-library/jest-dom/vitest'

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }),
})

class ResizeObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}

global.ResizeObserver = ResizeObserverMock

class IntersectionObserverMock {
  constructor(callback) {
    this.callback = callback
  }
  observe(element) {
    this.callback([{ isIntersecting: true, target: element }])
  }
  unobserve() {}
  disconnect() {}
}

global.IntersectionObserver = IntersectionObserverMock

Object.defineProperty(window, 'scrollTo', {
  writable: true,
  value: () => {},
})
