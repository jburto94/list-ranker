import { createContext, useState } from 'react';

const handleDragEnd = (listItems, itemToUpdate) => {
  if (!itemToUpdate.destination || itemToUpdate.destination.index === itemToUpdate.source.index) {
    return;
  }

  const updatedList = [...listItems];
  const [updatedItem] = updatedList.splice(itemToUpdate.source.index, 1);
  updatedList.splice(itemToUpdate.destination.index, 0, updatedItem);

  return updatedList;
}

const convertUserInput = input => {
  // converts every newline into an item
  const cleanedInput = input.split(/\r?\n/);
  // removes any empty items (if the user added an empty linebreak)
  return cleanedInput.filter(item => item);
}

const createNewList = result => {
  const listData = result;
  const convertedListData = convertUserInput(listData);
  const newList = convertedListData.map((item, idx) => ( { item: item, id: String(idx)} ));
  return newList;
}

const handleRemoveItem = (listItems, itemToRemove) => {
  const updatedList = [...listItems].filter(listItem => listItem.id !== itemToRemove.id);
  return updatedList;
}

export const ListContext = createContext({
  list: [],
  setList: () => {}
});

export const ListProvider = ({ children }) => {
  const [list, setList] = useState([]);

  const onDragEnd = item => {
    setList(handleDragEnd(list, item));
  }

  const removeItem = item => {
    setList(handleRemoveItem(list, item));
  }

  const createList = listData => {
    setList(createNewList(listData));
  }

  const clearList = () => {
    setList([]);
  }

  const value = {
    list,
    setList,
    onDragEnd,
    removeItem,
    createList,
    clearList
  };

  return <ListContext.Provider value={value}>{children}</ListContext.Provider>
};