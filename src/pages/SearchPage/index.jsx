import { useEffect, useState } from 'react'
import axios from '../../api/axios'
import './SearchPage.css'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDebounce } from '../../hooks/useDebounce'

const SearchPage = () => {
  // eslint-disable-next-line no-unused-vars
  const location = useLocation()
  const useQuery = () => new URLSearchParams(useLocation().search)
  let query = useQuery()
  const searchTerm = query.get('q')
  const debouncedSearchTerm = useDebounce(query.get('q'), 500)

  const navigate = useNavigate()
  const [searchResults, setSearchResults] = useState([])

  useEffect(() => {
    if (debouncedSearchTerm) fetchSearchMovie(debouncedSearchTerm)
  }, [debouncedSearchTerm])

  const fetchSearchMovie = async (searchTerm) => {
    try {
      const response = await axios.get(
        `/search/multi?include_adult=false&query=${searchTerm}`,
      )
      setSearchResults(response.data.results)
    } catch (error) {
      console.error(error)
    }
  }

  if (searchResults.length > 0) {
    return (
      <section className="search-container">
        {searchResults.map((movie) => {
          if (movie.backdrop_path !== null && movie.media_type !== 'person') {
            const movieImageUrl = 'https://image.tmdb.org/t/p/w500' + movie.backdrop_path
            return (
              <div className="movie" key={movie.id}>
                <div
                  onClick={() => navigate(`/${movie.id}`)}
                  className="movie__column-poster"
                >
                  <img src={movieImageUrl} alt="movie" className="movie__poster" />
                </div>
              </div>
            )
          }
        })}
      </section>
    )
  } else {
    return (
      <section className="no-results">
        <div className="no-results__text">
          <p>찾고자하는 검색어 {searchTerm}에 맞는 영화가 없습니다.</p>
        </div>
      </section>
    )
  }
}

export default SearchPage
