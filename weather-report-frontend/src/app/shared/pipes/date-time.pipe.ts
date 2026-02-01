import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'dateTime'
})
export class DateTimePipe implements PipeTransform {
    transform(value: string, format: string) {
        if (format.toLowerCase() === 'hh:mm') {
            const date = new Date(value);
            const hours = date.getHours().toString().padStart(2, '0');
            const minutes = date.getMinutes().toString().padStart(2, '0');
            return `${hours}:${minutes}`;
        }
        return value;
    }
}