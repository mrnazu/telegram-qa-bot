// utils/formatUtils.js

function formatReferences(references) {
    return references
        .map((ref, index) => `${index + 1}. ${ref}`)
        .join('\n');
}

module.exports = { formatReferences };