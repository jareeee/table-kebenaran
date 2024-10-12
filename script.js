let expressions = []

function generateTruthTable() {
  const checkboxes = document.querySelectorAll('.var-checkbox:checked');
  const variables = Array.from(checkboxes).map(cb => cb.value);
  const numVars = variables.length;

  const logicExpression = document.getElementById('logic-expression').value;

  if (logicExpression === '') {
    alert('Masukkan ekspresi logika!');
    return;
  }

  expressions.push(logicExpression)

  const tableHeader = document.getElementById('table-header');
  const tableBody = document.getElementById('table-body');
  tableHeader.innerHTML = '';
  tableBody.innerHTML = '';

  if (numVars === 0) {
    alert('Pilih setidaknya satu variabel!');
    return;
  }

  let headerRow = '<tr>';
  variables.forEach(varName => {
    headerRow += `<th>${varName}</th>`;
  });

  expressions.forEach((expr, index) => {
    headerRow += `<th>${expr}</th>`;
  })

  headerRow += '</tr>';
  tableHeader.innerHTML = headerRow;

  const numRows = Math.pow(2, numVars);
  for (let i = numRows - 1; i >= 0; i--) {
    let row = '<tr>';
    let binaryString = i.toString(2).padStart(numVars, '0');
    let truthValues = {};

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