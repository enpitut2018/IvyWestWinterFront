import React from "react";
import { StyleSheet, View } from "react-native";
import { Body, Left, List, ListItem, Text, Thumbnail } from "native-base";

const PeopleList = ({ photoID, people }) => {
  return (
    <View style={styles.peopleList}>
      <Text style={styles.text}>写っている人</Text>
      <List>
        {[...Array(15)].map((_, i) => {
          return (
            <ListItem avatar key={`${photoID}-${i}`}>
              <Left>
                <Thumbnail
                  small
                  source={{
                    uri:
                      "http://img3.goipadwallpapers.com/2013/12/06/cc20664ab8879c36_2048x2048.jpg"
                  }}
                />
              </Left>
              <Body>
                <Text style={{ marginTop: 10 }}>picachu</Text>
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
    paddingTop: 15,
    paddingLeft: 10
  }
});

export default PeopleList;
