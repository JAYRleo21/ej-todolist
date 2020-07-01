//Establecer la fecha de hoy como atributo min en input date todolist
const today = new Date();
let todaySet = today.getFullYear() + '-' + monthTwoDigits(today.getMonth()) + '-' + numTwoDigits(today.getDate()) + 'T' + numTwoDigits(today.getHours()) + ':' + numTwoDigits(today.getMinutes()) + ':00';
const tododate = document.getElementById('tododate');
tododate.setAttribute('min', todaySet);

//Funciones de formateo de fecha
function monthTwoDigits(m){
	m = m + 1
	m = (m > 9) ? m : '0' + m;
	return m;
}
function numTwoDigits(n){
	return (n>9) ? n : '0' + n;
}

//Manejo en los botones de color
const colors = ['red', 'blue', 'green'];
let colorsElement = document.getElementById("colors");
let colorsFragment = document.createDocumentFragment();
colors.forEach(function(color){
	let inputContent = document.createElement('div');
	inputContent.classList.add('input-content');
	inputContent.style.setProperty('--radiocolor', color);
	let inputRadio = document.createElement('input');
	inputRadio.setAttribute('type', 'radio');
	inputRadio.setAttribute('required', 'required');
	inputRadio.setAttribute('name', 'color');
	inputRadio.setAttribute('value', color);
	inputRadio.setAttribute('id', color);
	let labelInput = document.createElement('label');
	labelInput.setAttribute('for', color);
	inputContent.appendChild(inputRadio);
	inputContent.appendChild(labelInput);
	colorsFragment.appendChild(inputContent);
});
colorsElement.appendChild(colorsFragment);

//Manejo del formulario
const formTodo = document.getElementById('formTodo');
const todoname = document.getElementById('todoname');
formTodo.addEventListener("submit", function(evt) {
	evt.preventDefault();
	let todo = {
		id: makeid(2),
		name:  todoname.value,
		color: document.querySelector('input[name="color"]:checked').value,
		date: tododate.value
	};
	localStorage.setItem(todo.id, JSON.stringify(todo));
	addTodo(todo);
})

//Creación de id
function makeid(length) {
	let result = '';
	let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
	for ( let i = 0; i < length; i++ ) {
		 result += characters.charAt(Math.floor(Math.random() * characters.length));
	}
	return result + Date.now();
}

//Agregar tareas
function addTodo(todo){
	let item = document.createElement('li');
	item.setAttribute('id', todo.id);
	item.style.setProperty('--todocolor', todo.color);
	let dateItem = new Date(todo.date);
	dateItem = numTwoDigits(dateItem.getDate()) + '/' + monthTwoDigits(dateItem.getMonth()) + '/' + dateItem.getFullYear();
	let hourItem = new Date(todo.date);
	hourItem = numTwoDigits(hourItem.getHours()) + ':' + numTwoDigits(hourItem.getMinutes());
	item.innerHTML = '<p>'+todo.name+'</p>'+
	'<p><span>'+dateItem+'</span><span>'+hourItem+' Hrs.</span></p>';
	let buttonItem = document.createElement('button');
	buttonItem.textContent = 'Eliminar'
	buttonItem.setAttribute('onclick', 'removeTodo("'+todo.id+'")');
	item.appendChild(buttonItem);
	todolist.appendChild(item);
}

//Cargar tareas
const todolist = document.getElementById('todolist');
function loadTodoList(){
	let todoItems = Object.values(localStorage);
	todoItems.forEach(function(todo){
		todo = JSON.parse(todo);
		addTodo(todo);
	});
}
loadTodoList();

//Eliminar tarea
function removeTodo(id){
	event.target.parentElement.remove();
	localStorage.removeItem(id);
}
