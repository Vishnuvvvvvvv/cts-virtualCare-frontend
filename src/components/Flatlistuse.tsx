import { View, Text, FlatList, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import React, { useState } from 'react';

const Flatlistuse = () => {
  type ItemData = {
    id: string;
    title: string;
  };

  const [selectedID, setSelectedID] = useState<string>();

  const DATA: ItemData[] = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'First Item',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Second Item',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Third Item',
    },
  ];

  const pressHandler = (item: ItemData) => {
    setSelectedID(item.id);
    Alert.alert(item.title);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Flatlist</Text>
      <FlatList
        data={DATA}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity onPress={() => pressHandler(item)} style={[styles.itemContainer ,{backgroundColor : selectedID==item.id?'red':'white'}]}>
              <View style={styles.itemContent}>
                <Text style={styles.itemTitle}>{item.title}</Text>
              </View>
            </TouchableOpacity>
          );
        }}
        extraData={selectedID}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f8f9fa',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  itemContainer: {
    padding: 16,
    marginBottom: 8,
    backgroundColor:'#fff',

    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2, // For Android shadow
  },
  itemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemTitle: {
    fontSize: 18,
    color: '#333',
  },
});

export default Flatlistuse;
