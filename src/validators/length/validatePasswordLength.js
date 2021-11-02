import {
    PASSWORD_LENGTH_MIN,
    PASSWORD_LENGTH_MAX
} from '../../constants/inputLengthLimits';

export const validatePasswordLength = (passwordLength) => {
    return passwordLength >= PASSWORD_LENGTH_MIN && 
    passwordLength <= PASSWORD_LENGTH_MAX;
};
