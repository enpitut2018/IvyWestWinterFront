import { AsyncStorage } from "react-native";
import { asyncStorageKeyPrefix, baseURL } from "../libs/const";

export function signin(userId, pass) {
  const body = {
    Userid: userId,
    Password: pass
  };
  url = baseURL + "/signin";
  fetch(url, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json; charset=utf-8"
    },
    body: JSON.stringify(body)
  })
    .then(response => response.json())
    .then(json => {
      // ログイン完了処理
      AsyncStorage.setItem(asyncStorageKeyPrefix + "token", json.Token);
    })
    .catch(error => console.log(error));
}

export function signup(userId, pass) {
  const body = {
    Userid: userId,
    Password: pass
  };
  url = baseURL + "/signin";
  fetch(url, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json; charset=utf-8"
    },
    body: JSON.stringify(body)
  })
    .then(response => response.json())
    .then(json => {
      // サインアップ完了処理
      AsyncStorage.setItem(asyncStorageKeyPrefix + "token", json.Token);
    })
    .catch(error => console.log(error));
}
