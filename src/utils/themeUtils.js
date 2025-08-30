export function setTheme(theme) {
    const root = document.documentElement;
    root.classList.remove('dark', 'light');
    root.classList.add(theme);
    localStorage.setItem('theme', theme);
   }
   export function getTheme() {
    return localStorage.getItem('theme') || 'dark';
   }
                                                    