import { useIsFocused, useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { Alert, Text, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { Button } from '../../components/button';
import { Loading } from '../../components/loading';
import { SafeZoneScreen } from '../../components/safeZoneScreen';
import { Title } from '../../components/title';
import { ILesson } from '../../models/ILesson';
import { LessonService } from '../../services/LessonService';
import styles from './styles';

export function LessonList() {
  async function loadData() {
    setIsLoading(true);

    try {
      let service = new LessonService();

      setLessons(await service.getAll());
    } catch {
      Alert.alert('Ops', 'Erro inesperado!');
    }

    setIsLoading(false);
  }

  function handleEdit(id: number) {
    navigation.navigate('Nova atividade' as never, { id } as never);
  }

  async function handleDelete(id: number) {
    try {
      let service = new LessonService();

      await service.delete(id);

      await loadData();
    } catch {
      Alert.alert('Ops', 'Erro inesperado!');
    }
  }

  let [lessons, setLessons] = useState<ILesson[]>([]);
  let [isLoading, setIsLoading] = useState<boolean>(true);
  let isFocused = useIsFocused();
  let navigation = useNavigation();

  useEffect(() => {
    if (isFocused) {
      loadData();
    }
  }, [isFocused]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <SafeZoneScreen isWithoutScroll={true}>
      <Title content={'Lista de\natividades'} />

      <FlatList
        data={lessons}
        keyExtractor={item => String(item.id)}
        renderItem={({ item }) => (
          <View>
            <Text>{item.description}</Text>
            <Button title='Editar' onPress={() => handleEdit(item.id!)} />
            <Button title='Excluir' onPress={() => handleDelete(item.id!)} />
          </View>
        )} />
    </SafeZoneScreen>
  );
}
