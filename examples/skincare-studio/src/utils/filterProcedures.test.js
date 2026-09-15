import { expect, it } from 'vitest'
import { filterProcedures } from './filterProcedures'

const items = [
  { title: 'HydraGlow', description: 'Хидратация', category: 'face' },
  { title: 'Lash Lift', description: 'Мигли', category: 'brows' },
]

it('filters by category', () => {
  expect(filterProcedures(items, 'face', '')).toEqual([items[0]])
})

it('matches a normalized title query', () => {
  expect(filterProcedures(items, 'all', '  LASH ')).toEqual([items[1]])
})

it('matches Bulgarian procedure descriptions', () => {
  expect(filterProcedures(items, 'all', 'хидратация')).toEqual([items[0]])
})
