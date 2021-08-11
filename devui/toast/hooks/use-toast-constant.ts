export function useToastConstant() {
  const ANIMATION_NAME = 'slide-in'
  const ANIMATION_TIME = 300
  const ID_PREFIX = 'toast-message'

  return {
    ANIMATION_TIME,
    ANIMATION_NAME,
    ID_PREFIX
  } as const
}
