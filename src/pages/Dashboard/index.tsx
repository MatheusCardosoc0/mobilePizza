import { View, Text, Button, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { useDataContext } from '../../context/AuthContextUser'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp, NativeStackNavigatorProps } from '@react-navigation/native-stack/lib/typescript/src/types'
import { StackPramsList } from '../../routes/app.routes'

const Dashboard = () => {

  const navigation = useNavigation<NativeStackNavigationProp<StackPramsList>>()

  const {signOut} = useDataContext()

  const [number, setNumber] = useState('')

  async function openOrder(){
    if(number === '') return alert("Preencha o número da mesa")

    navigation.navigate("Order", {number: number, order_id: ''})
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Novo pedido</Text>

      <TextInput style={styles.input}
        placeholder='Número da mesa'
        placeholderTextColor={"#ffffff"}
        keyboardType="numeric"
        onChangeText={setNumber}
        value={number}
      />

      <TouchableOpacity style={styles.button}
      onPress={openOrder}>
        <Text style={styles.buttonText}>Abrir mesa</Text>
      </TouchableOpacity>
     
        
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingVertical: 15,
    alignItems: 'center',
    backgroundColor: '#1d1d1d'
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 24
  },
  input: {
    width: '90%',
    height: 68,
    backgroundColor: '#000',
    borderRadius: 4,
    paddingHorizontal: 8,
    textAlign: 'center',
    color: '#fff',
    fontSize: 22
  },
  button: {
    width: '90%',
    height: 40,
    backgroundColor: '#3fffa3',
    borderRadius: 4,
    marginVertical: 12,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    fontSize: 18,
    color: '#101026',
    fontWeight: 'bold'
  }
})

export default Dashboard