import React from 'react'
import ContentLoader from 'react-content-loader'

const TopLoader = (props: any) => {
    return (
        <ContentLoader
            speed={2}
            width={1600}
            height={500}
            viewBox="0 0 1600 500"
            backgroundColor="grey"
            foregroundColor="#ecebeb"
            {...props}
        >
            <rect x="14" y="133" rx="0" ry="0" width="1273" height="28" />
            <rect x="14" y="176" rx="0" ry="0" width="1273" height="28" />
            <rect x="14" y="218" rx="0" ry="0" width="1273" height="28" />
            <rect x="14" y="260" rx="0" ry="0" width="1273" height="28" />
            <rect x="14" y="302" rx="0" ry="0" width="1273" height="28" />
            <rect x="14" y="344" rx="0" ry="0" width="1273" height="28" />
        </ContentLoader>
    )
}

export default TopLoader;
