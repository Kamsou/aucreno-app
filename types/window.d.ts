declare global {
  interface Window {
    $navigatePWA: (path: string) => void
  }
}

export {}
