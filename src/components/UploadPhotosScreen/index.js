import React, { Component } from "react";
import { Image, StyleSheet, Text, View } from "react-native";

export default class UploadPhotosScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photos: []
    };
  }

  componentWillMount() {
    fetch("https://0c550ec9.ngrok.io/uploads", {
      method: "GET",
      mode: "no-cors",
      credentials: "include",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        Authorization: "xxxxxxxxxxxxxxxxxxxx" // TODO Tokenの設定
      }
    })
      .then(response => response.json())
      .then(json => {
        console.log(json);
        this.setState({ photos: json });
      })
      .catch(error => console.log(error));
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>{JSON.stringify(this.state.photos)}</Text>
        {/* {this.state.photos.forEach(p => {
          <Image
            style={{
              width: 100,
              height: 100,
              resizeMode: Image.resizeMode.contain
            }}
            source={{ uri: "data:image/png;base64," + p.Source }}
          />;
        })} */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  sampel: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  }
});
