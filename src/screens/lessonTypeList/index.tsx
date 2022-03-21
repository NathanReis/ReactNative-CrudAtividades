import { useIsFocused, useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { Alert, Text, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { Button } from '../../components/button';
import { Loading } from '../../components/loading';
import { SafeZoneScreen } from '../../components/safeZoneScreen';
import { Title } from '../../components/title';
import { ILessonType } from '../../models/ILessonType';
import { LessonTypeService } from '../../services/LessonTypeService';
import styles from './styles';

export function LessonTypeList() {
  async function loadData() {
    setIsLoading(true);

    try {
      let service = new LessonTypeService();

      setLessonTypes(await service.getAll());
    } catch {
      Alert.alert('Ops', 'Erro inesperado!');
    }

    setIsLoading(false);
  }

  function handleEdit(id: number) {
    navigation.navigate('Novo tipo de atividade' as never, { id } as never);
  }

  async function handleDelete(id: number) {
    try {
      let service = new LessonTypeService();

      await service.delete(id);

      await loadData();
    } catch {
      Alert.alert('Ops', 'Erro inesperado!');
    }
  }

  let [lessonTypes, setLessonTypes] = useState<ILessonType[]>([]);
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
      <Title content={'Tipos de atividades'} />
      <View style={styles.listContainer}>
      <FlatList
        data={lessonTypes}
        keyExtractor={item => String(item.id)}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.description}</Text>
            <View style={styles.rowContainer}>
            <Button title='Editar' onPress={() => handleEdit(item.id!)} />
            <Button title='Excluir' onPress={() => handleDelete(item.id!)} />
            </View>
          </View>
        )} />
        </View>
    </SafeZoneScreen>
  );
}
