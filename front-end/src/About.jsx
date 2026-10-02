import { useEffect, useState } from 'react'
// sends HTTP requests to the back end.
import axios from 'axios'

const About = () => {
    // about holds JSON data; setAbout updates it and tells React to render again.
    // null = data has not arrived yet.
    const [about, setAbout] = useState(null)

    useEffect(() => {
        axios
            // combine with  /about route.
            .get(`${import.meta.env.VITE_SERVER_HOSTNAME}/about`)
            .then(response => {
                setAbout(response.data)
            })
            // if the request fail we set message 
            .catch(error => {
                console.error('Cant load About Us', error)
            })
    }, [])

    // about is still loading
    if (!about) return <p>Loading</p>

    // return page when we have data 
    return (
        <section>
            <h1>{about.title}</h1>
            {/* map turns each string in the paragraphs array into a <p> element. */}
            {about.paragraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
            ))}
            <img src={about.photoUrl} alt={about.photoAlt} width="300" />
        </section>
    )
}

export default About