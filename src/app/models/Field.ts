export class Field {
    name: string;
    type: string;

    constructor(field: Field) {
        this.name = field.name;
        this.type = field.type;
    }
}