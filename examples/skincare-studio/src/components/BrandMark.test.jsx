import { render, screen } from '@testing-library/react'
import { expect, it } from 'vitest'
import BrandMark from './BrandMark'

it('renders the anonymous demo identity instead of the original studio branding', () => {
  const { container } = render(<BrandMark />)

  expect(screen.getByLabelText('SKINCARE STUDIO')).toBeInTheDocument()
  expect(container.querySelector('.brand-mark__monogram')).toHaveTextContent('SS')
  expect(container.querySelector('.brand-mark__name')).toHaveTextContent('SKINCARE STUDIO')
})
