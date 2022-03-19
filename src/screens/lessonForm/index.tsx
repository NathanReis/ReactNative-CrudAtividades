import DateTimePicker from '@react-native-community/datetimepicker';
import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { Alert, View } from 'react-native';
import { Button } from '../../components/button';
import { Input } from '../../components/input';
import { Loading } from '../../components/loading';
import { SafeZoneScreen } from '../../components/safeZoneScreen';
import { Select } from '../../components/select';
import { Title } from '../../components/title';
import { LocalEnum } from '../../enums/LocalEnum';
import { StatusEnum } from '../../enums/StatusEnum';
import { ILesson } from '../../models/ILesson';
import { ILessonType } from '../../models/ILessonType';
import { LessonService } from '../../services/LessonService';
import { LessonTypeService } from '../../services/LessonTypeService';
import styles from './styles';

interface IParams {
  id?: number;
}

export function LessonForm() {
  function clearFields() {
    setId(0);
    setLessonTypeId(0);
    setDescription('');
    setLocal('');
    setSendDate(new Date());
    setSendTime(new Date());
    setStatus('');
  }

  function mergeSendDateAndTime() {
    let sendIsoDate = sendDate.toISOString();
    let sendIsoTime = sendTime.toISOString();

    let date = sendIsoDate.substring(0, sendIsoDate.indexOf('T'));
    let time = sendIsoTime.substring(sendIsoTime.indexOf('T') + 1);

    return new Date(`${date}T${time}`);
  }

  function handleDescriptionChange(text: string) {
    setDescription(text);
  }

  function handleLessonTypeChange(value: number) {
    setLessonTypeId(value)
  }

  function handleLocalChange(value: string) {
    setLocal(value)
  }

  function handleSenDateChange(date?: Date) {
    setIsToShowDatePicker(false);

    if (date) {
      setSendDate(date);
    }
  }

  function handleSenTimeChange(date?: Date) {
    setIsToShowTimePicker(false);

    if (date) {
      setSendTime(date);
    }
  }

  function handleStatusChange(value: string) {
    setStatus(value)
  }

  async function handleSave() {
    try {
      let lesson: ILesson = {
        id,
        lessonTypeId,
        description,
        local,
        sendDateTime: mergeSendDateAndTime(),
        status
      };
      let service = new LessonService();
      let result = id
        ? await service.update(lesson)
        : await service.create(lesson);

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
      let service = new LessonService();

      await service.delete(id);

      clearFields();
    } catch {
      Alert.alert('Ops', 'Erro inesperado!');
    }
  }

  function handleSeeAll() {
    navigation.navigate('Atividades' as never);
  }

  let [id, setId] = useState<number>(0);
  let [lessonTypes, setLessonTypes] = useState<ILessonType[]>([]);
  let [lessonTypeId, setLessonTypeId] = useState<number>(0);
  let [description, setDescription] = useState<string>('');
  let [local, setLocal] = useState<LocalEnum | string>('');
  let [sendDate, setSendDate] = useState<Date>(new Date());
  let [sendTime, setSendTime] = useState<Date>(new Date());
  let [status, setStatus] = useState<StatusEnum | string>('');
  let [isLoading, setIsLoading] = useState<boolean>(true);
  let [isToShowDatePicker, setIsToShowDatePicker] = useState<boolean>(false);
  let [isToShowTimePicker, setIsToShowTimePicker] = useState<boolean>(false);
  let isFocused = useIsFocused();
  let navigation = useNavigation();
  let route = useRoute();

  useEffect(() => {
    async function loadLessonTypes() {
      try {
        let service = new LessonTypeService();

        setLessonTypes(await service.getAll());
      } catch {
        Alert.alert('Ops', 'Erro inesperado!');
      }
    }

    async function loadLesson() {
      try {
        let params = route.params as IParams;

        if (params && params.id) {
          let service = new LessonService();
          let lesson = await service.getById(params.id)

          setId(lesson.id!);
          setLessonTypeId(lesson.lessonTypeId);
          setDescription(lesson.description);
          setLocal(
            Object
              .entries(LocalEnum)
              .find(local => local[0] === lesson.local)![0]
          );
          setSendDate(lesson.sendDateTime);
          setSendTime(lesson.sendDateTime);
          setStatus(
            Object
              .entries(StatusEnum)
              .find(status => status[0] === lesson.status)![0]
          );
        } else {
          clearFields();
        }
      } catch {
        Alert.alert('Ops', 'Erro inesperado!');
      }
    }

    async function loadData() {
      await loadLessonTypes();
      await loadLesson();

      setIsLoading(false);
    }

    if (isFocused) {
      setIsLoading(true);
      loadData();
      navigation.setParams({ id: 0 } as never);
    }
  }, [isFocused]);

  if (isLoading) {
    return <Loading />
  }

  return (
    <SafeZoneScreen>
      <Title content={'Formulário de\natividade'} />

      {id ? <Input editable={false} label='ID' value={id} /> : null}
      <Input label='Descrição' value={description} onChangeText={handleDescriptionChange} />
      <Select
        data={lessonTypes.map(({ id, description }) => ({ key: id!, value: description }))}
        selectedValue={lessonTypeId}
        onValueChange={handleLessonTypeChange}
      />
      <Select
        data={Object.entries(LocalEnum).map(local => ({ key: local[0], value: local[1] }))}
        selectedValue={local}
        onValueChange={handleLocalChange}
      />
      <Input editable={false} label='Data de entrega' value={sendDate.toISOString()} />
      <Button title='Calendário' onPress={() => setIsToShowDatePicker(true)} />
      {
        isToShowDatePicker &&
        <DateTimePicker
          mode='date'
          value={sendDate}
          onChange={(_: any, date?: Date) => handleSenDateChange(date)}
        />
      }
      <Input editable={false} label='Horário da entrega' value={sendTime.toISOString()} />
      <Button title='Relógio' onPress={() => setIsToShowTimePicker(true)} />
      {
        isToShowTimePicker &&
        <DateTimePicker
          is24Hour={true}
          mode='time'
          value={sendTime}
          onChange={(_: any, date?: Date) => handleSenTimeChange(date)}
        />
      }
      <Select
        data={Object.entries(StatusEnum).map(local => ({ key: local[0], value: local[1] }))}
        selectedValue={status}
        onValueChange={handleStatusChange}
      />

      <View style={styles.buttonsContainer}>
        <Button title='Salvar' onPress={handleSave} />
        {id ? <Button title='Apagar' onPress={handleDelete} /> : null}
      </View>

      <Button title='Ver todas' onPress={handleSeeAll} />
    </SafeZoneScreen>
  );
}
