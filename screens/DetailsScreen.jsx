import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Linking,
  Share,
  ActivityIndicator,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { addFavorite, removeFavorite } from "../redux/favoritesSlice";
import { Ionicons, FontAwesome, MaterialIcons } from "@expo/vector-icons";

const DetailsScreen = () => {
  const route = useRoute();
  const { repo } = route.params;
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites);
  const darkMode = useSelector((state) => state.theme.darkMode);
  const isFavorite = favorites.some((fav) => fav.id === repo.id);

  const [contributors, setContributors] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch contributors from GitHub API
  useEffect(() => {
    const fetchContributors = async () => {
      try {
        const response = await fetch();
        // `https://api.github.com/repos/${repo.owner.login}/${repo.name}/contributors`
        const data = await response.json();
        setContributors(data);
      } catch (error) {
        console.log("Error fetching contributors:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchContributors();
  }, [repo]);

  const handleOpenRepo = () => {
    Linking.openURL(repo.html_url);
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Check out this GitHub repository: ${repo.html_url}`,
      });
    } catch (error) {
      console.log("Error sharing:", error);
    }
  };

  return (
    <View style={[styles.container, darkMode && styles.darkContainer]}>
      <View style={styles.header}>
        <Image source={{ uri: repo.owner.avatar_url }} style={styles.avatar} />
        <Text style={[styles.title, darkMode && styles.darkText]}>
          {repo.name}
        </Text>
        <Text style={[styles.ownerText, darkMode && styles.darkSubtext]}>
          by {repo.owner.login}
        </Text>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <MaterialIcons name="stars" size={24} color="#FFD700" />
          <Text style={[styles.statText, darkMode && styles.darkText]}>
            {repo.stargazers_count}
          </Text>
        </View>
        <View style={styles.statItem}>
          <MaterialIcons name="fork-right" size={24} color="#4CAF50" />
          <Text style={[styles.statText, darkMode && styles.darkText]}>
            {repo.forks_count}
          </Text>
        </View>
        <View style={styles.statItem}>
          <MaterialIcons
            name="code"
            size={24}
            color={repo.language ? "#2196F3" : "#9E9E9E"}
          />
          <Text style={[styles.statText, darkMode && styles.darkText]}>
            {repo.language || "N/A"}
          </Text>
        </View>
      </View>

      <View style={[styles.card, darkMode && styles.darkCard]}>
        <Text style={[styles.description, darkMode && styles.darkText]}>
          {repo.description || "No description available."}
        </Text>
      </View>

      {/* Action Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={handleOpenRepo}
          style={[styles.actionButton, darkMode && styles.darkActionButton]}
        >
          <FontAwesome
            name="external-link"
            size={20}
            color={darkMode ? "#fff" : "#2196F3"}
          />
          <Text style={[styles.buttonText, darkMode && styles.darkText]}>
            Open
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleShare}
          style={[styles.actionButton, darkMode && styles.darkActionButton]}
        >
          <Ionicons
            name="share-social"
            size={20}
            color={darkMode ? "#fff" : "#4CAF50"}
          />
          <Text style={[styles.buttonText, darkMode && styles.darkText]}>
            Share
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            isFavorite
              ? dispatch(removeFavorite(repo))
              : dispatch(addFavorite(repo))
          }
          style={[styles.actionButton, darkMode && styles.darkActionButton]}
        >
          {isFavorite ? (
            <FontAwesome name="heart" size={20} color="#FF5252" />
          ) : (
            <FontAwesome
              name="heart-o"
              size={20}
              color={darkMode ? "#fff" : "#FF5252"}
            />
          )}
          <Text style={[styles.buttonText, darkMode && styles.darkText]}>
            {isFavorite ? "Remove" : "Favorite"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Contributors List */}
      <View style={styles.sectionHeader}>
        <Text style={[styles.sectionTitle, darkMode && styles.darkText]}>
          Contributors
        </Text>
        {loading && (
          <ActivityIndicator size="small" color={darkMode ? "#fff" : "#666"} />
        )}
      </View>

      {contributors.length > 0 ? (
        <FlatList
          data={contributors}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.contributorsList}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => Linking.openURL(item.html_url)}
              style={[
                styles.contributorCard,
                darkMode && styles.darkContributorCard,
              ]}
            >
              <Image
                source={{ uri: item.avatar_url }}
                style={styles.contributorAvatar}
              />
              <Text
                style={[styles.contributorName, darkMode && styles.darkText]}
                numberOfLines={1}
              >
                {item.login}
              </Text>
              <Text
                style={[
                  styles.contributionsText,
                  darkMode && styles.darkSubtext,
                ]}
              >
                {item.contributions} commits
              </Text>
            </TouchableOpacity>
          )}
          ListEmptyComponent={
            !loading && (
              <Text
                style={[styles.noContributors, darkMode && styles.darkSubtext]}
              >
                No contributors found
              </Text>
            )
          }
        />
      ) : (
        !loading && (
          <Text style={[styles.noContributors, darkMode && styles.darkSubtext]}>
            No contributors found
          </Text>
        )
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#F5F5F5",
  },
  darkContainer: {
    backgroundColor: "#121212",
  },
  header: {
    alignItems: "center",
    marginBottom: 24,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "#FFF",
    marginBottom: 12,
    backgroundColor: "#FFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#2D2D2D",
    marginBottom: 4,
  },
  ownerText: {
    fontSize: 16,
    color: "#666",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 24,
  },
  statItem: {
    alignItems: "center",
  },
  statText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2D2D2D",
    marginTop: 4,
  },
  card: {
    backgroundColor: "#FFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  darkCard: {
    backgroundColor: "#1E1E1E",
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: "#444",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 24,
  },
  actionButton: {
    alignItems: "center",
    padding: 12,
    borderRadius: 8,
    backgroundColor: "#FFF",
    width: 100,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  darkActionButton: {
    backgroundColor: "#1E1E1E",
  },
  buttonText: {
    marginTop: 8,
    fontSize: 14,
    color: "#2D2D2D",
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#2D2D2D",
  },
  contributorsList: {
    paddingHorizontal: 8,
  },
  contributorCard: {
    alignItems: "center",
    backgroundColor: "#FFF",
    borderRadius: 12,
    padding: 12,
    marginRight: 12,
    width: 120,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  darkContributorCard: {
    backgroundColor: "#1E1E1E",
  },
  contributorAvatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    marginBottom: 8,
  },
  contributorName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#2D2D2D",
    marginBottom: 4,
    maxWidth: 100,
  },
  contributionsText: {
    fontSize: 12,
    color: "#666",
  },
  noContributors: {
    textAlign: "center",
    fontSize: 14,
    color: "#666",
    marginTop: 16,
  },
  darkText: {
    color: "#FFF",
  },
  darkSubtext: {
    color: "#888",
  },
});

export default DetailsScreen;
