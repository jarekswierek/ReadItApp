import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
  Modal,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React, { useState } from "react";
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
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [lastReadPage, setLastReadPage] = useState("");

  const handleBookPress = (id: string, title: string) => {
    const book = DATA.find((book) => book.id === id);
    if (book) {
      setSelectedBook(book);
      setModalVisible(true);
    }
  };

  const handleSavePage = () => {
    const pageNumber = parseInt(lastReadPage);
    if (isNaN(pageNumber) || pageNumber < 0) {
      Alert.alert("Invalid Input", "Please enter a valid page number");
      return;
    }

    Alert.alert(
      "Page Saved",
      `Last read page for "${selectedBook?.title}" set to: ${pageNumber}`
    );
    setModalVisible(false);
  };

  return (
    <>
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

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>{selectedBook?.title}</Text>
              <Text style={styles.modalAuthor}>by {selectedBook?.author}</Text>

              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Last read page:</Text>
                <TextInput
                  style={styles.input}
                  keyboardType="numeric"
                  value={lastReadPage}
                  onChangeText={setLastReadPage}
                  placeholder="Enter page number"
                />
              </View>

              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={[styles.button, styles.cancelButton]}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.button, styles.saveButton]}
                  onPress={handleSavePage}
                >
                  <Text style={styles.buttonText}>Save</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </>
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
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalAuthor: {
    fontSize: 16,
    fontStyle: "italic",
    marginBottom: 20,
  },
  inputContainer: {
    width: "100%",
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    width: "100%",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  button: {
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    flex: 1,
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: "#ccc",
  },
  saveButton: {
    backgroundColor: "#4A6FA5",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
