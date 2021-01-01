import { $ } from '@core/dom';
import { ExcelComponent } from '@core/ExcelComponent';
import { createTable } from './table.tamplate';
import { isResize, isSelect, nextCell,  matrix } from './table.functions';
import { resizeHandler } from './table.resize';
import TableSelection from './TableSelection';


 
export class Table extends ExcelComponent{

  constructor($root, options){
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown', 'input'],
      ...options
    })
  }

  static className = 'excel__table'

  toHTML(){
    return createTable()
  }

  prepare(){
    this.selection = new TableSelection()
  }

  init(){
    super.init()
    const $cell = this.$root.find('[data-id="0:0"]')
    this.selectCell($cell)

    this.$on('formula:input', text => {
      this.selection.current.text(text)
      console.log('Text from Formula', text)
    })

    this.$on('formula:done', () => {
      this.selection.current.focus()
    })
  }

  selectCell($cell){
    this.selection.select($cell)
    this.$emit('table:select', $cell)
  }

  onMousedown(event){
    if (isResize(event)){
      resizeHandler(this.$root, event)
    } else if (isSelect(event)){
      const $target = $(event.target)
      if (event.shiftKey){
        const target = $target.id(true)
        const current = this.selection.current.id(true)
        const $cells = matrix(current, target).map(id => this.$root.find(`[data-id="${id}"]`))
        this.selection.selectGroup($cells)
      } else {
        this.selection.select($target)
      }
    }
  }

  onKeydown(event){
    const keys = ['Enter', 'Tab', 'ArrowDown', 'ArrowRight', 'ArrowUp', 'ArrowLeft']
    if (keys.includes(event.key) && !event.shiftKey){
      const key = event.key
      const { row, col } = this.selection.current.id(true)
      const $nextCell = this.$root.find(nextCell(key, row, col))
      this.selectCell($nextCell)
    }
  }

  onInput(event){
    this.$emit('table:input', $(event.target).text())
  }

}



