import Dashboard from '../pages/Dashboard'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import Order from '../pages/Order'

export type StackPramsList = {
  Dashboard: undefined
  Order: {
    number: string,
    order_id: string
  }
}

const {Screen, Navigator} = createNativeStackNavigator<StackPramsList>()

export function AppRoutes(){
  return(
    <Navigator>
      <Screen name='Dashboard' component={Dashboard}
      options={{headerShown: false}} />
      <Screen name='Order' component={Order}
      options={{headerShown: false}} />
    </Navigator>
  )
}