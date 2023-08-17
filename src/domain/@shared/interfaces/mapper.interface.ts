export interface Imapper<I,O>{
    execute(param:I):O
}