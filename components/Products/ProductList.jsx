import React,{useState} from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Button, TextInput } from 'react-native';
import { useCart } from '../context/CartContext';

const ProductList = ({ products }) => {
    const { dispatch } = useCart();
    const [searchTerm, setSearchTerm] = useState('');
  
    const addToCart = (product) => {
      dispatch({ type: 'ADD_TO_CART', product });
      alert(`${product.name} added to cart!`); // Simple alert for confirmation
    };

    // Filter products based on search term
    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  
    return (
        <View  style={styles.productList}> 
             <TextInput
            style={styles.searchInput}
            placeholder="Search products..."
            value={searchTerm}
            onChangeText={setSearchTerm}
            
         />
        <ScrollView contentContainerStyle={styles.productListContainer}>
            
        {filteredProducts.length === 0 ? (
          <Text style={styles.noProductsText}>No products found</Text>
        ) : (
          filteredProducts.map(product => (
            <View key={product.id} style={styles.productCard}>
              {/* <Image source={{ uri: product.image }} style={styles.productImage} /> */}
              <Image source={{uri:'https://m.media-amazon.com/images/G/31/img20/Events/Jup21dealsgrid/All_Icons_Template_1_icons_01.jpg'}} style={styles.productImage} /> 
              <Text style={styles.productName}>{product.name}</Text>
              <Text style={styles.productPrice}>${product.price.toFixed(2)}</Text>
              <Text style={styles.productDescription}>{product.description}</Text>
              <Button title="Add to Cart" onPress={() => addToCart(product)} />

            </View>
          ))
        )}
        </ScrollView>
      </View>
    );
  };
  

const styles = StyleSheet.create({
  productListContainer: {
    flexDirection: 'row', // Allows for a row layout
    flexWrap: 'wrap', // Wraps items into the next row
    justifyContent: 'space-between', // Space between products
    padding: 10,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
   productList: {
    marginBottom: 200,
  },
  cartButton: {
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  productCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    elevation: 3, // For shadow on Android
    width: '48%', // Adjust as needed for spacing
  },
  productImage: {
    width: '100%',
    height: 100, // Adjust the height as needed
    borderRadius: 10,
    marginBottom: 5,
  },
  productName: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  productPrice: {
    color: 'green',
    marginBottom: 5,
  },
  productDescription: {
    marginTop:10,
    fontSize: 12,
    color: '#666',
    marginBottom:10,
  },
});

export default ProductList;
