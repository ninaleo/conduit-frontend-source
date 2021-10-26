import {validateTitleLength,
    validateDescriptionLength, 
    validateBodyLength,
    validateTagInputLength,
    validateTagListLength,
    validateTagLengthsOnTagList,
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
    const copiedTitle = title;
    const copiedDescription = description;
    const copiedBody = body;
    const copiedTagList = [...tagList];

    const lengthValidity = validateTitleLength(copiedTitle.length) &&
    validateDescriptionLength(copiedDescription.length) && 
    validateBodyLength(copiedBody.length) && 
    validateTagLengthsOnTagList(copiedTagList) &&
    validateTagListLength(copiedTagList.length);
   
    const contentValidity = validateTitleContent(copiedTitle) &&
    validateDescriptionContent(copiedDescription) && 
    validateBodyContent(copiedBody) &&
    validateTagListContent(copiedTagList)
   
    return lengthValidity && contentValidity;
}

export const validateTagAdd = (tagInput, tagListLength) => {
    const copiedTagInput = tagInput;
    const copiedTagListLength = tagListLength;

    return validateTagInputLength(copiedTagInput.length) &&
    validateTagInputContent(copiedTagInput) && 
    validateTagListLength(copiedTagListLength + 1);
}

export const validateCommentAdd = (comment) => {
    const copiedComment = comment;

    return validateCommentLength(copiedComment.length) && 
    validateCommentContent(copiedComment);
}
