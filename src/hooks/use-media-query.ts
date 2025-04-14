"use client"

import { useState, useEffect } from "react"

export function useMediaQuery(query: string): boolean {
<<<<<<< Updated upstream
  const [matches, setMatches] = useState(() => {
    if (typeof window !== "undefined") {
      return window.matchMedia(query).matches
    }
    return false
  })

  useEffect(() => {
    const media = window.matchMedia(query)
    const updateMatch = () => setMatches(media.matches)

    updateMatch() // Ensure it updates initially
    media.addEventListener("change", updateMatch)

    return () => media.removeEventListener("change", updateMatch)
  }, [query])
=======
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const media = window.matchMedia(query)
    if (media.matches !== matches) {
      setMatches(media.matches)
    }

    const listener = () => setMatches(media.matches)
    media.addEventListener("change", listener)

    return () => media.removeEventListener("change", listener)
  }, [matches, query])
>>>>>>> Stashed changes

  return matches
}
