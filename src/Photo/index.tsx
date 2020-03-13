import React, { forwardRef } from "react"
import { PhotoProps } from "../types"
import { mergeClassname } from "../utils"

const Photo = forwardRef<HTMLImageElement, PhotoProps>((props, ref) => {
    const {
        alt,
        src,
        mode,
        isVisible,
        onImageLoad,
        imageClassname
    } = props

    const className = mergeClassname(
        imageClassname,
        'aio-image__native-img',
        `aio-image__mode-${mode}`
    )

    if (!isVisible) return null

    return (
        <img
            ref={ref}
            src={src}
            alt={alt || 'aio-img'}
            onLoad={onImageLoad}
            className={className}
        />
    )
})

export default Photo