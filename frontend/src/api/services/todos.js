import {axiosClient, TODO_BASE_URL} from "@/api/apiClient.js";

const listTodos = () => {
    return axiosClient.get(TODO_BASE_URL + "/todos");
}

const createTodo = (todo) => {
    return axiosClient.post(TODO_BASE_URL + "/todos", JSON.stringify(todo));
}

const editTodo = (todo, id) => {
    return axiosClient.put(TODO_BASE_URL + `/todos/${id}`, JSON.stringify(todo));
}

const deleteTodo = (id) => {
    return axiosClient.delete(TODO_BASE_URL + `/todos/${id}`);
}

export {
    listTodos,
    createTodo,
    editTodo,
    deleteTodo
}