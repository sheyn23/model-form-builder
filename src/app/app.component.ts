import { Component } from '@angular/core';
import { Field } from './models/Field';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {

  public title: string = 'model';
  public types: string[] = [
    'string',
    'number',
    'Guid',
    'DateTime',
    'Array<>',
    'model',
    'any',
  ];
  public fields: Field[] = [
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
  public calculatedTSModel: string = '';
  public calculatedCSHModel: string = '';
  public calculatedCSHDto: string = '';

  constructor() { }

  public addField() {
    this.fields.push({ name: '', type: '' })
  }

  public removeField(id: number) {
    this.fields = this.fields.filter((field: Field, index: number) => {
      return index === id ? null : field
    })
  }

  public copyToClipboard(text: any) {
    navigator.clipboard.writeText(text.textContent);
  }

  public calculate() {
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
    this.calculatedCSHModel = `public class ${titleUpperCase} { <br>`;
    for (let field of this.fields) {
      this.calculatedCSHModel += `<br>
        public ${field.type} ${field.name.substr(0, 1).toUpperCase() + field.name.substr(1)} { get; set; };
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
    this.calculatedCSHDto = `public class Dto${titleUpperCase} <br> { <br>`;
    for (let field of this.fields) {
      this.calculatedCSHDto += `<br>
      [JsonProperty(PropertyName = "${field.name}")] <br>
      public ${field.type} ${field.name.substr(0, 1).toUpperCase() + field.name.substr(1)} { get; set; }; <br>
      `
    }

    this.calculatedCSHDto += `
      <br>
        }
    `;
  }
}
