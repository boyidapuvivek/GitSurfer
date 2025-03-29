import React from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { removeFavorite } from "../redux/favoritesSlice";
import Icon from "react-native-vector-icons/MaterialIcons";

const FavoritesScreen = ({ navigation }) => {
  const favorites = useSelector((state) => state.favorites);
  const darkMode = useSelector((state) => state.theme.darkMode);
  const dispatch = useDispatch();
  const scaleValue = new Animated.Value(1);

  const handleRemovePress = (item) => {
    dispatch(removeFavorite(item));
  };

  return (
    <View style={[styles.container, darkMode && styles.darkContainer]}>
      <Text style={[styles.title, darkMode && styles.darkTitle]}>
        Favorite Repositories
      </Text>

      {favorites.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Image
            source={require("../assets/images/nofav.png")}
            style={styles.noFavImg}
          />
        </View>
      ) : (
        <FlatList
          data={favorites}
          contentContainerStyle={styles.listContent}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <Animated.View
              style={[
                styles.repoCard,
                darkMode && styles.darkRepoCard,
                { transform: [{ scale: scaleValue }] },
              ]}
            >
              <TouchableOpacity
                style={styles.repoContent}
                onPress={() => navigation.navigate("Details", { repo: item })}
                activeOpacity={0.7}
              >
                <Image
                  source={{ uri: item.owner.avatar_url }}
                  style={[styles.avatar, darkMode && styles.darkAvatar]}
                />
                <View style={styles.textContainer}>
                  <Text
                    style={[styles.repoName, darkMode && styles.darkText]}
                    numberOfLines={1}
                  >
                    {item.name}
                  </Text>
                  <Text
                    style={[styles.repoDesc, darkMode && styles.darkSubtext]}
                    numberOfLines={2}
                  >
                    {item.description || "No description provided"}
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleRemovePress(item)}
                style={[
                  styles.removeButton,
                  darkMode && styles.darkRemoveButton,
                ]}
                activeOpacity={0.6}
              >
                <Icon
                  name="close"
                  size={24}
                  color={darkMode ? "#fff" : "#ff4444"}
                />
              </TouchableOpacity>
            </Animated.View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: "#f5f5f5",
  },
  darkContainer: {
    backgroundColor: "#121212",
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    marginVertical: 24,
    color: "#2d2d2d",
    textAlign: "center",
  },
  darkTitle: {
    color: "#fff",
  },
  listContent: {
    paddingBottom: 24,
  },
  repoCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  darkRepoCard: {
    backgroundColor: "#1e1e1e",
    shadowColor: "#000",
  },
  repoContent: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    marginRight: 16,
    borderWidth: 2,
    borderColor: "#eee",
  },
  darkAvatar: {
    borderColor: "#333",
  },
  textContainer: {
    flex: 1,
    marginRight: 8,
  },
  repoName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2d2d2d",
    marginBottom: 4,
  },
  repoDesc: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
  },
  darkText: {
    color: "#fff",
  },
  darkSubtext: {
    color: "#888",
  },
  removeButton: {
    padding: 8,
    marginLeft: 8,
    borderRadius: 20,
  },
  darkRemoveButton: {
    backgroundColor: "#2a2a2a",
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    marginTop: 100,
  },
  noFavImg: {
    height: 250,
    width: 250,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: "600",
    color: "#666",
    textAlign: "center",
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: "#999",
    textAlign: "center",
  },
  darkEmptyText: {
    color: "#888",
  },
});

export default FavoritesScreen;
