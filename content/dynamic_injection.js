export async function script_builder(s){
    const src = chrome.runtime.getURL(s);
    const contentScript = await import(src);
    contentScript();
}