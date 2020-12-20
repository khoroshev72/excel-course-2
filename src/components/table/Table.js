import { ExcelComponent } from '@core/ExcelComponent';
import { createTable } from './table.tamplate';

export class Table extends ExcelComponent{

  constructor($root){
    super($root, {
      name: 'Table',
      listeners: []
    })
  }

  static className = 'excel__table'

  toHTML(){
    return createTable()
  }
}