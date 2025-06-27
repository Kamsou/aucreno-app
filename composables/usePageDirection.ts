const pageHistory = ref<string[]>([])

export function usePageDirection() {
  const direction = ref<'forward' | 'back'>('forward')

  function updateDirection(
    to: import('vue-router').RouteLocationNormalized,
    _from: import('vue-router').RouteLocationNormalized
  ) {
    const toPath = to.fullPath
    const index = pageHistory.value.indexOf(toPath)

    if (index === -1) {
      direction.value = 'forward'
      pageHistory.value.push(toPath)
    } else {
      direction.value = 'back'
      pageHistory.value = pageHistory.value.slice(0, index + 1)
    }
  }

  return { direction, updateDirection }
}
