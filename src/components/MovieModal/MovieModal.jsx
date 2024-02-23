/* eslint-disable react/prop-types */
import React, { useRef } from 'react'
import './MovieModal.css'
import { imageBasePath } from '../../constant'
import useOnclickOutside from '../../hooks/useOnClickOutside'

const MovieModal = ({
  backdrop_path,
  title,
  overview,
  name,
  release_date,
  first_air_date,
  vote_average,
  setModalOpen,
}) => {
  const ref = useRef(null)

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
              <span>100% for you</span>
              {release_date ? release_date : first_air_date}
            </p>
            <h2 className="modal__title">{title ? title : name}</h2>
            <p className="modal__overview">평점: {vote_average}</p>
            <p className="modal__overview">{overview}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MovieModal
