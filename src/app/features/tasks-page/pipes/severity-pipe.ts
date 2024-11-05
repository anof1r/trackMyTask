import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'statusSeverity',
  standalone: true
})
export class StatusSeverityPipe implements PipeTransform {
  transform(label: string): "success" | "secondary" | "info" | "warning" | "danger" | "contrast" {
    switch (label.toLowerCase()) {
      case 'critical':
        return 'danger';
      case 'low':
        return 'contrast';
      case 'normal':
        return 'info';
      default:
        return 'info';
    }
  }
}
