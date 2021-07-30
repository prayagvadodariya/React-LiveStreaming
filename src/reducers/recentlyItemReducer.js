import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Types from '../constant/ActionKeys';
import * as StorageKeys from '../constant/StorageKeys';

const INITIAL_STATE =  {
  data: [],
};

const recentlyItemReducer =  (state = INITIAL_STATE, action) => {

  switch (action.type) {
    case Types.STORE_ITEM: {
      return {
        data: [...state.data, ...action.item]
      }
    }
    case Types.ADD_ITEM: {
      AsyncStorage.setItem(StorageKeys.RECENTLY_VIEW_ITEMS, JSON.stringify([...state.data, action.item]));
      return  {
        data: [...state.data, action.item]
      }
    }
    case Types.REMOVE_ITEM: {
      state.data.splice(action.index, 1);
      let setdatastore = state.data
      AsyncStorage.setItem(StorageKeys.RECENTLY_VIEW_ITEMS, JSON.stringify(setdatastore))
      return  {
        data:  state.data
      }
    }  
    default:
      return state
  }
}

export default recentlyItemReducer;