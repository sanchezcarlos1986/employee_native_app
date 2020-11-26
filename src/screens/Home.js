import React from "react";
import { StyleSheet, View, FlatList } from "react-native";
import { FAB } from "react-native-paper";
import { artists } from "~/data/artists.json";
import ArtistCard from "~/components/ArtistCard";

const Home = () => {
  return (
    <View>
      <FlatList
        data={artists}
        renderItem={({ item }) => <ArtistCard {...item} />}
        keyExtractor={(item) => item.id}
      />
      <FAB
        style={styles.fab}
        small
        icon="plus"
        onPress={() => console.log("Pressed")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

export default Home;
