(function() {
    'use strict';

    var addBtn = document.getElementById('add_todo');
    var comment = document.getElementById('comment');
    var todoArea = document.getElementById('todo_area');
    var todos = {};
    var idNumber = 1;

    function generateId() {
        idNumber += 1;

        return 'todo_' + idNumber;
    }

    function addTodo(comment) {
        var todo = document.createElement('li');
        var id = generateId();

        todo.id = id;
        todo.innerHTML = comment + '&nbsp;<button class="remove_todo">삭제</button>';
        todo.dummy = new Array(1000000);

        todoArea.appendChild(todo);

        todos[id] = todo;
    }

    function removeTodo(todo) {
        todoArea.removeChild(todo);
        // elements.li = null;
        todos[todo.id] = null;
    }

    addBtn.addEventListener('click', function() {
        addTodo(comment.value);
    });

    todoArea.addEventListener('click', function(e) {
        var removeBtn = e.target;

        if (removeBtn.className === 'remove_todo') {
            removeTodo(removeBtn.parentNode);
        }
    });
})();
