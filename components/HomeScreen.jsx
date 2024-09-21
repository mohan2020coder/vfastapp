import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import CategorySelector from './Products/CategorySelector';
import ProductList from './Products/ProductList';

const HomeScreen = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('https://vfastservices.online/api/home/categories');
        const data = await response.json();
        setCategories(data);
        if (data.length > 0) {
          setSelectedCategory(data[0]);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.productListContainer1}>
        <CategorySelector 
            categories={categories} 
            selectedCategory={selectedCategory} 
            onSelect={setSelectedCategory} 
        />
      </View>
      {selectedCategory && (
        <View style={styles.productListContainer}>
          <ProductList products={selectedCategory.products} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch', // Allow children to stretch across the container
    justifyContent: 'flex-start', // Align items to the top
  },
  productListContainer: {
    flexGrow: 3, // Allow the product list to take available space
    padding: 10, // Optional padding for aesthetics
  },
  productListContainer1: {
    flexGrow: 1, // Allow the product list to take available space
    padding: 10, // Optional padding for aesthetics
  },
});

export default HomeScreen;
