import { StyleSheet, Text, View } from "react-native";
import BooksList from "../../components/booksList";

export default function Index() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>ReadIt</Text>
      <View style={styles.listContainer}>
        <BooksList />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  text: {
    fontSize: 32,
    fontWeight: "700",
    color: "#4A6FA5",
    textAlign: "center",
    marginBottom: 20,
    letterSpacing: 1,
    // Text shadow for subtle depth
    textShadowColor: "rgba(0, 0, 0, 0.1)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  listContainer: {
    flex: 1,
    width: "100%",
  },
});
