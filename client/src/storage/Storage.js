export const STORAGE_KEY = 'storage';

class Storage {
  constructor() {
    this.storage = STORAGE_KEY in localStorage ? JSON.parse(localStorage.getItem(STORAGE_KEY)) : {};
  }

  set(key, value) {
    this.storage[key] = value;
  }

  static get(key, defaultOne = null) {
    const localStorageData = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (localStorageData && key in localStorageData) {
      return localStorageData[key];
    }
    return defaultOne;
  }

  saveDataInLocalStorage = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.storage));
  };

  static getInstance() {
    if (Storage.instance) {
      return Storage.instance;
    }
    Storage.instance = new Storage();
    return Storage.instance;
  }
}

export default Storage;
