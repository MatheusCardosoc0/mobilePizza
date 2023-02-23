import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { useDataContext } from '../../context/AuthContextUser'

const SigIn = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const {sigIn} = useDataContext()

  const handleSubmit = async () => {
    await sigIn(email, password)
  }

  const {loadingAuth} = useDataContext()

  return (
    <View style={style.container}>
      <View style={style.logo}>
        <Image style={style.logoImage}
        source={require('../../assets/logo.png')} />

        <Text style={style.textLogo}>Pepperoni pizzaria</Text>
      </View>

      <View style={style.inpuputContainer}>
        <TextInput placeholder='Seu email' 
        placeholderTextColor={"#f0f0f0"}
        style={style.input}
        value={email}
        onChangeText={setEmail}/>

        <TextInput placeholder='Sua senha' 
        placeholderTextColor={"#f0f0f0"}
        style={style.input}
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}/>

        <TouchableOpacity style={style.button} onPress={handleSubmit}>
          {loadingAuth? (
            <ActivityIndicator size={25} color="#fff" />
          ) : (
            <Text style={style.buttonText}>Acessar</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  )
}



const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1d1d2e'
  },

  logo: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 16,
  },
  textLogo: {
    fontSize: 28,
    color: '#ddb30a'
  },
  logoImage: {
    width: 80,
    height: 80
  },

  inpuputContainer: {
    width: '95%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 14,
    paddingVertical: 32
  },
  input: {
    width: '95%',
    height: 40,
    paddingHorizontal: 8,
    backgroundColor: '#0f0f0f' ,
    marginBottom: 12,
    borderRadius: 4,
    color: '#fff'
  },

  button: {
    width: '95%',
    height: 40,
    backgroundColor: '#11e234',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#101018'
  }
})

export default SigIn