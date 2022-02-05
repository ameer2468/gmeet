import React from 'react'
import ContentLoader from 'react-content-loader'

const NotificationLoader = (props: any) => {
    return (
        <ContentLoader
            speed={2}
            width={500}
            height={200}
            viewBox="0 0 500 200"
            backgroundColor="grey"
            foregroundColor="#ecebeb"
            {...props}
        >
            <rect x="35" y="5" rx="5" ry="5" width="450" height="10" />
            <rect x="35" y="50" rx="5" ry="5" width="450" height="10" />
            <rect x="35" y="95" rx="5" ry="5" width="450" height="10" />
            <rect x="35" y="140" rx="5" ry="5" width="450" height="10" />
            <rect x="35" y="185" rx="5" ry="5" width="450" height="10" />
            <rect x="3" y="0" rx="4" ry="4" width="20" height="20" />
            <rect x="3" y="45" rx="4" ry="4" width="20" height="20" />
            <rect x="3" y="90" rx="4" ry="4" width="20" height="20" />
            <rect x="3" y="135" rx="4" ry="4" width="20" height="20" />
            <rect x="3" y="180" rx="4" ry="4" width="20" height="20" />
        </ContentLoader>
    )
}

export default NotificationLoader
