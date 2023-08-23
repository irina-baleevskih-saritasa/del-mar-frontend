import { createComponentFactory, mockProvider, Spectator } from '@ngneat/spectator';
import { NEVER } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '@delmar/common/core/services/user.service';

import { CalendarComponent } from './calendar.component';

describe('CalendarComponent', () => {
	let spectator: Spectator<CalendarComponent>;

	const createSpectator = createComponentFactory({
		component: CalendarComponent,
		providers: [
			mockProvider(UserService, {
				currentUser$: NEVER,
			}),
		],
		mocks: [ActivatedRoute],
		shallow: true,
	});

	beforeEach(() => {
		spectator = createSpectator();
	});

	it('renders', () => {
		expect(spectator.component).toBeTruthy();
	});
});
