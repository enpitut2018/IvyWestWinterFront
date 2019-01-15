import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { Text } from "native-base";

const PeopleAvatarArea = ({ photoID, people }) => {
  return (
    <View>
      <Text style={styles.text}>写っている人</Text>
      <View style={styles.peopleAvatarArea}>
        {people.map((p, i) => {
          return (
            <Image
              key={`${photoID}-${i}`}
              style={styles.peopleAvatar}
              source={{
                uri: p.avatar_url
              }}
            />
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    backgroundColor: "white",
    color: "#333",
    paddingTop: 10,
    paddingLeft: 10
  },
  peopleAvatarArea: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    backgroundColor: "white",
    paddingTop: 10,
    paddingBottom: 10
  },
  peopleAvatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginTop: 10,
    marginLeft: 10
  }
});

export default PeopleAvatarArea;
