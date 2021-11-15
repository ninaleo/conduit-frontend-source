import {
    INCLUDES_NON_WHITESPACE_CHARACTER_REGEX,
    INCLUDES_FORBIDDEN_WORD_REGEX
} from '../../constants/inputContentRegex';

export const validateTitleContent = (title) => {
    return INCLUDES_NON_WHITESPACE_CHARACTER_REGEX.test(title) && !INCLUDES_FORBIDDEN_WORD_REGEX.test(title);
};

export const validateDescriptionContent = (description) => {
    return !INCLUDES_FORBIDDEN_WORD_REGEX.test(description);
};

export const validateBodyContent = (body) => {
    return INCLUDES_NON_WHITESPACE_CHARACTER_REGEX.test(body) && !INCLUDES_FORBIDDEN_WORD_REGEX.test(body);
};

export const validateTagInputContent = (tagInput) => {
    return INCLUDES_NON_WHITESPACE_CHARACTER_REGEX.test(tagInput) && !INCLUDES_FORBIDDEN_WORD_REGEX.test(tagInput);
};

export const validateTagListContent = (tagList) => {
    const tagsWithoutNonWhitespaceCharacters = tagList.filter(tag => !INCLUDES_NON_WHITESPACE_CHARACTER_REGEX.test(tag) && !INCLUDES_FORBIDDEN_WORD_REGEX.test(tag));
    return !(tagsWithoutNonWhitespaceCharacters.length > 0);
}

export const validateCommentContent = (comment) => {
    return INCLUDES_NON_WHITESPACE_CHARACTER_REGEX.test(comment) && !INCLUDES_FORBIDDEN_WORD_REGEX.test(comment);
};
