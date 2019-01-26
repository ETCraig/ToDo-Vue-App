import axios from 'axios';

const url = 'http://localhost:5000/api/todos/';

class ToDoService {
    static getToDos() {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.get(url);
                const data = res.data;
                resolve(
                    data.map(todo => ({
                        ...todo,
                        createdAt: new Date(todo.createdAt)
                    }))
                );
            } catch(err) {
                reject(err);
            }
        })
    }
    static insertToDo() {
        return axios.post(url, {
            text: text
        });
    }
    static deleteToDo(id) {
        return axios.delete(`${url}${id}`);
    }
}

export default ToDoService;