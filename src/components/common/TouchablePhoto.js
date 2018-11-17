import React, { Component } from "react";
import { TouchableOpacity, View } from "react-native";

export default class TouchablePhoto extends Component {
  render() {
    return (
      <View>
        <Image
          width={this.props.width}
          heght={this.props.height}
          source={this.props.url}
        />
      </View>
    );
  }
}
