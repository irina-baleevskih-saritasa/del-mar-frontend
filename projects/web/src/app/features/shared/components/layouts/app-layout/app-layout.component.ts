import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

/** App layout component. */
@Component({
	selector: 'delmarw-app-layout',
	templateUrl: './app-layout.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	standalone: true,
	imports: [RouterOutlet],
})
export class AppLayoutComponent {}
