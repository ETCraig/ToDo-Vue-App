<template>
  <div class="container">
    <h1>Latest ToDos</h1>
    <div class="create-todo">
      <label for="create-todo">Add Todo...</label>
      <input type="text" id="create-todo" v-model="text" placeholder="Create ToDo">
      <button v-on:click="createToDo">ToDo</button>
    </div>
    <hr>
    <p class="error" v-if="error">{{error}}</p>
    <div class="todo-container">
      <div class="todo" 
        v-for="(todo, index) in todos" 
        v-bind:item="todo" 
        v-bind:index="index" 
        v-bind:key="todo._id"
        v-on:dblclick="deleteToDo(todo._id)"
      >
        {{`${todo.createdAt.getDate()}/${todo.createdAt.getMonth()}${todo.createdAt.getFullYear()}`}}
        <p class="text">{{todo.text}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import ToDoService from '../ToDoService';

export default {
  name: 'ToDoComponent',
  data() {
    return {
      todos: [],
      error: '',
      text: ''
    }
  },
  async created() {
    try {
      this.todos = await ToDoService.getToDos();
    } catch(err) {
      this.error = err.message;
    }
  },
  methods: {
    async createToDo() {
      await ToDoService.innsertToDo(this.text);
      this.todos = await ToDoService.getToDos();
    },
    async deleteToDo(id) {
      await ToDoService.deleteToDo(id);
      this.todos = await ToDoService.getToDos();
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
div.constainer {
  max-width: 800px;
  margin: 0 auto;
}

p.error {
  border: 1px solid #ff5b5f;
  background-color: #ffc5c1;
  padding: 10px;
  margin-bottom: 15px;
}

div.todo {
  position: relative;
  border: 1px solid #5bd658;
  background-color: #bcffb8;
  padding: 10px 10px 30px 10px;
  margin-bottom: 15px;
}

div.created-at {
  position: absolute;
  top: 0;
  left: 0;
  padding: 5px 15px 5px 15px;
  color: white;
  font-size: 13px;
}

p.text {
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 0;
}
</style>