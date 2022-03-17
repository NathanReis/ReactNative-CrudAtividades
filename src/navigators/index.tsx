import { NavigationContainer } from '@react-navigation/native';
import { DrawerNavigator } from './drawer';

export function Navigator() {
  return (
    <NavigationContainer>
      <DrawerNavigator />
    </NavigationContainer>
  );
}
