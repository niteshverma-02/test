/** Pre-paint: the stored choice, else dark (the site is designed dark-first). Kept apart from the client hook so the layout can import it. */
export const modeScript = `try{var m=localStorage.getItem("mode");if(m!=="light"&&m!=="dark")m="dark";document.documentElement.dataset.mode=m}catch(e){}`;
