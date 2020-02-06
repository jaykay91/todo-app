const todos = [
  {
    id: 0,
    content: "Play Game",
    completed: false
  },
  {
    id: 1,
    content: "Dance",
    completed: false
  },
  {
    id: 2,
    content: "Good",
    completed: false
  },
  {
    id: 3,
    content: "Hello",
    completed: true
  }
];

function fetchData() {
  return todos;
}

export default {
  fetchData
};
