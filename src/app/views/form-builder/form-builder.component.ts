import { Component, OnInit } from '@angular/core';
import { FormField } from 'src/app/models/FormField';

@Component({
  selector: 'app-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.sass']
})
export class FormBuilderComponent implements OnInit {

  public title: string = 'People';
  public convertedForm: string = '';
  public fields: FormField[] = [
    {
      title: 'Возраст',
      name: 'age',
      type: 'number'
    },
    {
      title: 'Пол',
      name: 'gender',
      type: 'radio',
      radios: [
        'М',
        'Ж'
      ]
    },
    {
      title: 'Выбор',
      name: 'select',
      type: 'select',
      options: [
        'Выбор 1',
        'Выбор 2'
      ]
    },
    {
      title: '',
      name: '',
      type: ''
    }
  ];

  public types: string[] = [
    'number',
    'date',
    'time',
    'textarea',
    'radio',
    'select',
  ]

  constructor() { }

  ngOnInit(): void { }

  addField() {
    this.fields.push({ title: '', name: '', type: '' })
  }

  removeField(id: number) {
    this.fields = this.fields.filter((field: FormField, index: number) => {
      return index === id ? null : field
    })
  }

  addRadioOption(index: number, fieldType: 'radios' | 'options') {
    this.fields[index][fieldType]!.push("")
  }

  removeRadioOption(fieldId: number, fieldType: 'radios' | 'options', typeIndex: number) {
    this.fields[fieldId][fieldType] = this.fields[fieldId][fieldType]!.filter((str: string, index: number) => {
      return index === typeIndex ? null : str
    })
  }

  setTypeFields(event: any, id: number) {
    let type = event.target?.value;
    if (type === 'radio') {
      this.fields[id].radios = [""]
      delete this.fields[id].options
      return;
    };
    if (type === 'select') {
      this.fields[id].options = [""]
      delete this.fields[id].radios
      return;
    };
    delete this.fields[id].options
    delete this.fields[id].radios
  }

  copyToClipboard(text: any) {
    navigator.clipboard.writeText(text.textContent);
  }

  calculate() {
    console.log(this.fields);
  }

}
