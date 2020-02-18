<template>
  <div>
    <div>
      <input type="text" v-model="inputValue" @keydown.enter="addTodo" />
      <button @click="filter('completed')">Clear Completed</button>
    </div>
    <div>
      <div class="todo-item" v-for="todo in filteredTodos" :key="todo.id">
        <div class="todo-check">
          <input type="checkbox" v-model="todo.completed" />
        </div>

        <template v-if="editData.id === todo.id">
          <div class="todo-content">
            <input v-model="editData.content" type="text" />
          </div>
          <div class="todo-buttonBox">
            <button @click="editTodo">OK</button>
            <button @click="cancelEditMode">Cancel</button>
          </div>
        </template>
        <template v-else>
          <div class="todo-content">{{ todo.content }}</div>
          <div class="todo-buttonBox">
            <button @click="turnEditMode(todo)">EditMode</button>
            <button @click="deleteTodo(todo.id)">Delete</button>
          </div>
        </template>
      </div>
    </div>
    <div>
      <span>Filter</span>
      <button @click="setFilter(FilterType.ALL)">All</button>
      <button @click="setFilter(FilterType.COMPLETED)">Completed</button>
      <button @click="setFilter(FilterType.NOT_COMPLETED)">Not Completed</button>
    </div>
  </div>
</template>

<script>
import db from "./db";

const FilterType = {
  ALL: "all",
  COMPLETED: "completed",
  NOT_COMPLETED: "not completed"
};

// type: all, completed, not completed
function filterTodos(todos, type = FilterType.ALL) {
  if (type === FilterType.ALL) {
    return todos;
  } else if (type === FilterType.COMPLETED) {
    return todos.filter(todo => todo.completed);
  } else if (type === FilterType.NOT_COMPLETED) {
    return todos.filter(todo => !todo.completed);
  }
}

export default {
  data() {
    return {
      inputValue: "",
      todos: db.fetchData(),
      filterType: FilterType.ALL,
      editData: {
        id: null,
        content: ""
      },
      FilterType
    };
  },
  computed: {
    filteredTodos() {
      return filterTodos(this.todos, this.filterType);
    }
  },
  watch: {
    todos(newTodos) {
      console.log(newTodos);
    },
    filterType(newType) {
      console.log(newType);
    }
  },
  methods: {
    turnEditMode(todo) {
      this.editData.id = todo.id;
      this.editData.content = todo.content;
    },
    cancelEditMode() {
      this.editData.id = null;
    },
    addTodo() {
      if (!this.inputValue) {
        return;
      }

      const todo = {
        id: this.todos.length ? this.todos.slice(-1)[0].id + 1 : 0,
        content: this.inputValue,
        completed: false
      };

      this.todos.push(todo);

      this.inputValue = "";
    },
    deleteTodo(id) {
      const finded = this.todos.findIndex(todo => todo.id === id);
      this.todos.splice(finded, 1);
    },
    editTodo() {
      const finded = this.todos.find(todo => {
        return todo.id === this.editData.id;
      });

      finded.content = this.editData.content;
      this.editData.id = null;
    },
    setFilter(type) {
      this.filterType = type;
    }
  }
};
</script>

<style>
.todo-check {
  display: inline-block;
}
.todo-content {
  display: inline-block;
  width: 150px;
}
.todo-buttonBox {
  display: inline-block;
}
</style>
