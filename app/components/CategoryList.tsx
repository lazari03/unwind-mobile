import React, { useState, useEffect } from 'react';
import { ScrollView, View, TouchableOpacity, StyleSheet } from 'react-native';
import { Text } from '@/components/ui/text';
import { Category } from '../services/eventService';

type CategoryListProps = {
  categories?: Category[];
  onSelectCategory: (categoryID: number | null) => void;
};

const CategoryList: React.FC<CategoryListProps> = ({ categories = [], onSelectCategory }) => {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  useEffect(() => {
    if (categories.length > 0) {
      setSelectedCategory(null);
    }
  }, [categories]);

  const handleCategoryPress = (categoryId: number | null) => {
    setSelectedCategory(categoryId);
    onSelectCategory(categoryId);
    const selectedCategoryName =
      categoryId === null ? 'All' : categories.find((category) => category.id === categoryId)?.name;
    console.log(`Selected Category: ${selectedCategoryName}`);
  };

  return (
    <View>
      <ScrollView
        horizontal
        style={styles.scrollContainer}
        showsHorizontalScrollIndicator={false}
      >
        <TouchableOpacity
          onPress={() => handleCategoryPress(null)}
          style={styles.categoryItem}
        >
          <Text
            style={[
              styles.categoryText,
              selectedCategory === null ? styles.selectedCategoryText : styles.unselectedCategoryText,
            ]}
          >
            All
          </Text>
          {selectedCategory === null && <View style={styles.selectedIndicator} />}
        </TouchableOpacity>
        {categories.map((category) => (
          <TouchableOpacity
            key={category.id}
            onPress={() => handleCategoryPress(category.id)}
            style={styles.categoryItem}
          >
            <Text
              style={[
                styles.categoryText,
                selectedCategory === category.id ? styles.selectedCategoryText : styles.unselectedCategoryText,
              ]}
            >
              {category.name}
            </Text>
            {selectedCategory === category.id && <View style={styles.selectedIndicator} />}
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexDirection: 'row',
    paddingVertical: 10,
  },
  categoryItem: {
    paddingHorizontal: 10, // Dynamic padding instead of fixed width
    alignSelf: 'flex-start', // Let it size according to content
  },
  categoryText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  selectedCategoryText: {
    color: 'white',
  },
  unselectedCategoryText: {
    color: 'gray',
  },
  selectedIndicator: {
    width: '100%', // Full width of text
    height: 6,
    backgroundColor: 'white',
    borderRadius: 50,
    marginTop: 4,
  },
});

export default CategoryList;