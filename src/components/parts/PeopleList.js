import React from "react";
import { StyleSheet, View } from "react-native";
import { Body, Left, List, ListItem, Text, Thumbnail } from "native-base";

const PeopleList = ({ photoID, people }) => {
  return (
    <View style={styles.peopleList}>
      <Text style={styles.text}>写っている人</Text>
      <List>
        {people.map((p, i) => {
          return (
            <ListItem avatar key={`${photoID}-${i}`}>
              <Left>
                <Thumbnail
                  small
                  source={{
                    uri: p.avatar_url
                  }}
                />
              </Left>
              <Body>
                <Text style={{ marginTop: 10 }}>{p.id}</Text>
              </Body>
            </ListItem>
          );
        })}
      </List>
    </View>
  );
};

const styles = StyleSheet.create({
  peopleList: {
    backgroundColor: "white"
  },
  text: {
    backgroundColor: "white",
    color: "#333",
    paddingTop: 15,
    paddingLeft: 10
  }
});

export default PeopleList;
