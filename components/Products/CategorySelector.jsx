// CategorySelector.js
import React from 'react';
import { ScrollView, TouchableOpacity, Text, StyleSheet } from 'react-native';

const CategorySelector = ({ categories, selectedCategory, onSelect }) => {
  return (
    <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false} 
      style={styles.categoryScroll}
    >
      {categories.map(category => (
        <TouchableOpacity
          key={category.id}
          style={[
            styles.categoryButton,
            selectedCategory?.id === category.id && styles.selectedCategoryButton
          ]}
          onPress={() => onSelect(category)}
        >
          <Text style={styles.categoryButtonText}>{category.label}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  categoryScroll: {
    paddingVertical: 10,
    height: 60, // Set a fixed height for the scroll view
  },
  categoryButton: {
    backgroundColor: 'gray',
    color: '#000',
    borderRadius: 20,
    padding: 10,
    marginHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
    height: 40, // Set a fixed height for the buttons
    minWidth: 80, // Ensure buttons have a minimum width
  },
  selectedCategoryButton: {
    backgroundColor: '#6200ee',
  },
  categoryButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default CategorySelector;
