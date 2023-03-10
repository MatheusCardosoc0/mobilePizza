import { ActivityIndicator, View } from "react-native";
import { useDataContext } from "../context/AuthContextUser";
import { AppRoutes } from "./app.routes";
import { AuthRoute } from "./auth.routes";

function Routes() {

  const {isAuthenticated, loading} = useDataContext()

  if (loading) {
    return (
      <View style={{
        flex: 1,
        backgroundColor: '#060606',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <ActivityIndicator size={60} color={'#f7bf05'} />
      </View>
    )
  }

  return (
    isAuthenticated ? <AppRoutes /> : <AuthRoute />
  )
}

export default Routes