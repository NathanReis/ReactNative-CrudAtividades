import { ReactNode } from 'react';
import { Keyboard, KeyboardAvoidingView, Platform, SafeAreaView, View } from 'react-native';
import { ScrollView, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import styles from './styles';

interface ISafeZoneScreenProps {
  children: ReactNode;
}

export function SafeZoneScreen(props: ISafeZoneScreenProps) {
  let { children } = props;

  return (
    <SafeAreaView>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView>
            <View style={styles.container}>
              {children}
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView >
  );
}
