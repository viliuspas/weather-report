import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'dateTime'
})
export class DateTimePipe implements PipeTransform {
    private months: string[] = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    transform(value: string, format: string) {
        const date = new Date(value + 'Z');
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const month = this.months[date.getMonth()];
        const day = date.getDate().toString().padStart(2, '0');

        switch (format.toLowerCase()) {
            case 'hh:mm':
                return `${hours}:${minutes}`;
            case 'mmm dd':
                return `${month.slice(0, 3)} ${day}`;
        }

        return value;
    }
}