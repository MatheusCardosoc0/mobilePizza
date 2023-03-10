import React from "react"
import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { CategoryProps } from "../../pages/Order"

interface ModalPickerProps {
  handleCloseModal: () => void
  options: CategoryProps[]
  setSelectedCategory: (item: CategoryProps) => void
}

const dimension = Dimensions.get('window')

const ModalPicker = ({ handleCloseModal, options, setSelectedCategory }: ModalPickerProps) => {

  function onPressItem(item: CategoryProps) {
    setSelectedCategory(item)
    handleCloseModal()
  }


  return (
    <TouchableOpacity onPress={handleCloseModal}
      style={styles.container}>
      <View style={styles.content}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {options.map(option => (
            <TouchableOpacity key={option.id}
              onPress={() => onPressItem(option)}
              style={styles.option}>
              <Text style={styles.item}>
                {option.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  content: {
    width: dimension.width - 20,
    height: dimension.height / 2,
    backgroundColor: '#ffff',
    borderWidth: 1,
    borderColor: '#8a8a8a',
    borderRadius: 4
  },
  option: {
    alignItems: 'flex-start',
    borderWidth: 0.8,
    borderColor: '#8a8a8a',
  },
  item: {
    margin: 10,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#101026',
  }
})

export default ModalPicker