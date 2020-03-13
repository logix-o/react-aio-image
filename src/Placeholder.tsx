import React, { FunctionComponent } from "react"
import { mergeClassname } from "./utils"
import { PlaceholderProps, PlaceholderRenderer } from "./types"

/**
 * @description default placeholder
 * TODO: use transition for animation only
 */
const Placeholder: FunctionComponent<PlaceholderProps> = ({ loading }) => {
    const className = mergeClassname(
        'aio-image__absolute-fill',
        'aio-image__skeleton',
        'aio-image__placeholder',
        !loading && 'aio-image__placeholder--faded',
    )

    return <div className={className} />
}

const renderDefaultPlaceholder: PlaceholderRenderer = loading => {
    return <Placeholder loading={loading} />
}

export default renderDefaultPlaceholder