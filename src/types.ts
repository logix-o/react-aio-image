import { MouseEventHandler, ReactEventHandler, ReactNode } from "react"

export type AIOImageVisualMode = 'width-fit' | 'height-fit' | 'scale-fill' | 'auto-height'

export type PlaceholderRenderer = (loading: boolean) => JSX.Element

export type AIOImageLoadHandler = ReactEventHandler<HTMLImageElement>

export type AIOImageClickHandler = MouseEventHandler<HTMLDivElement>

export interface PhotoProps {
    alt?: string

    src: string

    /**
     * image visual mode
     */
    mode: AIOImageVisualMode

    /**
     * is image available on the viewport
     */
    isVisible: boolean

    /**
     * image load success callback
     */
    onImageLoad: AIOImageLoadHandler

    /**
     * you should use height & width props to specify image size
     */
    imageClassname?: string
}

export interface PlaceholderProps {
    loading: boolean
}

export interface PlaceholderOptions {
    /**
     * @default true
     */
    enablePlaceholder?: boolean

    /**
     * @default renderDefaultPlaceholer
     */
    renderPlaceholder?: PlaceholderRenderer
}

interface AIOImageOptions {
    src: string

    /**
     * image visual width
     */
    width: number | string

    /**
     * image visual height
     * @description if use mode='auto-height', height will be consider as initial height
     */
    height?: number | Exclude<string, 'auto'>

    /**
     * image visual mode
     * @description if used, auto mode will be disabled
     */
    mode?: AIOImageVisualMode

    /**
     * image wrapper classname
     * you should use height & width props to specify image size, which is not recommanded use in classname
     * however, if responsive ui is required, u need to set width & height with !important in classname
     */
    className?: string

    contentClassname?: string

    /**
     * @description if true, onClick will be disabled
     * @default false
     */
    enablePreview?: boolean

    onClick?: AIOImageClickHandler,

    children?: ReactNode
}

export type AIOImageProps =
    & Pick<PhotoProps, 'imageClassname' | 'src' | 'alt'>
    & PlaceholderOptions
    & AIOImageOptions