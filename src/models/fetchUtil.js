import { AsyncStorage } from "react-native";
import { asyncStorageKeyPrefix } from "../libs/const";

export function getFetchWithToken(url) {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem(asyncStorageKeyPrefix + "token").then(token => {
      fetch(url, {
        method: "GET",
        mode: "no-cors",
        credentials: "include",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Authorization: token
        }
      })
        .then(response => response.json())
        .then(json => {
          resolve(json);
        })
        .catch(error => {
          reject(error);
        });
    });
  });
}

export function postFetchWithToken(url, body) {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem(asyncStorageKeyPrefix + "token").then(token => {
      fetch(url, {
        method: "POST",
        mode: "no-cors",
        credentials: "include",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Authorization: token
        },
        body: JSON.stringify(body)
      })
        .then(response => response.json())
        .then(json => {
          resolve(json);
        })
        .catch(error => {
          reject(error);
        });
    });
  });
}
