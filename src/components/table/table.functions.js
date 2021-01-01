import { range } from "@core/utils"

export function isResize(event){
  return event.target.dataset.resize
}

export function isSelect(event){
  return event.target.dataset.type === 'cell'
}

export function matrix(current, target){
  const cols = range(current.col, target.col)
  const rows = range(current.row, target.row)

  const ids = cols.reduce((acc, col) => {
    rows.forEach(row => acc.push(`${row}:${col}`))
    return acc
  }, [])
  return ids;
}

export function nextCell(key, row, col){
  switch (key){
    case 'Enter':
    case 'ArrowDown':
      row++
    break;

    case 'Tab':
    case 'ArrowRight':
      col++
    break;

    case 'ArrowUp':
      row - 1 < 0 ? 0 : row--
    break;

    case 'ArrowLeft':
      col - 1 < 0 ? 0 : col--
    break;
  }

  return `[data-id="${row}:${col}"]`
}