let myNodelist = document.getElementsByTagName("LI");
let i;
for (i = 0; i < myNodelist.length; i++) {
  let span = document.createElement("SPAN");
  let txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  myNodelist[i].appendChild(span);
}

// Click on a close button to hide the current list item
let close = document.getElementsByClassName("close");
for (i = 0; i < close.length; i++) {
  close[i].onclick = function() {
    let div = this.parentElement;
    div.style.display = "none";
  }
}

// Add a "checked" symbol when clicking on a list item
let list = document.querySelector('ul');
list.addEventListener('click', function(ev) {
  if (ev.target.tagName === 'LI') {
    ev.target.classList.toggle('checked');
  }
}, false);

// Create a new list item when clicking on the "Add" button
function newElement() {
  debugger
  var nome = document.getElementById('nameInput').value;
  var email = document.getElementById('mailInput').value;

  if (nome && email) {
  var formData = {
      nome: nome,
      email: email
    };
    var table = document.getElementById('dataTable');
    var tbody = table.getElementsByTagName('tbody')[0];
  
    var newRow = tbody.insertRow(tbody.rows.length);
  
    var cellName = newRow.insertCell(0);
    var cellMail = newRow.insertCell(1);
    cellName.innerHTML = formData.nome;
    cellMail.innerHTML = formData.email;
    var storedData = JSON.parse(localStorage.getItem('formData')) || [];
    storedData.push(formData);
    localStorage.setItem('formData', JSON.stringify(storedData));
  } else {
    alert('Por favor, preencha todos os campos do formulário.');
  }

  let li = document.createElement("li");
  let inputValue = document.getElementById("nameInput").value;
  let t = document.createTextNode(inputValue);
  li.appendChild(t);
  if (inputValue === '') {
    alert("You must write something!");
  } else {
    document.getElementById("entryList").appendChild(li);
  }
  document.getElementById("nameInput").value = "";

  let span = document.createElement("SPAN");
  let txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  li.appendChild(span);

  for (i = 0; i < close.length; i++) {
    close[i].onclick = function() {
      let div = this.parentElement;
      div.style.display = "none";
    }
  }
}