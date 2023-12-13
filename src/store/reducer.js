import {
  ADD_TODO_ITEM,
  CHANGE_EDIT_INDEX,
  CLEAR_COMPLETED_TODO,
  DELETE_TODO_ITEM,
  FILTER_TODO,
  SET_TODO_ITEM,
  TOGGLE_COMPLETE_TODO,
  UPDATE_TODO_ITEM,
} from "./constants";

export const storageGet = () => JSON.parse(localStorage.getItem("todos")) || [];
const storageSet = (item) =>
  localStorage.setItem("todos", JSON.stringify(item));

const initState = {
  todos: storageGet(),
  todoItem: {
    value: "",
    completed: false,
  },
  filter: "all",
  editIndex: null,
  filters: {
    all: () => {
      return storageGet();
    },
    completed: () => {
      return storageGet().filter((todo) => todo.completed);
    },
    active: () => {
      return storageGet().filter((todo) => !todo.completed);
    },
  },
};

function reducer(state, action) {
  let newTodo = [...state.todos];
  let newState;
  switch (action.type) {
    case SET_TODO_ITEM:
      return {
        ...state,
        todoItem: { ...state.todoItem, value: action.payload },
      };
    case ADD_TODO_ITEM:
      newState = {
        ...state,
        todos: [...state.todos, action.payload],
      };
      storageSet(newState.todos);
      return newState;
    case TOGGLE_COMPLETE_TODO:
      newTodo[action.payload] = {
        ...newTodo[action.payload],
        completed: !newTodo[action.payload].completed,
      };
      storageSet(newTodo);
      return {
        ...state,
        todos: storageGet(),
        filter: "all",
      };
    case FILTER_TODO:
      newTodo = state.filters[action.payload]();
      return {
        ...state,
        todos: newTodo,
        filter: action.payload,
      };
    case CLEAR_COMPLETED_TODO:
      newTodo = state.filters.active();
      storageSet(newTodo);
      return {
        ...state,
        todos: newTodo,
      };

    case DELETE_TODO_ITEM:
      newState = {
        ...state,
        todos: [...state.todos].filter((_, index) => index !== action.payload),
      };
      localStorage.setItem("todos", JSON.stringify(newState.todos));
      return newState;
    
    case CHANGE_EDIT_INDEX:
      return {
        ...state,
        editIndex: action.payload
      }
    case UPDATE_TODO_ITEM:
      newTodo = storageGet()
      newTodo[state.editIndex] = {
        ...newTodo[state.editIndex],
        value: action.payload
      };
      storageSet(newTodo)
      return {
        ...state,
        todos: newTodo,
        editIndex: null,
      }
    default:
      throw new Error("Invalid action");
  }
}

export { initState };
export default reducer;
