var list_arr = []
var old_list = []

if(localStorage.getItem("List") != ""){
    old_list.push(localStorage.getItem("List"))
    localStorage.setItem("Old_List",old_list)
}
// Set the color of the <h1> to a different color
document.querySelector('h1').style.color = "green";

const listDiv = document.querySelector('.container');
const listOl = listDiv.querySelector('ol');
const addItemInput = document.querySelector('input.addItemInput');
const addItemButton = document.querySelector('button.addItemButton');
const lis = listOl.children;

function attachListItemButtons(li) {
 
  let up = document.createElement('button');
  up.className = 'upButton';
  up.textContent = 'Up';
  li.appendChild(up);
  let down = document.createElement('button');
  down.className = 'downButton';
  down.textContent = 'Down';
  li.appendChild(down);
  var edit = document.createElement('button');
  edit.className = 'edit_button';
  edit.textContent = 'Edit';
  edit.onclick = edit_task;
  li.appendChild(edit);
  let remove = document.createElement('button');
  remove.className = 'removeButton';
  remove.textContent = 'Remove';
  li.appendChild(remove);
}
for(let i=0; i<lis.length; i+=1) {
  attachListItemButtons(lis[i]);
}
// adds a new item on the To Do List
addItemButton.addEventListener('click', () => {
var addItemInputvalue = document.querySelector('input.addItemInput').value;
var d = new Date()
   var a = document.getElementById('mySelect');
  var x= a.options[a.selectedIndex].value;
if  (addItemInputvalue != "" && x != ""){
  list_arr.push(addItemInputvalue)
  localStorage.setItem("List",list_arr)
  let ol = document.getElementsByTagName('ol')[0];
  let li = document.createElement('li');
  let label = document.createElement('label');
  let label_cat = document.createElement('label');
  label_cat.setAttribute("class","add_cat")
  label.setAttribute("class","add_list_label")
  var time = document.createElement('label');
  time.innerHTML = d.getFullYear() +"-"+ d.getMonth() +"-"+ d.getDate() +"( "+ d.getHours() +"-"+ d.getMinutes() +"-"+ d.getSeconds()+" )" + '&nbsp &nbsp &nbsp ';
  label_cat.innerHTML = x + '&nbsp &nbsp &nbsp ';
  li.appendChild(label_cat)
  li.appendChild(time);
  li.setAttribute('class',"mycheck")
  var checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.setAttribute('class' , 'check');
  label.textContent = addItemInput.value;
li.appendChild(checkbox); 
li.appendChild(label)

  attachListItemButtons(li);
  ol.appendChild(li);
  addItemInput.value = '';

 swal({
        title: "Good job!",
        text: "Task Added Sucessfully!",
        icon: "success",
        button: "Aww yiss!",
      }); 
}
else{
  swal("You can-not add empty task");
}
});

// clicking the buttons
listOl.addEventListener('click', (event) => {
  if(event.target.tagName == 'BUTTON'){
    if (event.target.className == 'removeButton') {
      let li = event.target.parentNode;
      let ol = li.parentNode;
       swal({
          title: "Are you sure?",
          text: "Once deleted, you will not be able to recover this imaginary file!",
          icon: "warning",
          buttons: true,
          dangerMode: false,
        })
    .then((willDelete) => {
      if (willDelete) {
        swal("Poof! Your imaginary file has been deleted!", {
          icon: "success",
        });
      ol.removeChild(li);

      } else {
        swal("Your imaginary file is safe!");
      }
    });
    }
    if (event.target.className == 'upButton') {
      let li = event.target.parentNode;
      let prevLi = li.previousElementSibling;
      let ol = li.parentNode;
      if (prevLi) { ol.insertBefore(li, prevLi); }
    }
    if (event.target.className == 'downButton') {
      let li = event.target.parentNode;
      let nextLi = li.nextElementSibling;
      let ol = li.parentNode;
      if (nextLi) { ol.insertBefore(nextLi, li); }
    }
  }
});

function myFunction() {
  var input, filter, ol, li, search_label, i, txtValue;
  input = document.getElementById('myInput');
  filter = input.value.toUpperCase();
  var search_ol = document.getElementsByClassName("list");

  var search_li = document.getElementsByClassName("mycheck");
  for (var i = 0; i < search_li.length; i++) {
    search_label = search_li[i].getElementsByClassName("add_list_label")[0];
    txtValue = search_label.textContent || search_label.innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      search_li[i].style.display = "";
    } else {
      search_li[i].style.display = "none";

    }
  }
}

var edit_task = function (){
var listItem=this.parentNode;
var editInput=listItem.querySelector(".add_list_label");
var label2=listItem.querySelector(".add_list_label");
var class_name = "editMode"
var class_name_2 = listItem.className.split(" ")

if (class_name_2.indexOf(class_name) == -1) {
    listItem.className += " " + class_name;
    var add_label_value = editInput.textContent;
    listItem.removeChild(label2)
    var edit_input_txt = document.createElement("input")
    edit_input_txt.type = "text"
    edit_input_txt.setAttribute("class","edit_txt")
    edit_input_txt.setAttribute("placeholder",add_label_value)
    listItem.insertBefore(edit_input_txt,listItem.childNodes[2])
    edit_input_txt.innerHTML = add_label_value
    var edit_class = document.getElementsByClassName("edit_button")
    var save = document.createElement('button');
    save.setAttribute("onclick","savevalue()")
    save.className = 'save_button';
    save.textContent = 'Save';
    listItem.removeChild(listItem.childNodes[5])
    listItem.appendChild(save);
  }
} 
