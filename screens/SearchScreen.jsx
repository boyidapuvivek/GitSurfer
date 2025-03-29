import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { fetchRepositories } from "../api/fetchApi";
import { toggleTheme } from "../redux/themeSlice";
import Icon from "react-native-vector-icons/MaterialIcons";
import debounce from "lodash.debounce";

const SearchScreen = () => {
  const [query, setQuery] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const navigation = useNavigation();
  const darkMode = useSelector((state) => state.theme.darkMode);
  const dispatch = useDispatch();

  const searchRepos = async (newPage = 1) => {
    if (!query.trim()) {
      setData([]);
      return;
    }
    setLoading(true);
    try {
      const results = await fetchRepositories(query, newPage);
      setData(newPage === 1 ? results : [...data, ...results]);
      setHasMore(results.length > 0);
      setPage(newPage);
    } catch (error) {
      Alert.alert("Error", "Failed to fetch repositories");
    } finally {
      setLoading(false);
    }
  };

  const debouncedSearch = debounce(() => searchRepos(1), 500);
  const loadMore = () => hasMore && !loading && searchRepos(page + 1);

  return (
    <View style={[styles.container, darkMode && styles.darkContainer]}>
      {/* Properly Aligned Header */}
      <View style={styles.headerContainer}>
        <Text style={[styles.title, darkMode && styles.darkText]}>
          GitHub Explorer
        </Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity
            onPress={() => navigation.navigate("Favorites")}
            style={styles.iconButton}
          >
            <Icon name="star" size={24} color="#FFD700" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => dispatch(toggleTheme())}
            style={styles.iconButton}
          >
            <Icon
              name={darkMode ? "wb-sunny" : "nights-stay"}
              size={24}
              color={darkMode ? "#FFD700" : "#333"}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View
        style={[styles.searchContainer, darkMode && styles.darkSearchContainer]}
      >
        <Icon name="search" size={20} color="#888" style={styles.searchIcon} />
        <TextInput
          style={[styles.searchInput, darkMode && styles.darkInput]}
          placeholder="Search repositories..."
          placeholderTextColor="#888"
          value={query}
          onChangeText={(text) => {
            setQuery(text);
            if (text.length > 2) debouncedSearch();
          }}
          onSubmitEditing={() => searchRepos(1)}
        />
      </View>

      {loading && page === 1 ? (
        <ActivityIndicator size="large" style={styles.loader} />
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[styles.repoItem, darkMode && styles.darkRepoItem]}
              onPress={() => navigation.navigate("Details", { repo: item })}
            >
              <Image
                source={{ uri: item.owner.avatar_url }}
                style={styles.avatar}
              />
              <View style={styles.repoInfo}>
                <Text style={[styles.repoName, darkMode && styles.darkText]}>
                  {item.name}
                </Text>
                <Text style={[styles.repoDesc, darkMode && styles.darkSubText]}>
                  {item.description?.substring(0, 60) || "No description"}
                </Text>
                <View style={styles.repoStats}>
                  <Icon name="star" size={14} color="#FFD700" />
                  <Text
                    style={[styles.statText, darkMode && styles.darkSubText]}
                  >
                    {item.stargazers_count}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <Image
                source={require("../assets/images/startsearching.png")}
                style={{ width: 200, height: 200 }}
              />
            </View>
          }
          ListFooterComponent={
            loading && page > 1 ? (
              <ActivityIndicator size="large" style={styles.footerLoader} />
            ) : null
          }
          onEndReached={loadMore}
          onEndReachedThreshold={0.5}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  darkContainer: {
    backgroundColor: "#121212",
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    paddingHorizontal: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  headerIcons: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconButton: {
    padding: 8,
    marginLeft: 5,
  },
  darkText: {
    color: "#fff",
  },
  darkSubText: {
    color: "#bbb",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 20,
    height: 50,
  },
  darkSearchContainer: {
    backgroundColor: "#333",
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: "100%",
    fontSize: 16,
    color: "#333",
  },
  darkInput: {
    color: "#fff",
  },
  loader: {
    marginTop: 40,
  },
  repoItem: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    flexDirection: "row",
  },
  darkRepoItem: {
    backgroundColor: "#1e1e1e",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  repoInfo: {
    flex: 1,
  },
  repoName: {
    fontWeight: "600",
    marginBottom: 4,
    color: "#333",
  },
  repoDesc: {
    color: "#666",
    marginBottom: 6,
    fontSize: 14,
  },
  repoStats: {
    flexDirection: "row",
    alignItems: "center",
  },
  statText: {
    marginLeft: 4,
    fontSize: 12,
    color: "#666",
  },
  emptyState: {
    alignItems: "center",
    marginTop: 60,
  },
  emptyText: {
    marginTop: 10,
    fontSize: 16,
    color: "#666",
  },
  footerLoader: {
    marginVertical: 20,
  },
});

export default SearchScreen;
