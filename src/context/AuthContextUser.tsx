import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { Alert } from "react-native";
import { api } from "../services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

type AuthContextData = {
  user: UserProps
  isAuthenticated: boolean
  sigIn: (email: string, password: string) => Promise<void>
  loadingAuth: boolean
  loading: boolean
  signOut: () => Promise<void>
}

type UserProps = {
  email: string
  name: string
  id: string
  token: string
}

export const AuthContext = createContext({} as AuthContextData)

export function AuthProvider({ children }: { children: ReactNode }) {

  const [user, setUser] = useState<UserProps>({
    email: '',
    id: '',
    name: '',
    token: ''
  })
  const [loading, setLoading] = useState(true)

  const isAuthenticated = !!user.name

  useEffect(() => {
    async function getUser() {
      //Pegar os dados salvos do user

      const userInfo = await AsyncStorage.getItem('@pepperoni')
      let hasUser: UserProps = JSON.parse(userInfo || '{}')

      //Verificar as informações

      if (Object.keys(hasUser).length > 0) {
        api.defaults.headers.common[`Authorization`] = `Bearer ${hasUser.token}`

        const { email, id, name, token } = hasUser

        setUser({
          id,
          email,
          name,
          token
        })
      }

      setLoading(false)
    }

    getUser()
  }, [])

  async function sigIn(email: string, password: string) {

    if (email === '' || !email.includes('@')) return Alert.alert('Email invalido')

    if (password === '') return Alert.alert('Senha invalida')

    setLoadingAuth(true)

    try {
      const response = await api.post('/session', {
        email,
        password
      })

      const { id, name, token }: UserProps = response.data

      const data = {
        ...response.data
      }

      await AsyncStorage.setItem('@pepperoni', JSON.stringify(data))

      api.defaults.headers.common[`Authorization`] = `Bearer ${token}`

      setUser({
        email,
        id,
        name,
        token
      })

      setLoadingAuth(false)

    } catch (error) {
      Alert.alert("Erro ao acessar")
      console.log(error)
      setLoadingAuth(false)
    }
  }

  const [loadingAuth, setLoadingAuth] = useState(false)

  async function signOut() {
    await AsyncStorage.clear()
      .then(() => {
        setUser({
          email: '',
          id: '',
          name: '',
          token: ''
        })
      })
  }

  return (
    <AuthContext.Provider value={{
      isAuthenticated,
      user,
      sigIn,
      loading,
      loadingAuth,
      signOut
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useDataContext = () => useContext(AuthContext)