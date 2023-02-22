import SigIn from '../pages/SigIn'
import {createNativeStackNavigator} from '@react-navigation/native-stack'

const {Screen, Navigator} = createNativeStackNavigator()

export function AuthRoute(){
  return(
    <Navigator>
      <Screen name='SigIn' component={SigIn} options={{headerShown: false}} />
    </Navigator>
  )
}