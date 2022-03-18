import { createDrawerNavigator } from '@react-navigation/drawer';
import { Home } from '../screens/home';
import { LessonForm } from '../screens/lessonForm';
import { LessonList } from '../screens/lessonList';
import { LessonTypeForm } from '../screens/lessonTypeForm';
import { LessonTypeList } from '../screens/lessonTypeList';

let drawer = createDrawerNavigator();

export function DrawerNavigator() {
  return (
    <drawer.Navigator screenOptions={{ headerShown: false }}>
      <drawer.Screen name='Home' component={Home} />
      <drawer.Screen name='Nova atividade' component={LessonForm} />
      <drawer.Screen name='Atividades' component={LessonList} />
      <drawer.Screen name='Novo tipo de atividade' component={LessonTypeForm} />
      <drawer.Screen name='Tipos de atividades' component={LessonTypeList} />
    </drawer.Navigator>
  );
}
