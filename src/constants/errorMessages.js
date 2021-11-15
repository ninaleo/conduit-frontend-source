import { 
    PASSWORD_LENGTH_MIN,
    PASSWORD_LENGTH_MAX 
} from '../constants/inputLengthLimits';
export const PASSWORD_VALIDITY_ERROR_MESSAGE = 'Password must contain at least ' + PASSWORD_LENGTH_MIN + ' and at most ' + PASSWORD_LENGTH_MAX + ' characters. Please note that white space is not allowed.';

export const PASSWORD_MATCH_ERROR_MESSAGE = 'Typed passwords do not match.';

export const ARTICLE_INPUT_ERROR_MESSAGE = 'Please note that title and body text are needed, and no offensive language is allowed.';

export const TAG_INPUT_ERROR_MESSAGE = 'Tag needs content and no offensive language is allowed.';

export const COMMENT_INPUT_ERROR_MESSAGE = 'Please note that some content is needed, and no offensive language is allowed.';
