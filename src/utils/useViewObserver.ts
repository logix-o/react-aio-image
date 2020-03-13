import { useState, useEffect } from "react"
import { isClient } from "./index"

const useViewObserver = () => {
    const [rootRef, setRootRef] = useState()
    const [isVisible, setInViewport] = useState(() => {
        if (isClient()) {
            return !IntersectionObserver
        }
        return false
    })

    useEffect(
        () => {
            let observer: IntersectionObserver
            let didCancel = false

            // only support morden browser
            // support ssr
            if (
                rootRef &&
                isClient() &&
                IntersectionObserver
            ) {
                observer = new IntersectionObserver(
                    entries => {
                        entries.forEach(entry => {
                            if (
                                !didCancel &&
                                (entry.intersectionRatio > 0 || entry.isIntersecting)
                            ) {                                
                                setInViewport(true)
                                observer.unobserve(rootRef)
                            }
                        })
                    }
                )
                observer.observe(rootRef)
            }

            return () => {
                didCancel = true
                if (observer && observer.unobserve) {
                    observer.unobserve(rootRef)
                }
            }
        },
        [rootRef]
    )

    return {
        isVisible,
        setRootRef,
    }
}

export default useViewObserver