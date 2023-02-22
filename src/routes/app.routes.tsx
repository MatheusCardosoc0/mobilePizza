import Dashboard from '../pages/Dashboard'
import {createNativeStackNavigator} from '@react-navigation/native-stack'

const {Screen, Navigator} = createNativeStackNavigator()

export function AppRoutes(){
  return(
    <Navigator>
      <Screen name='SigIn' component={Dashboard} />
    </Navigator>
  )
}