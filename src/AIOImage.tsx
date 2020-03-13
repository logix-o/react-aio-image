import "./index.css"
import React, { CSSProperties, memo, useCallback, useMemo, useRef, useState } from "react"
import {
    AIOImageProps,
    AIOImageClickHandler,
    AIOImageVisualMode,
    AIOImageLoadHandler
} from "./types"
import useToggle from "./utils/useToggle"
import useViewObserver from "./utils/useViewObserver"
import ImageBase from "./Photo"
import { mergeClassname } from "./utils"
import renderDefaultPlaceholder from "./Placeholder"
import { getAutoVisualMode, renderPlaceholder as $renderPlaceholder } from "./utils"
import { IMAGE_INITIAL_HEIGHT } from "./utils/constant"

const AIOImage = memo<AIOImageProps>(props => {
    const imgEl = useRef<HTMLImageElement>(null)

    const {
        alt,
        src,
        mode,
        width,
        height,
        children,
        className,
        imageClassname,
        contentClassname,
        onClick,
        enablePreview = false,
        enablePlaceholder = true,
        renderPlaceholder = renderDefaultPlaceholder,
    } = props

    const {
        value: loading,
        toggle: toggleLoading
    } = useToggle(true)

    const enableAutoHeight = useMemo<boolean>(
        () => mode === 'auto-height' || height === 'auto',
        // eslint-disable-next-line
        []
    )

    // image real width & height
    // in the viewport
    const visualSize = useMemo<CSSProperties>(
        () => ({
            width,
            height: enableAutoHeight ?
                (loading ? ((!height || height === 'auto') ? IMAGE_INITIAL_HEIGHT : height) : 'auto') :
                height
        }),
        [
            width,
            height,
            loading,
            enableAutoHeight
        ]
    )

    const [autoMode, setAutoMode] = useState<AIOImageVisualMode>('scale-fill')
    const { setRootRef, isVisible } = useViewObserver()

    const rootClassname = mergeClassname('aio-image__root', className)

    const $contentClassname = mergeClassname('aio-image__absolute-fill', contentClassname)

    const $mode: AIOImageVisualMode = mode || autoMode

    const onImageLoad = useCallback<AIOImageLoadHandler>(
        evt => {
            const {
                parentElement,
                naturalWidth,   // image origin width
                naturalHeight,  // image origin height
            } = evt.currentTarget

            const {
                clientWidth,
                clientHeight
            } = parentElement || {}

            const imgRatio = naturalWidth / naturalHeight
            const parentRatio = clientWidth / clientHeight

            // use auto mode
            if (!mode) {
                const $autoMode = getAutoVisualMode(parentRatio, imgRatio)
                setAutoMode($autoMode)
            }

            // avaid img show in a flash
            if ('requestAnimationFrame' in window) {
                requestAnimationFrame(() => {
                    toggleLoading()
                })
            } else {
                toggleLoading()
            }
        },
        // eslint-disable-next-line
        []
    )

    const onClickOrPreview = useCallback<AIOImageClickHandler>(
        e => {
            if (enablePreview) {
                // TODO: 
                // const $imgEl = imgEl.current

                // if ($imgEl && !loading) {
                //     const { x, y } = $imgEl.getBoundingClientRect() as DOMRect
                //     const isScaleFill = $mode === 'scale-fill' || $mode === 'auto-height'

                //     open({
                //         src,
                //         positionBeforeOpen: {
                //             x,
                //             y,
                //             isScaleFill,
                //             width: $imgEl.width,
                //             height: $imgEl.height,
                //         }
                //     })
                // }
            } else {
                onClick && onClick(e)
            }
        },
        // eslint-disable-next-line
        [
            onClick,
            loading,
            autoMode,
            enablePreview
        ]
    )

    return (
        <div
            ref={setRootRef}
            style={visualSize}
            className={rootClassname}
            onClick={onClickOrPreview}
        >
            <ImageBase
                ref={imgEl}
                alt={alt}
                src={src}
                mode={$mode}
                isVisible={isVisible}
                onImageLoad={onImageLoad}
                imageClassname={imageClassname}
            />
            <div className={$contentClassname}>
                {children}
            </div>
            {
                $renderPlaceholder({
                    loading,
                    enablePlaceholder,
                    renderPlaceholder,
                })
            }
        </div>
    )
})

export default AIOImage