import { Text } from 'react-native';
import { Input } from '../../components/input';
import { SafeZoneScreen } from '../../components/safeZoneScreen';
import styles from './styles';

export function Home() {
  return (
    <SafeZoneScreen>
      <Text>Hello World!!!</Text>
      <Input label='test' value={'oi'} />
    </SafeZoneScreen>
  );
}
