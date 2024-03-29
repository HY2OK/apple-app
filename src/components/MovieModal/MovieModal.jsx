/* eslint-disable react/prop-types */
import { useRef } from 'react'
import './MovieModal.css'
import { imageBasePath } from '../../constant'
import useOnclickOutside from '../../hooks/useOnClickOutside'
import { useNavigate } from 'react-router-dom'

const MovieModal = ({
  backdrop_path,
  title,
  overview,
  name,
  id,
  release_date,
  first_air_date,
  vote_average,
  setModalOpen,
}) => {
  const ref = useRef(null)
  const navigate = useNavigate()

  useOnclickOutside(ref, () => setModalOpen(false))

  return (
    <div className="presentation" role="presentation">
      <div className="wrapper-modal">
        <div className="modal" ref={ref}>
          <span onClick={() => setModalOpen(false)} className="modal-close">
            X
          </span>

          <img
            src={`${imageBasePath}${backdrop_path}`}
            alt="modal_poster-img"
            className="modal__poster-img"
          />
          <div className="modal__content">
            <p className="modal__details">
              <span>100% for you </span>
              {release_date ? release_date : first_air_date}
            </p>
            <h2 className="modal__title">{title ? title : name}</h2>
            <p className="modal__overview">평점: {vote_average}</p>
            <p className="modal__overview">{overview}</p>
            <button
              style={{
                position: 'absolute',
                right: '30px',
                border: 'none',
                borderRadius: '5px',
                outline: 'none',
                width: '100px',
                height: '30px',
                cursor: 'pointer',
              }}
              onClick={() => navigate(`/${id}`)}
            >
              자세히 보기
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MovieModal
