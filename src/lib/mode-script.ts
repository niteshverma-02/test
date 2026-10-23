/** Pre-paint: stored choice, else the system preference. Kept apart from the client hook so the layout can import it. */
export const modeScript = `try{var m=localStorage.getItem("mode");if(m!=="light"&&m!=="dark")m=matchMedia("(prefers-color-scheme: light)").matches?"light":"dark";document.documentElement.dataset.mode=m}catch(e){}`;
