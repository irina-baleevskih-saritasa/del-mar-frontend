import { Injectable } from '@angular/core';

import { EntityValidationErrors } from '../models/app-error';
import { PasswordChange } from '../models/password-change';

import { PasswordChangeDto } from '../dtos/password-change.dto';
import { ValidationErrorDto } from '../dtos/validation-error.dto';

import { extractErrorMessage } from './extract-error-message';
import { MapperToDto, ValidationErrorMapper } from './mappers';

/**
 * Mapper for change password process.
 */
@Injectable({ providedIn: 'root' })
export class PasswordChangeMapper
implements
    MapperToDto<PasswordChangeDto, PasswordChange>,
    ValidationErrorMapper<PasswordChangeDto, PasswordChange> {
	/** @inheritdoc */
	public validationErrorFromDto(
		errorDto: ValidationErrorDto<PasswordChangeDto>,
	): EntityValidationErrors<PasswordChange> {
		return {
			password: extractErrorMessage(errorDto.old_password),
			newPassword: extractErrorMessage(errorDto.new_password),
			newPasswordConfirmation: extractErrorMessage(
				errorDto.new_password_confirm,
			),
		};
	}

	/** @inheritdoc */
	public toDto(model: PasswordChange): PasswordChangeDto {
		return {
			old_password: model.password,
			new_password: model.newPassword,
			new_password_confirm: model.newPasswordConfirmation,
		};
	}
}
