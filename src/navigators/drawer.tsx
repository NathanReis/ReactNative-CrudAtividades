import { createDrawerNavigator } from '@react-navigation/drawer';
import { Home } from '../screens/home';

let drawer = createDrawerNavigator();

export function DrawerNavigator() {
  return (
    <drawer.Navigator screenOptions={{ headerShown: false }}>
      <drawer.Screen name='Home' component={Home} />
      <drawer.Screen name='Atividades' component={Home} />
      <drawer.Screen name='Tipos de atividades' component={Home} />
    </drawer.Navigator>
  );
}
