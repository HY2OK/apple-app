import { useRef, useState } from 'react'
import useOnclickOutside from '../../hooks/useOnClickOutside'
import styled from 'styled-components'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'

/* eslint-disable react/prop-types */
const SignModal = ({ setModal, handleAuth, setUserData, auth }) => {
  const [isLogin, setIsLogin] = useState(true)
  const [user, setUser] = useState({
    email: '',
    password: '',
  })
  const ref = useRef(null)

  useOnclickOutside(ref, () => setModal(false))

  const handleInput = (e) => {
    setUser((user) => ({
      ...user,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { email, password } = user

    try {
      if (isLogin) {
        const res = await signInWithEmailAndPassword(auth, email, password)
        setUserData(res.user)
        localStorage.setItem('userData', JSON.stringify(res.user))
      } else {
        const res = await createUserWithEmailAndPassword(auth, email, password)
        setUserData(res.user)
        localStorage.setItem('userData', JSON.stringify(res.user))
      }
      setModal(false)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Container ref={ref}>
      <BackHome onClick={() => setModal(false)}>X</BackHome>
      <Logo src="/images/apple-gray-logo.svg" alt="로고" />
      <HeadingText>{isLogin ? 'Sign in with your Apple ID' : 'Sign up'}</HeadingText>
      <Description>
        {isLogin
          ? 'You will be signed in to Apple TV and Apple Music.'
          : 'You will be sign up for Apple TV and Apple Music.'}
      </Description>
      <Form onSubmit={handleSubmit}>
        <Input
          type="email"
          name="email"
          placeholder="email"
          value={user.email}
          onChange={handleInput}
        />
        <Input
          type="password"
          name="password"
          placeholder="password"
          value={user.password}
          onChange={handleInput}
        />
        <Btn>{isLogin ? 'Sign In' : 'Sign Up'}</Btn>
      </Form>
      {isLogin && (
        <Google
          onClick={() => {
            handleAuth()
            setModal(false)
          }}
          src="/images/google.png"
        />
      )}
      <LinkText onClick={() => setIsLogin((isLogin) => !isLogin)}>
        Create New Apple Id
      </LinkText>
    </Container>
  )
}

const BackHome = styled.div`
  position: absolute;
  top: 1.2rem;
  right: 1.4rem;
  font-size: 1.6rem;
  cursor: pointer;
`

const Container = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 500px;
  height: 600px;
  border-radius: 10px;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: #424245;
`

const Logo = styled.img`
  margin-bottom: 1.3rem;
  width: 50px;
`

const HeadingText = styled.h1`
  font-size: 1.9rem;
`

const Description = styled.p`
  margin: 0;
  font-size: 1.3rem;
`

const LinkText = styled.p`
  font-size: 1.2rem;
  color: #2997ff;
  margin: 0;
  cursor: pointer;
`

const Form = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 10px;
  margin: 2rem 0;
`

const Input = styled.input`
  font-size: 18px;
  padding: 1rem;
  border: 1px solid transparent;
  border-radius: 12px;
  border-color: #424245;
  background-color: hsla(0, 0%, 100%, 0.04);
  width: 310px;
  font-weight: 400;
  cursor: pointer;

  &:hover {
    background-color: hsla(0, 0%, 100%, 0.08);
  }
  &:focus {
    outline: 1px solid #424245;
  }
`

const Google = styled.img`
  width: 30px;
  margin-bottom: 20px;
  cursor: pointer;
`

const Btn = styled.button`
  border: none;
  outline: none;
  background-color: #2997ff;
  color: #fff;
  width: 90px;
  height: 40px;
  border-radius: 5px;
  font-size: 1.05rem;
  font-weight: bold;
  margin-top: 10px;
`

export default SignModal
