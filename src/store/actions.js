import { ADD_TODO_ITEM, CHANGE_EDIT_INDEX, CLEAR_COMPLETED_TODO, DELETE_TODO_ITEM, FILTER_TODO, SET_TODO_ITEM, TOGGLE_COMPLETE_TODO, UPDATE_TODO_ITEM } from "./constants";

export const setTodo = item => ({
    type: SET_TODO_ITEM,
    payload: item
})

export const addTodo = item => ({
    type: ADD_TODO_ITEM,
    payload: item
})

export const toggleComplete = index => ({
    type: TOGGLE_COMPLETE_TODO,
    payload: index
})

export const deleteTodo = index => ({
    type: DELETE_TODO_ITEM,
    payload: index
})

export const filterTodo = filter => ({
    type: FILTER_TODO,
    payload: filter
})

export const clearComplete = () => ({
    type: CLEAR_COMPLETED_TODO,
    payload: ''
})

export const changeEditIndex = (index) => ({
  type: CHANGE_EDIT_INDEX,
  payload: index,
});

export const updateTodo = (value) => ({
    type: UPDATE_TODO_ITEM,
    payload: value,
})