import { $ } from '@core/dom';

export default class TableSelection{
  constructor(){
    this.group = []
    this.current = null
  }

  static className = 'selected'

  select($el){
    this.clear()
    this.group.push($el)
    $el.focus().addClass(TableSelection.className)
    this.current = $el
  }

  clear(){
    this.group.forEach($cell => $cell.removeClass(TableSelection.className));
    this.group = []
  }

  selectGroup(group = []){
    this.clear()
    this.group = group
    this.group.forEach($el => $el.addClass(TableSelection.className))
  }
}