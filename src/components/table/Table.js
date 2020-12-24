import { ExcelComponent } from '@core/ExcelComponent';
import { createTable } from './table.tamplate';
import { isResize } from './table.functions';
import { resizeHandler } from './table.resize';


export class Table extends ExcelComponent{

  constructor($root){
    super($root, {
      name: 'Table',
      listeners: ['mousedown']
    })
  }

  static className = 'excel__table'

  toHTML(){
    return createTable()
  }

  onMousedown(event){
    if (isResize(event)){
      resizeHandler(this.$root, event)
    }
  }
}
