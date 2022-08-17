import React from 'react'
import { motion } from 'framer-motion'

function Loader({immagineLoader, number}) {
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            }
        }
    }

    const animation = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1, transition: {
                duration: 0.5,
                repeat: Infinity,
                reapeatType: 'reverse',
                ease: "easeInOut",
            }
        },
    }

    function createLoaderItem(immagine, number) {
        const itemNumber = new Array(number).fill(undefined)
        const y = itemNumber.map((item, index) => {
            return (
                <motion.img
                    variants={animation}
                    key={index}
                    src={immagine}
                    alt="cont loader"
                    width={50}
                    height={50} />)
        })
        return y
    }

    return (
        <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className='loader-generico'
        >
            {createLoaderItem(immagineLoader, number)}

        </motion.div>
    )
}

export default Loader