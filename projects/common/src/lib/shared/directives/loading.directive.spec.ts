import { createDirectiveFactory, SpectatorDirective } from '@ngneat/spectator';

import { LoadingDirective } from './loading.directive';

describe('LoadingDirective', () => {
	let spectator: SpectatorDirective<LoadingDirective>;

	const createSpectator = createDirectiveFactory(LoadingDirective);

	beforeEach(() => {
		spectator = createSpectator(`<div delmarcLoading></div>`);
	});

	it('applies loading class on element', () => {
		spectator.setInput('delmarcLoading', true);
		expect(spectator.element.classList.contains('delmarc-loading')).toBe(true);
	});

	it('removes loading class on element', () => {
		spectator.setInput('delmarcLoading', false);
		expect(spectator.element.classList.contains('delmarc-loading')).toBe(false);
	});

	it('disables element', () => {
		spectator.setInput('delmarcLoading', true);
		expect(spectator.element.hasAttribute('disabled')).toBe(true);
	});

	it('enables element', () => {
		spectator.setInput('delmarcLoading', false);
		expect(spectator.element.hasAttribute('disabled')).toBe(false);
	});
});
