import axios from '../../api/axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { imageBasePath } from '../../constant'
import styled from 'styled-components'
import Recommend from '../../components/Recommend'

const DetailPage = () => {
  const { movieId } = useParams()
  const [movie, setMovie] = useState(null)
  const [recommendMovie, setRecommendMovie] = useState(null)

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(`/movie/${movieId}`)
      const response2 = await axios.get(`/discover/movie`, {
        params: {
          with_genres: response.data.genres[0].id,
        },
      })

      const sortedByVote = [...response2.data.results].sort(
        (cur, nxt) => nxt.vote_average - cur.vote_average,
      )

      setMovie(response.data)
      setRecommendMovie(sortedByVote)
    }
    fetchData()
  }, [movieId])

  const turncate = (str, n) => {
    return str?.length > n ? str.substring(0, n) + '...' : str
  }

  if (!movie)
    return (
      <section style={{ minHeight: '100vh', marginTop: '70px', backgroundColor: '#000' }}>
        loading...
      </section>
    )
  else {
    const url = `${imageBasePath}${movie.backdrop_path}`
    return (
      <section style={{ minHeight: '100vh', marginTop: '70px', backgroundColor: '#000' }}>
        <Banner url={url}>
          <Title>
            {movie.title} <SubTitle>{movie.tagline}</SubTitle>
          </Title>
          <Footer>
            <Btns>
              <Btn>재생하기</Btn>
              <Btn>+ 재생 대기 목록에 추가</Btn>
            </Btns>
            <Overview>{turncate(movie.overview, 100)}</Overview>
          </Footer>
        </Banner>
        <Recommend movieList={recommendMovie} />
      </section>
    )
  }
}

export const Banner = styled.div`
  position: relative;
  margin: 0 auto;
  box-sizing: border-box;
  width: 90%;
  aspect-ratio: auto 896 / 503;
  background-image: url(${(props) => props.url});
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
`

export const Title = styled.div`
  position: absolute;
  top: 5%;
  left: 5%;
  font-size: 3rem;
  font-weight: bold;
  @media screen and (min-width: 1024px) {
    font-size: 5rem;
  }
`

export const SubTitle = styled.div`
  font-size: 1rem;
  margin-top: 10px;
  margin-left: 40px;
  @media screen and (min-width: 1024px) {
    font-size: 2rem;
    margin-left: 60px;
  }
`

export const Footer = styled.div`
  width: 100%;
  height: 20rem;
  background-image: linear-gradient(180deg, transparent, rgba(37, 37, 37, 0.61), #111);
  position: absolute;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  box-sizing: border-box;
  padding: 0px 20px 40px;
`

export const Btns = styled.div`
  flex: 1 1 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
`

export const Btn = styled.button`
  width: 90%;
  height: 35px;
  border-radius: 5px;
  font-size: 0.8rem;
  border: none;
  @media screen and (min-width: 1024px) {
    width: 70%;
  }
`

export const Overview = styled.div`
  flex: 3 1 0;
  height: 80px;
`

export default DetailPage
