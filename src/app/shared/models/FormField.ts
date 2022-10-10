export class FormField {
    title: string;
    name: string;
    type: string;
    options?: any[];
    radios?: string[];
    elseInput?: boolean;

    constructor(field: FormField) {
        this.title = field.title;
        this.name = field.name;
        this.type = field.type;
    }
}