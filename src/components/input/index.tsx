import { KeyboardTypeOptions, Text, TextInput, View } from 'react-native';
import styles from './styles';

interface IInputProps {
  editable?: boolean;
  keyboardType?: KeyboardTypeOptions;
  label: string;
  value: number | string;
  onChangeText?: (text: string) => void;
}

export function Input(props: IInputProps) {
  let { editable, keyboardType, label, value, onChangeText } = props;

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        editable={editable}
        keyboardType={keyboardType || 'default'}
        style={styles.input}
        value={value ? String(value) : ''}
        onChangeText={onChangeText}
      />
    </View>
  );
}
