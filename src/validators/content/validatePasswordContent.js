import {INCLUDES_WHITESPACE_CHARACTER_REGEX} from '../../constants/inputContentRegex';

export const validatePasswordContent = (password) => {
    const noWhitespaceValidity = !(INCLUDES_WHITESPACE_CHARACTER_REGEX.test(password));
    return noWhitespaceValidity;
};
