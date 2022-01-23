export const regularVariants = {
    active: {
        type: "spring",
        damping: 20,
        stiffness: 100,
        opacity: 1,
        y: 0
    },
    hidden: {
        opacity: 0,
        y: 20,
    }
}

export const chatVariant = {
    active: {
        type: 'normal',
        opacity: 1,
        x: 0
    },
    hidden: {
        opacity: 0,
        x: 200,
    }
}
