import { useNavigation, useRoute } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { Alert, Text, View } from 'react-native';
import { Button } from '../../components/button';
import { Input } from '../../components/input';
import { Loading } from '../../components/loading';
import { SafeZoneScreen } from '../../components/safeZoneScreen';
import { Title } from '../../components/title';
import { ILessonType } from '../../models/ILessonType';
import { LessonTypeService } from '../../services/LessonTypeService';
import styles from './styles';

interface IParams {
  id?: number;
}

export function LessonTypeForm() {
  function clearFields() {
    setId(0);
    setDescription('');
  }

  function handleDescriptionChange(text: string) {
    setDescription(text);
  }

  async function handleSave() {
    try {
      let lessonType: ILessonType = { id, description };
      let service = new LessonTypeService();
      let result = id
        ? await service.update(lessonType)
        : await service.create(lessonType);

      if (typeof result === 'object') {
        return Alert.alert('Erros', result.join('\n'));
      }

      if (typeof result === 'number') {
        setId(result);
      }
    } catch {
      Alert.alert('Ops', 'Erro inesperado!');
    }
  }

  async function handleDelete() {
    try {
      let service = new LessonTypeService();

      await service.delete(id);

      clearFields();
    } catch {
      Alert.alert('Ops', 'Erro inesperado!');
    }
  }

  function handleSeeAll() {
    navigation.navigate('Tipos de atividades' as never);
  }

  let [id, setId] = useState<number>(0);
  let [description, setDescription] = useState<string>('');
  let [isLoading, setIsLoading] = useState<boolean>(true);
  let navigation = useNavigation();
  let route = useRoute();

  useEffect(() => {
    async function loadData() {
      try {
        let params = route.params as IParams;

        if (params.id) {
          let service = new LessonTypeService();
          let lessonType = await service.getById(params.id)

          setId(Number(lessonType.id));
          setDescription(lessonType.description);
        } else {
          clearFields();
        }
      } catch {
        Alert.alert('Ops', 'Erro inesperado!');
      }

      setIsLoading(false);
    }

    setIsLoading(true);

    loadData();
  }, [route.params]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <SafeZoneScreen>
      <Title content={'Tipo de\natividade'} />

      <Input editable={false} label='ID' value={id} />
      <Input label='Descrição' value={description} onChangeText={handleDescriptionChange} />

      <View style={styles.buttonsContainer}>
        <Button title='Salvar' onPress={handleSave} />
        <Button title='Apagar' onPress={handleDelete} />
      </View>

      <Button title='Ver todos' onPress={handleSeeAll} />
    </SafeZoneScreen>
  );
}
