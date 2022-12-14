import * as React from 'react'
import {Container} from '@mui/material'
import LoginForm from '../components/forms/LoginForm'
import axios from 'axios'
import urls from '../data/urls'
import { useNavigate } from 'react-router-dom'
import {useRecoilState} from 'recoil'
import atoms from '../Atoms'
import authorizedAxios from '../components/authorizedAxios'

export default function LoginPage() {

    const [loading, setLoading] = React.useState(false)
    const [error, setError] = React.useState('')
    const navigate = useNavigate()
    const [auth, setAuth] = useRecoilState(atoms.AuthAtom)

    const loginClicked = (email, password) => {
        setLoading(true)
        setError('')
        axios.post(urls.login, {
            username: email,
            password: password
        }).then(
            res => {
                const token = res.data.token
                authorizedAxios({token: token}).get(urls.getMe).then(res => {
                    setLoading(false)
                    setAuth({...auth, token: token, user: res.data})
                    navigate('/home')
                })
            }
        ).catch(
            err => {
                setLoading(false)
                setError('Login failed')
            }
        )
    }

    const registerClicked = () => {
        navigate('/register')
    }
    return (
        <Container maxWidth="sm" sx={{py: 12}}>
            <LoginForm loginClicked={loginClicked} registerClicked={registerClicked} loading={loading} error={error}/>
        </Container>
    )
}