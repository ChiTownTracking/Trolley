const successMessages: Record<string, string> = {
  'quote-request': 'Thank you. Your quote request has been submitted successfully.',
  'contact-us': 'Thank you. Your message has been submitted successfully.',
  'reservation-request':
    'Thank you. Your reservation request has been submitted. This does not confirm availability or a booking.',
};

const failureMessage =
  'Your request could not be sent. Please try again or contact us directly.';

const submittingForms = new WeakSet<HTMLFormElement>();

const successPopup = document.querySelector<HTMLDialogElement>('[data-form-success-popup]');
const successPopupMessage = successPopup?.querySelector<HTMLElement>(
  '[data-form-success-popup-message]',
);

const showSuccessPopup = (form: HTMLFormElement, message: string) => {
  if (!successPopup || !successPopupMessage) return;

  const containingDialog = form.closest<HTMLDialogElement>('dialog[open]');
  containingDialog?.close();
  successPopupMessage.textContent = message;
  if (successPopup.open) successPopup.close();
  successPopup.showModal();
};

successPopup
  ?.querySelectorAll<HTMLButtonElement>('[data-form-success-popup-close]')
  .forEach((button) => button.addEventListener('click', () => successPopup.close()));

successPopup?.addEventListener('click', (event) => {
  if (event.target === successPopup) successPopup.close();
});

const setStatus = (
  status: HTMLElement,
  message: string,
  state: 'sending' | 'success' | 'error',
) => {
  status.textContent = message;
  status.dataset.state = state;
};

document
  .querySelectorAll<HTMLFormElement>('form[data-netlify-form="true"]')
  .forEach((form) => {
    form.addEventListener('submit', async (event) => {
      event.preventDefault();

      const target = event.currentTarget;
      if (!(target instanceof HTMLFormElement) || submittingForms.has(target)) return;
      if (!target.reportValidity()) return;

      const status = target.querySelector<HTMLElement>('[data-form-status]');
      const submitButton = target.querySelector<
        HTMLButtonElement | HTMLInputElement
      >('button[type="submit"], input[type="submit"]');
      if (!status || !submitButton) {
        console.error('Netlify form submission could not start: required form UI is missing.');
        return;
      }

      submittingForms.add(target);
      const wasDisabled = submitButton.disabled;
      submitButton.disabled = true;
      submitButton.setAttribute('aria-busy', 'true');
      target.setAttribute('aria-busy', 'true');
      setStatus(status, 'Sending…', 'sending');

      try {
        const formData = new FormData(target);
        const formName = formData.get('form-name');
        if (typeof formName !== 'string' || !formName) {
          throw new Error('The required form-name field is missing.');
        }

        const body = new URLSearchParams();
        for (const [key, value] of formData.entries()) {
          body.append(key, String(value));
        }

        const response = await fetch('/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: body.toString(),
        });

        if (!response.ok) {
          throw new Error(`Form endpoint returned HTTP ${response.status}.`);
        }

        target.reset();
        const successMessage =
          successMessages[formName] ??
          'Thank you. Your request has been submitted successfully.';
        setStatus(status, successMessage, 'success');
        target.dispatchEvent(new CustomEvent('netlify-form:success'));
        showSuccessPopup(target, successMessage);
      } catch (error) {
        setStatus(status, failureMessage, 'error');
        console.error('Netlify form submission failed.', error);
      } finally {
        submittingForms.delete(target);
        submitButton.disabled = wasDisabled;
        submitButton.removeAttribute('aria-busy');
        target.removeAttribute('aria-busy');
      }
    });
  });
