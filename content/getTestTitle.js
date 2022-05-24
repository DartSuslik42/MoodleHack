const test_title = document.querySelector("ul.breadcrumb")
    .textContent
    .trim()
    .replace(/\n/g,'/')
    .replace(/\s/g, '')
    .toLowerCase()
export {test_title}