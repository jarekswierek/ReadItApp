import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";
import React from "react";
import booksData from "../data/books.json";

// Define type for the book data
type Book = {
  id: string;
  title: string;
  author: string;
  progress: number;
};

const DATA: Book[] = booksData;

type ItemProps = {
  title: string;
  author: string;
  progress: number;
  onPress: () => void;
};

const Item = ({ title, author, progress, onPress }: ItemProps) => (
  <TouchableOpacity style={styles.item} onPress={onPress} activeOpacity={0.7}>
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.author}>by {author}</Text>
    <View style={styles.progressContainer}>
      <View style={[styles.progressBar, { width: `${progress}%` }]} />
      <Text style={styles.progressText}>{progress}%</Text>
    </View>
  </TouchableOpacity>
);

export default function BooksList() {
  const handleBookPress = (id: string, title: string) => {
    Alert.alert(`Book Selected`, `You selected "${title}"`);
    // You can add navigation or other actions here
  };

  return (
    <FlatList
      data={DATA}
      renderItem={({ item }) => (
        <Item
          title={item.title}
          author={item.author}
          progress={item.progress}
          onPress={() => handleBookPress(item.id, item.title)}
        />
      )}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.list}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    padding: 0,
    backgroundColor: "#f8f9fa",
    width: "100%",
  },
  item: {
    backgroundColor: "#ffffff",
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 4,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    borderLeftWidth: 4,
    borderLeftColor: "#4A6FA5",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2D3748",
    marginBottom: 4,
  },
  author: {
    fontSize: 14,
    color: "#718096",
    fontStyle: "italic",
    marginBottom: 12,
  },
  progressContainer: {
    height: 20,
    backgroundColor: "#e9ecef",
    borderRadius: 10,
    overflow: "hidden",
    marginTop: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  progressBar: {
    height: "100%",
    backgroundColor: "#4A6FA5",
    position: "absolute",
    left: 0,
  },
  progressText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#2D3748",
    marginLeft: 8,
    zIndex: 1,
  },
});
