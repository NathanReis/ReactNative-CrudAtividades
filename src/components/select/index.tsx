import { Picker } from '@react-native-picker/picker';
import { Text, View } from 'react-native';
import styles from './styles';

interface ISelectProps {
  data: { key: number | string, value: string }[];
  hasNotEmptyOption?: boolean;
  label: string;
  selectedValue: number | string;
  onValueChange: (value: any, index: number) => void;
}

export function Select(props: ISelectProps) {
  let { data, hasNotEmptyOption, label, selectedValue, onValueChange } = props;
  let emptyValue = typeof data[0]?.key === 'number' ? 0 : '';

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <Picker
        mode='dropdown'
        selectedValue={selectedValue}
        style={styles.picker}
        onValueChange={onValueChange}
      >
        {!hasNotEmptyOption && <Picker.Item key={emptyValue} label='' value={emptyValue} />}
        {data.map(item => <Picker.Item key={item.key} label={item.value} value={item.key} />)}
      </Picker>
    </View>
  );
}
