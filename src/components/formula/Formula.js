import { ExcelComponent } from '@core/ExcelComponent';
import { $ } from '../../core/dom';


export class Formula extends ExcelComponent{

  constructor($root, options){
    super($root, {
      name: 'Formula',
      listeners: ['input', 'keydown'],
      ...options
    })
  }

  static className = 'excel__formula'

  init(){
    super.init()
    const $formula = this.$root.find('#formula')
    this.$on('table:select', $nextCell => {
      $formula.text($nextCell.text())
    })
    this.$on('table:input', text => {
      $formula.text(text)
    })
  }

  toHTML(){
    return `
    <div class="info">fx</div>
    <div class="input" id="formula" contenteditable spellcheck="false"></div>
    `
  }

  onInput(event){
    const $text = $(event.target).text()
    this.$emit('formula:input', $text)
  }

  onKeydown(event){
    const keys = ['Enter', 'Tab']
    if (keys.includes(event.key)){
      event.preventDefault()
      this.$emit('formula:done')
    }
  }
}