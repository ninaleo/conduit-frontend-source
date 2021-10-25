import {validateTitleLength,
    validateDescriptionLength, 
    validateBodyLength,
    validateTagInputLength,
    validateTagListLength,
    validateCommentLength
} from './length/validateInputLengths';
import {validateTitleContent,
    validateDescriptionContent,
    validateBodyContent,
    validateTagInputContent,
    validateTagListContent,
    validateCommentContent 
} from './content/validateInputContents';

export const validateArticleAdd = (title, description, body, tagList) => {
    const lengthValidity = validateTitleLength(title.length) &&
    validateDescriptionLength(description.length) && 
    validateBodyLength(body.length) &&
    validateTagListLength(tagList.length);
   
    const contentValidity = validateTitleContent(title) &&
    validateDescriptionContent(description) && 
    validateBodyContent(body) &&
    validateTagListContent(tagList)
   
    return lengthValidity && contentValidity;
}

export const validateTagAdd = (tagInput, tagListLength) => {
    return validateTagInputLength(tagInput.length) &&
    validateTagInputContent(tagInput) && 
    validateTagListLength(tagListLength + 1);
}

export const validateCommentAdd = (comment) => {
    return validateCommentLength(comment.length) && 
    validateCommentContent(comment);
}
