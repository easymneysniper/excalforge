import { fireEvent, render } from '@testing-library/react'
import { expect, it, vi } from 'vitest'
import Lightbox from './Lightbox'

it('supports ArrowRight and Escape', () => {
  const onChange = vi.fn()
  const onClose = vi.fn()
  render(
    <Lightbox
      items={[{ src: '/one.jpg', alt: 'One' }, { src: '/two.jpg', alt: 'Two' }]}
      activeIndex={0}
      onChange={onChange}
      onClose={onClose}
    />,
  )
  fireEvent.keyDown(document, { key: 'ArrowRight' })
  expect(onChange).toHaveBeenCalledWith(1)
  fireEvent.keyDown(document, { key: 'Escape' })
  expect(onClose).toHaveBeenCalled()
})
