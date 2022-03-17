import { KeyboardTypeOptions, Text, TextInput, View } from 'react-native';
import styles from './styles';

interface IInputProps {
  keyboardType?: KeyboardTypeOptions;
  label: string;
  value: number | string;
  onChangeText?: (text: string) => void;
}

export function Input(props: IInputProps) {
  let { keyboardType, label, value, onChangeText } = props;

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        keyboardType={keyboardType || 'default'}
        style={styles.input}
        value={value ? String(value) : ''}
        onChangeText={onChangeText}
      />
    </View>
  );
}
