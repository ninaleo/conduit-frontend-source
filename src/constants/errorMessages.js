import { 
    PASSWORD_LENGTH_MIN,
    PASSWORD_LENGTH_MAX 
} from '../constants/inputLengthLimits';
export const PASSWORD_VALIDITY_ERROR_MESSAGE = 'Password must contain at least ' + PASSWORD_LENGTH_MIN + ' and at most ' + PASSWORD_LENGTH_MAX + ' characters. Please note that white space is not allowed.';

export const PASSWORD_MATCH_ERROR_MESSAGE = 'Typed passwords do not match.';
