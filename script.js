let expressions = []

document.getElementById('logic-expression').addEventListener('click', function() {
  this.value = '';
});

function generateTruthTable() {
  const checkboxes = document.querySelectorAll('.var-checkbox:checked');
  const variables = Array.from(checkboxes).map(cb => cb.value);
  const numVars = variables.length;

  const logicExpression = document.getElementById('logic-expression').value;

  if (logicExpression === '') {
      alert('Masukkan ekspresi logika!');
      return;
  }

  expressions.push(logicExpression);
  renderTruthTable(variables, expressions);
  renderExpressionList();
}

function renderTruthTable(variables, expressions) {
  const tableHeader = document.getElementById('table-header');
  const tableBody = document.getElementById('table-body');
  tableHeader.innerHTML = '';
  tableBody.innerHTML = '';

  if (variables.length === 0) {
      alert('Pilih setidaknya satu variabel!');
      return;
  }

  // Membuat header tabel
  let headerRow = '<tr>';
  variables.forEach(varName => {
      headerRow += `<th>${varName}</th>`;
  });

  expressions.forEach((expr, index) => {
      headerRow += `<th>${expr}</th>`;
  });

  headerRow += '</tr>';
  tableHeader.innerHTML = headerRow;

  // Membuat body tabel
  const numRows = Math.pow(2, variables.length);
  for (let i = numRows - 1; i >= 0; i--) {
    let row = '<tr>';
    let binaryString = i.toString(2).padStart(variables.length, '0');
    let truthValues = {};

      // Tambahkan nilai true/false untuk setiap variabel
    variables.forEach((varName, index) => {
      const value = binaryString[index] === '1' ? 1 : 0;
      truthValues[varName] = value;
      row += `<td>${value}</td>`;
    });

    expressions.forEach(expr => {
      let result;
      try {
        let expression = expr;
        variables.forEach(varName => {
          const regex = new RegExp(`\\b${varName}\\b`, 'g');
            expression = expression.replace(regex, truthValues[varName]);
        });

        result = eval(expression) ? 1 : 0;
      } catch (e) {
        result = 'Error';
      }
        row += `<td>${result}</td>`;
      });

      row += '</tr>';
      tableBody.innerHTML += row;
  }
}

function renderExpressionList() {
  const expressionList = document.getElementById('expression-list');
  expressionList.innerHTML = '';

  expressions.forEach((expr, index) => {
      const exprElement = document.createElement('div');
      exprElement.innerHTML = `
          <span>Hasil ${index + 1}: ${expr}</span>
          <button onclick="updateExpression(${index})">Update</button>
          <button onclick="deleteExpression(${index})">Delete</button>
      `;
      expressionList.appendChild(exprElement);
  });
}

function updateExpression(index) {
  const newExpression = prompt('Masukkan ekspresi logika baru:', expressions[index]);
  if (newExpression !== null && newExpression !== '') {
      expressions[index] = newExpression;
      renderTruthTable(
          Array.from(document.querySelectorAll('.var-checkbox:checked')).map(cb => cb.value),
          expressions
      );
      renderExpressionList();
  }
}

function deleteExpression(index) {
  expressions.splice(index, 1);
  renderTruthTable(
      Array.from(document.querySelectorAll('.var-checkbox:checked')).map(cb => cb.value),
      expressions
  );
  renderExpressionList();
}
