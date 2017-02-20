import App from './app/app.js';
import Skills from './skills/skills.js';

let app    = new App(),
    skills = new Skills();

app.init();
//app.pages.skills.callback = () => skills.startAnimation();

//skills.init();