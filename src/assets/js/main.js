import App from './app/app.js';
import Skills from './skills/skills.js';

let app    = new App(),
    skills = new Skills();

app.setMaxHeight();
app.pages.skills.callback = () => skills.startAnimation();

window.addEventListener('resize', () => {
    app.setMaxHeight();
});

skills.init();

window.App = app;