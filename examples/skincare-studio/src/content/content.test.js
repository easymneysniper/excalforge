import { describe, expect, it } from 'vitest'
import { navItems, site } from './site'
import { procedureCategories, procedures } from './procedures'

describe('content contracts', () => {
  it('defines all six routes and editable studio data', () => {
    expect(navItems.map((item) => item.to)).toEqual([
      '/',
      '/procedures',
      '/about',
      '/gallery',
      '/reviews',
      '/contact',
    ])
    expect(site.businessName).toBe('SKINCARE STUDIO')
    expect(site.shortName).toBe('SS')
    expect(site.instagram).toEqual({
      handle: '@skincare.studio.demo',
      url: 'https://www.instagram.com/',
    })
  })

  it('keeps procedures compatible with filtering and booking', () => {
    expect(procedureCategories[0].id).toBe('all')
    expect(
      procedures.every(
        (item) => item.id && item.category && item.title && item.image,
      ),
    ).toBe(true)
  })
})
