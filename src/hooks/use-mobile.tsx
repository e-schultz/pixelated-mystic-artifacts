
import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    // Initial check
    const checkMobile = () => {
      return window.innerWidth < MOBILE_BREAKPOINT
    }

    // Set initial value
    setIsMobile(checkMobile())

    // Add optimized resize listener with debounce
    let timeoutId: number | undefined
    const handleResize = () => {
      if (timeoutId) {
        window.clearTimeout(timeoutId)
      }
      timeoutId = window.setTimeout(() => {
        setIsMobile(checkMobile())
      }, 100) // 100ms debounce
    }

    window.addEventListener("resize", handleResize)
    return () => {
      if (timeoutId) {
        window.clearTimeout(timeoutId)
      }
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return !!isMobile
}
