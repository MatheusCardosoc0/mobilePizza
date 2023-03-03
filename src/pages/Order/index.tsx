import React from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { RouteProp, useRoute } from '@react-navigation/native'
import {Feather} from '@expo/vector-icons'

type routeDetailParams ={
  Order: {
    number: string | number
    order_id: string
  }
}

type OrderRouteProps = RouteProp<routeDetailParams, 'Order'>

const Order = () => {

  const route = useRoute<OrderRouteProps>()

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>
          Mesa {route.params.number}
        </Text>
        <TouchableOpacity>
          <Feather name='trash-2' size={28} color="#d51414"/>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.input}>
        <Text style={{color: '#ffffff'}}>Pizzas</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.input}>
        <Text style={{color: '#ffffff'}}>Pizza de mussarella</Text>
      </TouchableOpacity>

      <View style={styles.qtdContainer}>
        <Text style={styles.qtdText}>Quantidade</Text>
        <TextInput placeholderTextColor={"#e5e0e0"}
        keyboardType={"numeric"}
        value="1"
        style={[styles.input, {width: '60%', textAlign: 'center'}]} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1d1d26',
    paddingVertical: '5%',
    paddingEnd: '4%',
    paddingStart: '4%'
  },
  header: {
    flexDirection: "row",
    marginBottom: 12,
    alignItems: 'center',
    marginTop: 24
  },
  title: {
    fontSize: 38,
    fontWeight: 'bold',
    color: '#fff',
    marginRight: 14
  },
  input: {
    backgroundColor: '#101026',
    width: '100%',
    height: 40,
    justifyContent: 'center',
    borderRadius: 4,
    paddingHorizontal: 8,
    marginVertical: 4,
    color: '#fff',
    fontSize: 22
  },
  qtdText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff'
  },
  qtdContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  qtdInput: {}
})

export default Order