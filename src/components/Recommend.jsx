/* eslint-disable react/prop-types */
import styled from 'styled-components'
import { imageBasePath } from '../constant'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Recommend = ({ movieList }) => {
  const [isHovered, setIsHovered] = useState(null)
  const navigate = useNavigate()
  console.log(movieList)

  return (
    <>
      <div style={{ width: '90%', margin: '20px auto' }}>추천 영화</div>
      <Ul>
        {movieList &&
          movieList.map((movie, index) => {
            const url = `${imageBasePath}${movie.backdrop_path}`
            return (
              <Li
                url={url}
                key={index}
                onMouseEnter={() => setIsHovered(index)}
                onMouseLeave={() => setIsHovered(null)}
                onClick={() => navigate(`/${movie.id}`)}
              >
                {isHovered === index && (
                  <>
                    <ListTitle>{movie.title}</ListTitle>
                    <Back />
                  </>
                )}
              </Li>
            )
          })}
      </Ul>
    </>
  )
}

export const Ul = styled.ul`
  width: 90%;
  margin: 0 auto;
  padding: 0;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 10px;
`

export const Li = styled.li`
  position: relative;
  aspect-ratio: auto 896 / 503;
  box-sizing: border-box;
  border-radius: 10px;
  list-style: none;
  background-image: url(${(props) => props.url});
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  transition: all 0.5s;
  cursor: pointer;
  &:hover {
    scale: 1.05;
  }
`

export const ListTitle = styled.div`
  position: absolute;
  bottom: 10px;
  right: 10px;
  font-size: 0.8rem;
  z-index: 999;
`

export const Back = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  background-image: linear-gradient(180deg, transparent, rgba(37, 37, 37, 0.61), #111);
  width: 100%;
  height: 100%;
`
export default Recommend
