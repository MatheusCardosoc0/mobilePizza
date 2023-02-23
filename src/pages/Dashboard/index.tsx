import { View, Text, Button } from 'react-native'
import React from 'react'
import { useDataContext } from '../../context/AuthContextUser'

const Dashboard = () => {

  const {signOut} = useDataContext()

  return (
    <View>
      <Text>Dashboard</Text>
      <Button title='Sair do app'
      onPress={signOut} />
    </View>
  )
}

export default Dashboard