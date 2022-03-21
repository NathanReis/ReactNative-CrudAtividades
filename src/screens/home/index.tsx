import { useIsFocused, useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { Alert, Text, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { Button } from '../../components/button';
import { Loading } from '../../components/loading';
import { SafeZoneScreen } from '../../components/safeZoneScreen';
import { Select } from '../../components/select';
import { StatusEnum } from '../../enums/StatusEnum';
import { ILesson } from '../../models/ILesson';
import { Title } from '../../components/title';
import { LessonService } from '../../services/LessonService';
import styles from './styles';

export function Home() {
  async function loadData() {
    setIsLoading(true);

    try {
      let service = new LessonService();

      setLessons(await service.getByStatus(status));
    } catch {
      Alert.alert('Ops', 'Erro inesperado!');
    }

    setIsLoading(false);
  }

  function handleStatusChange(value: string) {
    setStatus(value)
  }

  async function handleConclude(id: number) {
    try {
      let service = new LessonService();
      let result = await service.updateStatus(id, StatusEnum.CONCLUDED);

      if (typeof result === 'object') {
        return Alert.alert('Erros', result.join('\n'));
      }

      await loadData();
    } catch {
      Alert.alert('Ops', 'Erro inesperado!');
    }
  }

  function handleNewLesson() {
    navigation.navigate('Nova atividade' as never);
  }

  function handleSeeAllLessons() {
    navigation.navigate('Atividades' as never);
  }

  function handleNewLessonType() {
    navigation.navigate('Novo tipo de atividade' as never);
  }

  function handleSeeAllLessonTypes() {
    navigation.navigate('Tipos de atividades' as never);
  }

  let [lessons, setLessons] = useState<ILesson[]>([]);
  let [status, setStatus] = useState<StatusEnum | string>('PENDING');
  let [isLoading, setIsLoading] = useState<boolean>(true);
  let isFocused = useIsFocused();
  let navigation = useNavigation();

  useEffect(() => {
    if (isFocused) {
      loadData();
    }
  }, [isFocused, status]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <SafeZoneScreen isWithoutScroll={true}>
      <View style={styles.buttonsContainer}>

        <Title content={'Atividades'} />
        <Select
          data={
            Object
              .entries(StatusEnum)
              .map(local => ({ key: local[0], value: local[1] }))
              .concat([{ key: 'all', value: 'Todas' as any }])
          }
          hasNotEmptyOption={true}
          label='Status'
          selectedValue={status}
          onValueChange={handleStatusChange}
        />
      </View>

      <View style={styles.listContainer}>
        <FlatList
          data={lessons}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text>{item.description}</Text>
              {
                item.status !== Object.entries(StatusEnum).find(status => status[1] == StatusEnum.CONCLUDED)![0] &&
                <Button title='Concluir' onPress={() => handleConclude(item.id!)} />
              }
            </View>
          )} />
      </View>

      <View style={styles.buttonsContainer}>
        <View>
          <Text style={styles.title}>Atividade</Text>
          <Button title='Nova' onPress={handleNewLesson} />
          <Button title='Todas' onPress={handleSeeAllLessons} />
        </View>

        <View>
          <Text style={styles.title}>Tipo de atividade</Text>
          <Button title='Nova' onPress={handleNewLessonType} />
          <Button title='Todas' onPress={handleSeeAllLessonTypes} />
        </View>
      </View>
    </SafeZoneScreen>
  );
}
