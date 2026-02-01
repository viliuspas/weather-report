import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'conditionCode'
})
export class ConditionCodePipe implements PipeTransform {
    transform(value: string) {
        return value.replaceAll('-', ' ');
    }
}