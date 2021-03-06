// eslint-disable-next-line import/prefer-default-export
export function isWebglSupported() {
  try {
    const canvas = document.createElement('canvas')

    return Boolean(
      window.WebGLRenderingContext && (
        canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
      )
    )
  } catch (e) {
    return false
  }
}
