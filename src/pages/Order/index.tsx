import React, { useEffect, useState } from 'react'
import { Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { Feather } from '@expo/vector-icons'
import { api } from '../../services/api'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { StackPramsList } from '../../routes/app.routes'
import ModalPicker from '../../components/Modal'

type routeDetailParams = {
  Order: {
    number: string | number
    order_id: string
  }
}

type OrderRouteProps = RouteProp<routeDetailParams, 'Order'>

export type CategoryProps = {
  id: string
  name: string
}

const Order = () => {

  const navigation = useNavigation<NativeStackNavigationProp<StackPramsList>>()
  const [category, setCategory] = useState<CategoryProps[] | []>([])
  const [categorySelected, setCategorySelected] = useState<CategoryProps>()
  const [amount, setAmount] = useState('')
  const [modalCategoryVisible, setModalVisible] = useState(false)

  const route = useRoute<OrderRouteProps>()

  async function deleteOrder() {
    try {
      await api.delete('/order', {
        params: {
          id: route.params.order_id
        }
      })
      navigation.push('Dashboard')
    } catch (error) {
      alert("Houve um erro ao deletar a ordem")
      console.log(error)
    }
  }

  useEffect(() => {
    async function getCategories() {
      const response = await api.get("/categories")

      setCategory(response.data)
      setCategorySelected(response.data[0])
    }
    getCategories()
  }, [])

  console.log(categorySelected)

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>
          Mesa {route.params.number}
        </Text>
        <TouchableOpacity onPress={deleteOrder}>
          <Feather name='trash-2' size={28} color="#d51414" />
        </TouchableOpacity>
      </View>

      {category.length !== 0 && (
        <TouchableOpacity style={styles.input}
          onPress={() => setModalVisible(true)}>
          <Text style={{ color: '#ffffff' }}>
            {categorySelected?.name}
          </Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity style={styles.input}>
        <Text style={{ color: '#ffffff' }}>Pizza de mussarella</Text>
      </TouchableOpacity>

      <View style={styles.qtdContainer}>
        <Text style={styles.qtdText}>Quantidade</Text>
        <TextInput placeholderTextColor={"#e5e0e0"}
          keyboardType={"numeric"}
          style={[styles.input, { width: '60%', textAlign: 'center' }]}
          value={amount}
          onChangeText={setAmount} />
      </View>

      <View style={styles.action}>
        <TouchableOpacity style={styles.buttonAdd}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Avançar</Text>
        </TouchableOpacity>
      </View>

      <Modal transparent={true}
        visible={modalCategoryVisible}
        animationType="fade">
        <ModalPicker handleCloseModal={() => setModalVisible(false)}
        setSelectedCategory={setCategorySelected}
        options={category} />
      </Modal>
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
  action: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between'
  },
  buttonAdd: {
    width: '20%',
    backgroundColor: '#3fd1ff',
    borderRadius: 4,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    backgroundColor: '#3fffa3',
    borderRadius: 4,
    height: 40,
    width: '75%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold'
  }
})

export default Order