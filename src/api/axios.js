import axios from 'axios'
// import { apiKey } from './key'

const instance = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  params: {
    // eslint-disable-next-line no-undef
    api_key: `${process.env.TMDB_KEY}`,
    language: 'ko-KR',
  },
})

export default instance
