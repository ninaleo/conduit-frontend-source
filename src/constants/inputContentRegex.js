import { FORBIDDEN_WORDS } from './forbiddenWords';

export const INCLUDES_NON_WHITESPACE_CHARACTER_REGEX = /[^\s]/;
export const INCLUDES_WHITESPACE_CHARACTER_REGEX = /\s/;
export const INCLUDES_FORBIDDEN_WORD_REGEX = new RegExp('\\b(' + FORBIDDEN_WORDS.forbiddenWords.join('|') + ')\\b', 'i');
