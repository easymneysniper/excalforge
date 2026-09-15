export function filterProcedures(items, categoryId = 'all', query = '') {
  const normalizedQuery = query.trim().toLocaleLowerCase('bg-BG')
  return items.filter((item) => {
    const matchesCategory = categoryId === 'all' || item.category === categoryId
    const searchable = `${item.title} ${item.description ?? ''}`.toLocaleLowerCase('bg-BG')
    return matchesCategory && (!normalizedQuery || searchable.includes(normalizedQuery))
  })
}
