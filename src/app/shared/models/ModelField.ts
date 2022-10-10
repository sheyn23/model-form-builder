export class ModelField {
    name: string;
    type: string;

    constructor(field: ModelField) {
        this.name = field.name;
        this.type = field.type;
    }
}