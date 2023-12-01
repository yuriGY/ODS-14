function newElement() {
  let name = document.getElementById('nameInput').value;
  let mail = document.getElementById('mailInput').value;
  let cpf = document.getElementById('CPFInput').value;


  if (name && cpf && mail && mail.indexOf('@') !== -1) {
  let formData = {
      name: name,
      mail: mail
    };
    let table = document.getElementById('dataTable');
    let tbody = table.getElementsByTagName('tbody')[0];
  
    let newRow = tbody.insertRow(tbody.rows.length);
  
    let cellName = newRow.insertCell(0);
    let cellMail = newRow.insertCell(1);
    let cellActions = newRow.insertCell(2);
    cellName.innerHTML = formData.name;
    cellMail.innerHTML = formData.mail;

    let deleteButton = document.createElement('button');
    deleteButton.innerHTML = 'X';
    deleteButton.onclick = function() {
      deleteRow(newRow.rowIndex);
    };
    cellActions.appendChild(deleteButton);

    let storedData = JSON.parse(localStorage.getItem('formData')) || [];
    storedData.push(formData);
    localStorage.setItem('formData', JSON.stringify(storedData));
  } else {
    alert('Por favor, preencha os campos de nome, email e CPF corretamente.');
  }
}

window.onload = function () {
  let storedData = JSON.parse(localStorage.getItem('formData')) || [];
  let table = document.getElementById('dataTable');
  let tbody = table.getElementsByTagName('tbody')[0];

  storedData.forEach(function(data) {
    let newRow = tbody.insertRow(tbody.rows.length);
    let cellName = newRow.insertCell(0);
    let cellMail = newRow.insertCell(1);
    let cellActions = newRow.insertCell(2);

    cellName.innerHTML = data.name;
    cellMail.innerHTML = data.mail;

    let deleteButton = document.createElement('button');
    deleteButton.innerHTML = 'X';
    deleteButton.onclick = function() {
      deleteRow(newRow.rowIndex);
    };
    cellActions.appendChild(deleteButton);
  });
};

function deleteRow(rowIndex) {
  let table = document.getElementById('dataTable');
  table.deleteRow(rowIndex);

  updateLocalStorage();
}

function updateLocalStorage() {
  let table = document.getElementById('dataTable');
  let tbody = table.getElementsByTagName('tbody')[0];
  let rows = tbody.getElementsByTagName('tr');
  let storedData = [];

  for (let i = 0; i < rows.length; i++) {
    let cells = rows[i].getElementsByTagName('td');
    let formData = {
      name: cells[0].innerHTML,
      mail: cells[1].innerHTML
    };
    storedData.push(formData);
  }

  localStorage.setItem('formData', JSON.stringify(storedData));
}

function cleanForm() {
  document.getElementById("form").reset();
}

function delelteAll() {
  var confirmation = confirm("Tem certeza de que deseja excluir todos os inscritos?");
  if(confirmation) {
    localStorage.removeItem('formData');
    let tbody = document.getElementById('dataTable').getElementsByTagName('tbody')[0];
    tbody.innerHTML = '';
  }
}

//Pesquisa de items
function searchItems() {
  //Recebe os caracteres digitados pelo usuário deixando tudo em minusculo
  let dataLowerCase = document.getElementById("searchItem").value.toLowerCase();
  //Dados do localStorage
  let storedData = JSON.parse(localStorage.getItem('formData'));
  //Procura items que contenham caracteres desejados pelo usuario
  const findedNames = storedData.filter(n =>
    n.name.toLowerCase().includes(dataLowerCase)
  );

  let table = document.getElementById('dataTable');
  let tbody = table.getElementsByTagName('tbody')[0];

  //Limpa o tbody
  tbody.innerHTML = '';

  //adiciona os items encontrados no tbody
  findedNames.forEach(function(data, id) {
    let newRow = tbody.insertRow(tbody.rows.length);
    let cellName = newRow.insertCell(0);
    let cellMail = newRow.insertCell(1);
    let cellActions = newRow.insertCell(2);

    cellName.innerHTML = data.name;
    cellMail.innerHTML = data.mail;
    //Algoritmo para deletar a linha desejada
    let deleteButton = document.createElement('button');
    deleteButton.innerHTML = 'X';
    deleteButton.onclick = function() {
      table.deleteRow(newRow.rowIndex); //Retira da tela
      storedData.splice(id,1); //Retira do vetor de objetos
      localStorage.removeItem('formData');
      localStorage.setItem('formData', JSON.stringify(storedData)); //Salva o vetor no localStorage
    };
    cellActions.appendChild(deleteButton);
  });
}
