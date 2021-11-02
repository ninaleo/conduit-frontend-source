import { validatePasswordLength } from './length/validatePasswordLength';
import { validatePasswordContent } from './content/validatePasswordContent';

export const validatePassword = (password, passwordRetype) => {
    const copiedPassword = password;
    const copiedPasswordRetype = passwordRetype;
    const passwordValidity = validatePasswordLength(copiedPassword.length) && validatePasswordContent(copiedPassword);
    const passwordMatch = copiedPassword === copiedPasswordRetype;
    return ({passwordMatch: passwordMatch, passwordValidity: passwordValidity});
}
