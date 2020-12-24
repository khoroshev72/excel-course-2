const CODES = {
  A: 65,
  Z: 90
}

function createRow(content, index){
  const resize = index ? '<div class="row-resize" data-resize="row"></div>' : ''
  return `
  <div class="row" data-type="resizable" data-col="${index}">
    <div class="row-info">
      ${index ? index : ''}
      ${resize}
    </div>
    <div class="row-data">
      ${content}
    </div>
  </div> `
}

function toColumn(col, index){
  return `
  <div class="column" data-type="resizable" data-col="${index}">
    ${col}
    <div class="col-resize" data-resize="col"></div>
  </div> `
}

function toCell(_, col){
  return `
  <div class="cell" contenteditable="" data-col="${col}"></div>`
}

function toChar(_, index){
  return String.fromCharCode(CODES.A + index) 
}

export function createTable(rowsCount = 25){
  const colsCount = CODES.Z - CODES.A + 1
  const rows = []

  const cols = new Array(colsCount)
        .fill('')
        .map((_, index) => toChar(_, index))
        .map((el, index) => toColumn(el, index))
        .join('')

  rows.push(createRow(cols, null))

  for (let i = 0; i < rowsCount; i++){
    const cells = new Array(colsCount)
          .fill('')
          .map((_, index) => toCell(_, index))
          .join('')

    rows.push(createRow(cells, i + 1))
  }

  return rows.join('')
}