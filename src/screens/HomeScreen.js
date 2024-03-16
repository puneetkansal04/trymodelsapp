import React from 'react';
import { FlatList, Text, View } from 'react-native';

function HomeScreen() {
  const renderItem = ({ item }) => {
    return (
      <View
        style={{
          flex: 1,
          height: 100,
          backgroundColor: 'blue',
          margin: 10,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text style={{ color: 'white' }}>{item}</Text>
      </View>
    );
  };
  
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        contentContainerStyle={{ flexGrow: 1 }}
        numColumns={2}
        data={[1, 2, 3, 4]}
        renderItem={renderItem}
        keyExtractor={(item) => item.toString()}
      />
    </View>
  );
}

export default HomeScreen;
