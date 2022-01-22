import React from 'react'
import ContentLoader from 'react-content-loader'

const ProjectCardLoader = (props: any) => {
    return (
        <ContentLoader
            speed={2}
            width={400}
            height={400}
            viewBox="0 0 400 400"
            backgroundColor="grey"
            foregroundColor="#ecebeb"
            {...props}
        >
            <rect x="60" y="161" rx="0" ry="0" width="266" height="123" />
            <rect x="60" y="122" rx="0" ry="0" width="266" height="17" />
            <rect x="83" y="319" rx="0" ry="0" width="104" height="37" />
            <rect x="200" y="319" rx="0" ry="0" width="104" height="37" />
        </ContentLoader>
    )
}

export default ProjectCardLoader
