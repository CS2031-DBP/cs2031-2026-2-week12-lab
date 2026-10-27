import { FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import type { Course } from '../types';

type Props = {
  courses: Course[];
  onPress: (courseId: number) => void;
  emptyMessage?: string;
};

export function CourseList({ courses, onPress, emptyMessage }: Props) {
  if (courses.length === 0 && emptyMessage) {
    return <Text style={styles.empty}>{emptyMessage}</Text>;
  }

  return (
    <FlatList
      data={courses}
      keyExtractor={item => String(item.id)}
      renderItem={({ item }) => (
        <TouchableOpacity style={styles.item} onPress={() => onPress(item.id)}>
          <Text style={styles.itemTitle}>{item.name}</Text>
          <Text style={styles.itemSubtitle}>{item.credits} créditos</Text>
        </TouchableOpacity>
      )}
      contentContainerStyle={styles.list}
    />
  );
}

const styles = StyleSheet.create({
  list: { padding: 16 },
  item: {
    backgroundColor: '#f0f0f0',
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
  },
  itemTitle: { fontSize: 16, fontWeight: '600' },
  itemSubtitle: { fontSize: 14, color: '#666', marginTop: 4 },
  empty: { flex: 1, textAlign: 'center', marginTop: 32, color: '#666' },
});
