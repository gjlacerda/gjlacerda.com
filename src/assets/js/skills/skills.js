const quart     = Math.PI / 2;
const PI2       = Math.PI * 2;
const lineWidth = 6;

class Skills {

    constructor() {

        /**
         * Percentual dos gráficos
         * @type {number}
         */
        this.percent = 0;

        /**
         * Lista de skills
         */
        this.skills = [
            {
                canvas: document.getElementById('javascript'),
                label: document.querySelector('.javascript-label'),
                name: 'javascript',
                percent: 90,
                color: '189, 92, 185'
            }, {
                canvas: document.getElementById('angular1'),
                label: document.querySelector('.angular1-label'),
                name: 'angular1',
                percent: 90,
                color: '45, 126, 165'

            }, {
                canvas: document.getElementById('angular2'),
                label: document.querySelector('.angular2-label'),
                name: 'angular2',
                percent: 60,
                color: '254, 94, 65'
            }, {
                canvas: document.getElementById('react'),
                label: document.querySelector('.react-label'),
                name: 'react',
                percent: 50,
                color: '46, 204, 113'
            }, {
                canvas: document.getElementById('gulp'),
                label: document.querySelector('.gulp-label'),
                name: 'gulp',
                percent: 75,
                color: '192, 57, 43'
            }, {
                canvas: document.getElementById('css3'),
                label: document.querySelector('.css3-label'),
                name: 'css3',
                percent: 90,
                color: '254, 134, 31'
            }, {
                canvas: document.getElementById('html5'),
                label: document.querySelector('.html5-label'),
                name: 'html5',
                percent: 95,
                color: '51, 139, 231'
            }, {
                canvas: document.getElementById('less'),
                label: document.querySelector('.less-label'),
                name: 'less',
                percent: 85,
                color: '52, 73, 94'
            }, {
                canvas: document.getElementById('git'),
                label: document.querySelector('.git-label'),
                name: 'git',
                percent: 70,
                color: '142, 68, 173'
            }, {
                canvas: document.getElementById('php'),
                label: document.querySelector('.php-label'),
                name: 'php',
                percent: 80,
                color: '26, 188, 156'
            }
        ];
    }

    init() {
        this.paintLabels();
    }

    paintLabels() {
        this.skills.forEach(skill => {
            skill.label.style.color = `rgb(${skill.color})`;
        });
    }

    render() {

        this.skills.forEach(skill => {

            let $canvas = skill.canvas,
                ctx     = $canvas.getContext("2d"),
                pct     = this.percent / 100,
                extent  = parseInt((skill.percent) * pct),
                current = (skill.percent) / 100 * PI2 * pct - quart,
                x       = $canvas.width / 2,
                y       = $canvas.height / 2,
                radius  = ($canvas.width / 2) - (lineWidth / 2);

            ctx.lineWidth = lineWidth;
            ctx.font      = "16px Arial";

            ctx.clearRect(0, 0, $canvas.width, $canvas.height);
            ctx.beginPath();
            ctx.arc(x, y, radius, -quart, 100);
            ctx.fillStyle = `rgba(${skill.color},.1)`;
            ctx.fill();

            ctx.beginPath();
            ctx.arc(x, y, radius, -quart, current);
            ctx.strokeStyle = `rgb(${skill.color})`;
            ctx.stroke();
            ctx.fillStyle = '#666';
            ctx.fillText(extent + '%', ($canvas.width / 2) - 14, ($canvas.height / 2) + 5);
        });
    }

    animate() {

        if (this.percent < 100) {
            requestAnimationFrame(() => this.animate());
        }

        this.render();

        this.percent += 1;
    }
}

export default Skills;