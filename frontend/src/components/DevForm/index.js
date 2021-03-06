import React, { useState, useEffect } from 'react'

const DevForm = ({ onSubmit }) => {

    const [github_username, setGithubUsername] = useState('')
    const [techs, setTechs] = useState('')
    const [latitude, setLatitude] = useState('')
    const [longitude, setLongitude] = useState('')

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords
                setLatitude(latitude)
                setLongitude(longitude)
            },
            (err) => {
                console.error(err)
            }, { timeout: 30000 }
        )
    }, [])

    async function handleSubmit(e) {
        e.preventDefault(e)
        await onSubmit({
            github_username,
            techs,
            latitude,
            longitude
        })

        setGithubUsername('')
        setTechs('')
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="input-block">
                <label htmlFor="github_username">Usuário do GitHub</label>
                <input
                    type="text"
                    name="github_username"
                    id="github_username"
                    required
                    value={github_username}
                    onChange={({ target }) => setGithubUsername(target.value)} />
            </div>

            <div className="input-block">
                <label htmlFor="techs">Tecnologias</label>
                <input
                    type="text"
                    name="techs"
                    id="techs"
                    required
                    value={techs}
                    onChange={({ target }) => setTechs(target.value)} />
            </div>

            <div className="input-group">
                <div className="input-block">
                    <label htmlFor="latitude">Latitude</label>
                    <input
                        type="number"
                        name="latitude"
                        id="latitude"
                        required
                        value={latitude}
                        onChange={({ target }) => setLatitude(target.value)} />
                </div>

                <div className="input-block">
                    <label htmlFor="longitude">Logitude</label>
                    <input
                        type="number"
                        name="longitude"
                        id="longitude"
                        required
                        value={longitude}
                        onChange={({ target }) => setLongitude(target.value)} />
                </div>
            </div>

            <button type="submit">Salvar</button>

        </form>
    )
}

export default DevForm