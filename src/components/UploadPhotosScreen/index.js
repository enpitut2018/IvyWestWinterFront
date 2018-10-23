import React, { Component } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

export default class UploadPhotosScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photos: [],
      source: ""
    };
  }

  componentWillMount() {
    fetch("http://localhost:8080/uploads", {
      method: "GET",
      mode: "no-cors",
      credentials: "include",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        Authorization: "6f8179afb5ccdd780d4681febfeaffb1" // TODO tokenの設定
      }
    })
      .then(response => response.json())
      .then(json => {
        this.setState({ photos: json });
        this.setState({ source: json[1].Source });
      })
      .catch(error => console.log(error));
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <View>
          {this.state.photos.map((photo, index) => {
            return (
              <Image
                key={index}
                style={{
                  width: 100,
                  height: 100
                }}
                source={{ uri: "data:image/jpeg;base64," + photo.Source }}
              />
            );
          })}
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5FCFF"
  },
  sampel: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  }
});
