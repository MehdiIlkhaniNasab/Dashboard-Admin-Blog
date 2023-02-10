function _querySelectorClass(className) {
    const targetElem = document.querySelector(`.${className}`)
    return targetElem
}

function _querySelectorId(idName) {
    const targetElem = document.querySelector(`#${idName}`)
    return targetElem
}

function _querySelectorAll(className) {
    const targetElem = document.querySelectorAll(`.${className}`)
    return targetElem
}


export { _querySelectorClass, _querySelectorId, _querySelectorAll }