import { ReactiveFormsModule } from '@angular/forms';
import { byTestId, createRoutingFactory, SpectatorRouting, SpyObject } from '@ngneat/spectator';
import { UserService } from '@delmar/common/core/services/user.service';
import { of } from 'rxjs';
import { LabelComponent } from '@delmar/common/shared/components/label/label.component';
import { RouterLink } from '@angular/router';
import { LoadingDirective } from '@delmar/common/shared/directives/loading.directive';
import { AsyncPipe } from '@angular/common';

import { ConfirmResetPasswordComponent, RESET_CONFIRMATION_TOKEN_QUERY_KEY } from './confirm-reset-password.component';

describe('ConfirmResetPasswordComponent', () => {
	let spectator: SpectatorRouting<ConfirmResetPasswordComponent>;
	let userServiceSpy: SpyObject<UserService>;
	let passwordInput: HTMLInputElement;
	let passwordConfirmationInput: HTMLInputElement;
	let submitButton: HTMLButtonElement;

	const createSpectator = createRoutingFactory({
		component: ConfirmResetPasswordComponent,
		imports: [
			ReactiveFormsModule,
			LabelComponent,
			RouterLink,
			LoadingDirective,
			AsyncPipe,
		],
		mocks: [UserService],
		queryParams: {
			[RESET_CONFIRMATION_TOKEN_QUERY_KEY]: 'some-token',
		},
	});

	beforeEach(() => {
		spectator = createSpectator();
		userServiceSpy = spectator.inject(UserService);
		passwordInput = spectator.query(byTestId('confirm-reset-password-password-input')) as HTMLInputElement;
		passwordConfirmationInput = spectator.query(byTestId('confirm-reset-password-password-confirmation-input')) as HTMLInputElement;
		submitButton = spectator.query(byTestId('confirm-reset-password-submit-button')) as HTMLButtonElement;
	});

	describe('inputs', () => {
		it('have autocomplete attributes', () => {
			expect(passwordInput.getAttribute('autocomplete')).not.toBe('');
			expect(passwordConfirmationInput.getAttribute('autocomplete')).not.toBe('');
		});
	});

	describe('form submitted with', () => {
		describe('equal passwords', () => {
			const dummyPassword = 'some-dummy-password';

			it('calls UserService.confirmResetPassword(x)', () => {
				userServiceSpy.confirmPasswordReset.and.returnValue(of(undefined));

				spectator.typeInElement(dummyPassword, passwordInput);
				spectator.typeInElement(dummyPassword, passwordConfirmationInput);
				spectator.click(submitButton);

				expect(userServiceSpy.confirmPasswordReset).toHaveBeenCalled();
			});
		});

		describe('different passwords', () => {
			const dummyInvalidPassword = 'some-dummy-password';
			const dummyInvalidPasswordConfirmation = 'some-other-password';

			it('shouldn\'t call UserService.confirmResetPassword(x)', () => {
				spectator.typeInElement(dummyInvalidPassword, passwordInput);
				spectator.typeInElement(dummyInvalidPasswordConfirmation, passwordConfirmationInput);
				spectator.click(submitButton);

				expect(userServiceSpy.confirmPasswordReset).not.toHaveBeenCalled();
			});
		});
	});
});
