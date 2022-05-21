export function script_builder(src){
    const script = document.createElement('script');
    script.setAttribute("type", "module");
    script.setAttribute("src", chrome.runtime.getURL(src));
    const body = document.body || document.getElementsByTagName("body")[0] || document.documentElement;
    body.insertBefore(script, body.lastChild);
}
