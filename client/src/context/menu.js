import React, { useReducer, createContext } from 'react';

const initialState = {
  activeItem: 'home',
};

const pathname = window.location.pathname;
const path = pathname === '/' ? 'home' : pathname.substr(1);

const MenuContext = createContext({
  activeItem: path,
});

function menuReducer(state, action) {
  switch (action.type) {
    case 'ACTIVE_ITEM':
      return {
        ...state,
        activeItem: action.payload,
      };
    default:
      return state;
  }
}

function MenuProvider(props) {
  const [state, dispatch] = useReducer(menuReducer, initialState);

  const setActiveItem = (activeItem) => {
    dispatch({
      type: 'ACTIVE_ITEM',
      payload: activeItem,
    });
  };

  return (
    <MenuContext.Provider
      value={{ activeItem: state.activeItem, setActiveItem }}
      {...props}
    />
  );
}

export { MenuContext, MenuProvider };
