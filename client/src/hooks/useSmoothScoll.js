import { useCallback, useEffect, useState } from 'react'

const useSmoothScroll = () => {
    const [sticky, setSticky] = useState(false)
    const [sectionOffsets, setSectionOffsets] = useState([])

    const handleScroll = useCallback(() => {
        window.scrollY > window.innerHeight - 100
            ? setSticky(true)
            : setSticky(false)
    }, [])

    useEffect(() => {
        const sections = document.querySelectorAll('section')
        const offsets = Array.from(sections).map(section => section.offsetTop)
        setSectionOffsets(offsets)

        return () => {
            // Clean up event listener
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    useEffect(() => {
        window.addEventListener('scroll', handleScroll)
        return () => {
            // Clean up event listener
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    const scrollTo = useCallback(
        index => {
            window.scrollTo({
                top: sectionOffsets[index],
                behavior: 'smooth',
            })
        },
        [sectionOffsets]
    )

    const scrollToTop = useCallback(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        })
    }, [])

    return { sticky, scrollTo, scrollToTop }
}

export default useSmoothScroll
