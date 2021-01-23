
/**
 * Checks a element and determines if it is in view of the users screen. If not it will return false.
 * @param element  The DOM element to check for isView
 * @returns Boolean for is in view of elements.
 */
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}