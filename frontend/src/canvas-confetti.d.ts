declare module 'canvas-confetti' {
  type Options = {
    particleCount?: number
    spread?: number
    origin?: { x?: number; y?: number }
    scalar?: number
  }
  const confetti: (options?: Options) => Promise<null>
  export default confetti
}
