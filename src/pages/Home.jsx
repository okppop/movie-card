import MovieCard from "../components/MovieCard"
import { useState, useEffect } from "react"
import { searchMovies, getPopularMovies } from "../services/api"
import "../css/Home.css"

export default Home

function Home() {
    const [searchQuery, setSearchQuery] = useState("")
    const [movies, setMovies] = useState([])
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const temp = async () => {
            try {
                const popularMovies = await getPopularMovies()
                setMovies(popularMovies)
            } catch (err) {
                console.log(err)
                setError(err)
            } finally {
                setIsLoading(false)
            }
        }
        temp()
    }, [])

    const handleSearchFormOnSubmit = async function (e) {
        e.preventDefault()

        if (!searchQuery.trim()) {
            return
        }

        setIsLoading(true)
        try {
            setMovies(await searchMovies(searchQuery))
            setError(null)
        } catch (err) {
            console.log(err)
            setError(err)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="home">
            <form className="search-form" onSubmit={handleSearchFormOnSubmit}>
                <input
                    className="search-input"
                    type="text"
                    placeholder="Search for movies ..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                />
                <button className="search-button" type="submit" >
                    Search
                </button>
            </form>

            {error && (<div className="error-message">{error}</div>)}
            {isLoading ? (<div className="loading">Loading...</div>) : (
                <div className="movies-grid">
                    {movies.map(movie => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))}
                </div>
            )}
        </div>
    )
}