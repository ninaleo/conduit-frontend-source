import {
    TITLE_LENGTH_MIN,
    TITLE_LENGTH_MAX,
    DESCRIPTION_LENGTH_MIN,
    DESCRIPTION_LENGTH_MAX,
    BODY_LENGTH_MIN,
    BODY_LENGTH_MAX,
    TAG_INPUT_LENGTH_MIN,
    TAG_INPUT_LENGTH_MAX,
    TAG_LIST_LENGTH_MIN,
    TAG_LIST_LENGTH_MAX,
    COMMENT_LENGTH_MIN,
    COMMENT_LENGTH_MAX
  } from '../../constants/inputLengthLimits';

export const validateTitleLength = (titleLength) => {
    return titleLength >= TITLE_LENGTH_MIN && 
    titleLength <= TITLE_LENGTH_MAX;
};

export const validateDescriptionLength = (descriptionLength) => {
    return descriptionLength >= DESCRIPTION_LENGTH_MIN && 
    descriptionLength <= DESCRIPTION_LENGTH_MAX;
};

export const validateBodyLength = (bodyLength) => {
    return bodyLength >= BODY_LENGTH_MIN && 
    bodyLength <= BODY_LENGTH_MAX;
};

export const validateTagInputLength = (tagInputLength) => {
    return tagInputLength >= TAG_INPUT_LENGTH_MIN && 
    tagInputLength <= TAG_INPUT_LENGTH_MAX;
};

export const validateTagLengthsOnTagList = (tagList) => {
    const tagsOutsideLengthLimits = tagList.filter(tag => !(tag.length >= TAG_INPUT_LENGTH_MIN && tag.length <= TAG_INPUT_LENGTH_MAX));
    return !(tagsOutsideLengthLimits.length > 0);
}

export const validateTagListLength = (tagListLength) => {
    return tagListLength >= TAG_LIST_LENGTH_MIN && 
    tagListLength <= TAG_LIST_LENGTH_MAX;
};

export const validateCommentLength = (commentLength) => {
    return commentLength >= COMMENT_LENGTH_MIN && 
    commentLength <= COMMENT_LENGTH_MAX;
};
