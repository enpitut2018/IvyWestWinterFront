import React, { Component } from "react";
import { AsyncStorage, Text } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import DownloadPhotosScreen from "./src/components/DownloadPhotosScreen";
import CameraScreen from "./src/components/CameraScreen";
import UploadPhotosScreen from "./src/components/UploadPhotosScreen";
import UserScreen from "./src/components/UserScreen";
import AuthScreen from "./src/components/AuthScreen";
import SigninScreen from "./src/components/SigninScreen";
import SignupScreen from "./src/components/SignupScreen";
import { Actions, Router, Scene, Tabs } from "react-native-router-flux";
import { asyncStorageKeyPrefix } from "./src/libs/const";

const cameraIcon = () => (
  <Icon
    style={{ marginRight: 10 }}
    size={23}
    name="camera"
    color="#999"
    onPress={() => Actions.camera()}
  />
);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: false
    };
  }

  componentWillMount() {
    AsyncStorage.getItem(asyncStorageKeyPrefix + "token").then(token => {
      if (token !== null) {
        this.setState({ isLogin: true });
      }
    });
  }

  render() {
    return (
      <Router>
        <Scene key="root" hideNavBar={true}>
          <Tabs key="tab">
            <Scene
              key="downloads"
              title="ダウンロード"
              initial={this.state.isLogin == true}
              component={DownloadPhotosScreen}
              tabBarLabel="ダウンロード"
              icon={() => <Icon size={20} name="download" color="#999" />}
              renderRightButton={cameraIcon}
            />
            <Scene
              key="uploads"
              title="アップロード"
              component={UploadPhotosScreen}
              tabBarLabel="アップロード"
              icon={() => <Icon size={20} name="upload" color="#999" />}
              renderRightButton={cameraIcon}
            />
            <Scene
              key="user"
              title="ユーザー情報"
              component={UserScreen}
              tabBarLabel="ユーザー"
              icon={() => <Icon size={20} name="user" color="#999" />}
              renderRightButton={cameraIcon}
            />
          </Tabs>
          <Scene key="auth" initial={this.state.isLogin == false}>
            <Scene key="authHome" component={AuthScreen} />
            <Scene key="signin" title="サインイン" component={SigninScreen} />
            <Scene key="signup" title="サインアップ" component={SignupScreen} />
          </Scene>
          <Scene key="camera" component={CameraScreen} />
        </Scene>
      </Router>
    );
  }
}

export default App;
