import { Component, OnInit } from '@angular/core';
import { ModelField } from 'src/app/models/ModelField';

@Component({
  selector: 'app-model-builder',
  templateUrl: './model-builder.component.html',
  styleUrls: ['./model-builder.component.sass']
})
export class ModelBuilderComponent implements OnInit {

  mode = 'textareaMode';
  title = 'model';
  types = [
    'string',
    'number',
    'Guid',
    'DateTime',
    'Array<>', //Открывать поле innerType
    'model',
    'any',
  ];
  fields: ModelField[] = [
    {
      name: 'test1',
      type: 'string',
    },
    {
      name: 'testSecond',
      type: 'Guid',
    },
    {
      name: 'test3',
      type: 'model',
    },
  ];
  textareaFields = `asdasd;string
asdas;string
das;string
d;string
asd;string
as;string
das;string
d;string
asdsdasdsad;string
asdasdasdasd;string
asdasd;string`;
  calculatedTSModel = '';
  calculatedCSHModel = '';
  calculatedCSHDto = '';

  constructor() { }

  ngOnInit(): void { }

  addField() {
    this.fields.push({ name: '', type: '' })
  }

  removeField(id: number) {
    this.fields = this.fields.filter((field: ModelField, index: number) => {
      return index === id ? null : field
    })
  }

  copyToClipboard(text: any) {
    navigator.clipboard.writeText(text.textContent);
  }

  calculate() {
    if (this.mode === 'textareaMode') {
      this.fields = [];
      let fieldsFromTextarea = this.textareaFields.split('\n');
      for (let i = 0; i < fieldsFromTextarea.length; i++) {
        const el = fieldsFromTextarea[i];
        const [name, type] = el.split(';');

        this.fields.push({
          name,
          type
        });
      }
    }

    this.calculatedTSModelMethod();
    this.calculatedCSHModelMethod();
    this.calculatedCSHDtoMethod();
  }

  private calculatedTSModelMethod() {
    let titleUpperCase = this.title.substr(0, 1).toUpperCase() + this.title.substr(1);
    this.calculatedTSModel = `export class Dto${titleUpperCase} { <br>`;
    for (let field of this.fields) {
      this.calculatedTSModel += `<br>
        ${field.name}: ${field.type};
      `
    }

    this.calculatedTSModel += `<br><br>
      constructor(${this.title}: ${titleUpperCase}) {
    `;

    for (let field of this.fields) {
      this.calculatedTSModel += `<br>
        this.${field.name} = ${this.title}.${field.name};
      `
    }

    this.calculatedTSModel += `<br>
        }<br>
      }
    `;
  }

  private calculatedCSHModelMethod() {
    let titleUpperCase = this.title.substr(0, 1).toUpperCase() + this.title.substr(1);
    this.calculatedCSHModel = `class ${titleUpperCase} { <br>`;
    for (let field of this.fields) {
      this.calculatedCSHModel += `<br>
        ${field.type} ${field.name.substr(0, 1).toUpperCase() + field.name.substr(1)} { get; set; };
      `
    }

    this.calculatedCSHModel += `
      <br>
      <br>
        }
    `;
  }

  private calculatedCSHDtoMethod() {
    let titleUpperCase = this.title.substr(0, 1).toUpperCase() + this.title.substr(1);
    this.calculatedCSHDto = `class Dto${titleUpperCase} <br> { <br>`;
    for (let field of this.fields) {
      this.calculatedCSHDto += `<br>
      [JsonProperty(PropertyName = "${field.name}")] <br>
      ${field.type} ${field.name.substr(0, 1).toUpperCase() + field.name.substr(1)} { get; set; }; <br>
      `
    }

    this.calculatedCSHDto += `
      <br>
        }
    `;
  }

}
