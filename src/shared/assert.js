// elements shape must be { 'elementName': Element, ...}
function assertElements(elements) {
    const missingElements = Object.entries(elements)
        .filter(([name, element]) => !element)
        .map(([name, element]) => name);

    if (missingElements.length > 0) {
        throw new Error(`Element(s) not found: ${missingElements.join(', ')}`);
    }
}

const assert = {
    elements: assertElements,
};

export default assert;
