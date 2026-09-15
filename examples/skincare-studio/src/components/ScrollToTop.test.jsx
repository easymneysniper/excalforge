import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { afterEach, describe, expect, it, vi } from 'vitest'
import ScrollToTop from './ScrollToTop'

describe('ScrollToTop', () => {
  const originalScrollTo = window.scrollTo

  afterEach(() => {
    window.scrollTo = originalScrollTo
  })

  it('does not return the browser scroll result as an effect cleanup', () => {
    window.scrollTo = vi.fn(() => ({ browserResult: true }))

    const view = render(
      <MemoryRouter initialEntries={['/procedures']}>
        <ScrollToTop />
      </MemoryRouter>,
    )

    expect(() => view.unmount()).not.toThrow()
    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 0,
      left: 0,
      behavior: 'instant',
    })
  })
})
