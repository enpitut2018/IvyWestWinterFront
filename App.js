import React, { Component } from "react";
import { AsyncStorage } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import CameraButton from "./src/components/parts/CameraButton";
import AuthScreen from "./src/components/screens/AuthScreen";
import SigninScreen from "./src/components/screens/SigninScreen";
import SignupScreen from "./src/components/screens/SignupScreen";
import DownloadTimeLineScreen from "./src/components/screens/DownloadTimeLineScreen";
import DownloadPhotosScreen from "./src/components/screens/DownloadPhotosScreen";
import UploadPhotosScreen from "./src/components/screens/UploadPhotosScreen";
import PhotoDetailScreen from "./src/components/screens/PhotoDetailScreen";
import UserScreen from "./src/components/screens/UserScreen";
import { Router, Scene, Tabs } from "react-native-router-flux";
import { asyncStorageKeyPrefix } from "./src/libs/const";

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

  photoDetailScene = () => (
    <Scene key="photoDetail" title="写真詳細" component={PhotoDetailScreen} />
  );

  render() {
    return (
      <Router>
        <Scene key="root" hideNavBar={true}>
          <Tabs key="tab" showLabel={false}>
            <Scene
              key="downloads"
              initial={this.state.isLogin == true}
              title="ダウンロード"
              tabBarLabel="ダウンロード"
              icon={() => <Icon size={20} name="download" color="#999" />}
            >
              <Tabs
                key="downloadTab"
                // TODO カラーの設定
                // activeBackgroundColor="#FF0000"
                // activeTintColor="#FF0000"
                // inactiveBackgroundColor="#00FF00"
                // inactiveTintColor="#00FF00"
                tabBarPosition="top"
                headerMode="none"
                showLabel={true}
              >
                <Scene
                  key="downloadTimeLine"
                  initial={true}
                  tabBarLabel="タイムライン"
                  component={DownloadTimeLineScreen}
                />
                <Scene
                  key="downloadPhoto"
                  tabBarLabel="サムネイル"
                  component={DownloadPhotosScreen}
                />
              </Tabs>
              {this.photoDetailScene()}
            </Scene>
            <Scene
              key="uploads"
              tabBarLabel="アップロード"
              icon={() => <Icon size={20} name="upload" color="#999" />}
            >
              <Scene
                key="uploadPhoto"
                initial={true}
                title="アップロード"
                component={UploadPhotosScreen}
                tabBarLabel="アップロード"
                icon={() => <Icon size={20} name="upload" color="#999" />}
              />
              {this.photoDetailScene()}
            </Scene>
            <Scene
              key="user"
              title="ユーザー情報"
              component={UserScreen}
              tabBarLabel="ユーザー"
              icon={() => <Icon size={20} name="user" color="#999" />}
            />
            <Scene
              key="camera"
              title="撮影"
              component={UserScreen}
              // componentを使用せず、擬似的にボタンを設置してカメラ起動を実装した
              tabBarLabel="撮影"
              icon={() => CameraButton()}
            />
          </Tabs>
          <Scene key="auth" initial={this.state.isLogin == false}>
            <Scene key="authHome" component={AuthScreen} />
            <Scene key="signin" title="サインイン" component={SigninScreen} />
            <Scene key="signup" title="サインアップ" component={SignupScreen} />
          </Scene>
        </Scene>
      </Router>
    );
  }
}

export default App;
