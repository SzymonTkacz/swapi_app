import { Component, Input } from '@angular/core';
import { TruncatePipe } from '../../pipes/truncate.pipe';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-card-row',
  standalone: true,
  imports: [TruncatePipe, MatProgressBarModule],
  templateUrl: './card-row.component.html',
  styleUrl: './card-row.component.scss'
})
export class CardRowComponent {
  @Input() label: string = ""
  @Input() value?: string = ""
  @Input() loading: boolean = false
  @Input() highlighted: boolean = false
}
