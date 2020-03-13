import { AIOImageVisualMode, PlaceholderOptions } from "../types"

export const isClient = () => typeof window === 'object'

const mergeDynamicStyles = (styles: { [key in string]: boolean }): string =>
    Object.keys(styles).reduce((r, key) => {
        if (styles![key]) {
            return r + ' ' + key
        } else {
            return r
        }
    }, '')

export const mergeClassname = (...args: Array<{ [key in string]: boolean } | string | undefined | null | false>): string =>
    args.reduce<string>((r, styles) => {    // TODO: need trim
        if (!styles) {
            return r
        } else if (typeof styles === 'string') {
            return r + ' ' + styles
        } else {
            return r + ' ' + mergeDynamicStyles(styles)
        }
    }, '')

/**
 * @description only available for images under same domain
 * @param src 
 * @param name 
 */
export const downloadImage = (src: string, name?: string) => {
    const downloadLink = document.createElement('a')
    downloadLink.href = src
    downloadLink.download = name || (() => {
        const paths = src.split("/")
        return paths[paths.length - 1]
    })()
    document.body.appendChild(downloadLink)
    downloadLink.click()
    document.body.removeChild(downloadLink)
}

export const getAutoVisualMode = (parentRatio: number, imgRatio: number): AIOImageVisualMode => {
    const $parentRatio = parentRatio.toFixed(1)
    const $imgRatio = imgRatio.toFixed(1)

    if ($parentRatio > $imgRatio) {
        return 'width-fit'
    } else if ($parentRatio < $imgRatio) {
        return 'height-fit'
    } else {
        return 'scale-fill'
    }
}

export const renderPlaceholder = (options: Required<PlaceholderOptions> & { loading: boolean }) => {
    const {
        loading,
        enablePlaceholder,
        renderPlaceholder: render
    } = options

    if (enablePlaceholder) {
        return render(loading)
    }

    return null
}