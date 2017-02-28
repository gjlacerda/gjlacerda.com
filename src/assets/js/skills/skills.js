const QUART       = Math.PI / 2;
const PI2         = Math.PI * 2;
const PIXEL_RATIO = 2;

class Skills {

    constructor() {

        /**
         * Objeto de configuração de acordo com o tamanho da tela
         * @type {{}}
         */
        this.configSize = {};

        /**
         * Lista de skills
         */
        this.skills = [
            {
                canvas: document.getElementById('javascript'),
                label: document.querySelector('.javascript-label'),
                name: 'javascript',
                percent: 0,
                maxPercent: 90,
                color: '189, 92, 185'
            }, {
                canvas: document.getElementById('angular1'),
                label: document.querySelector('.angular1-label'),
                name: 'angular1',
                percent: 0,
                maxPercent: 90,
                color: '45, 126, 165'

            }, {
                canvas: document.getElementById('angular2'),
                label: document.querySelector('.angular2-label'),
                name: 'angular2',
                percent: 0,
                maxPercent: 60,
                color: '254, 94, 65'
            }, {
                canvas: document.getElementById('react'),
                label: document.querySelector('.react-label'),
                name: 'react',
                percent: 0,
                maxPercent: 50,
                color: '46, 204, 113'
            }, {
                canvas: document.getElementById('gulp'),
                label: document.querySelector('.gulp-label'),
                name: 'gulp',
                percent: 0,
                maxPercent: 75,
                color: '192, 57, 43'
            }, {
                canvas: document.getElementById('html5'),
                label: document.querySelector('.html5-label'),
                name: 'html5',
                percent: 0,
                maxPercent: 95,
                color: '51, 139, 231'
            }, {
                canvas: document.getElementById('css3'),
                label: document.querySelector('.css3-label'),
                name: 'css3',
                percent: 0,
                maxPercent: 90,
                color: '254, 134, 31'
            }, {
                canvas: document.getElementById('less'),
                label: document.querySelector('.less-label'),
                name: 'less',
                percent: 0,
                maxPercent: 85,
                color: '52, 73, 94'
            }, {
                canvas: document.getElementById('git'),
                label: document.querySelector('.git-label'),
                name: 'git',
                percent: 0,
                maxPercent: 70,
                color: '142, 68, 173'
            }, {
                canvas: document.getElementById('php'),
                label: document.querySelector('.php-label'),
                name: 'php',
                percent: 0,
                maxPercent: 80,
                color: '26, 188, 156'
            }
        ];
    }

    init() {
        this.getConfigurationSize()
        this.configureElements();
    }

    configureElements() {

        this.skills.forEach(skill => {
            skill.canvas.width        = this.configSize.canvasWidth * PIXEL_RATIO;
            skill.canvas.height       = this.configSize.canvasWidth * PIXEL_RATIO;
            skill.canvas.style.width  = this.configSize.canvasWidth + 'px';
            skill.canvas.style.height = this.configSize.canvasWidth + 'px';
            skill.label.style.color   = `rgb(${skill.color})`;
        });
    }

    render(skill) {

        let $canvas = skill.canvas,
            ctx     = $canvas.getContext("2d"),
            pct     = skill.percent / 100,
            extent  = parseInt((skill.maxPercent) * pct),
            current = (skill.maxPercent) / 100 * PI2 * pct - QUART,
            x       = $canvas.width / 2,
            y       = $canvas.height / 2,
            radius  = ($canvas.width / 2) - (this.configSize.lineWidth / 2) * PIXEL_RATIO;

        ctx.lineWidth = this.configSize.lineWidth * PIXEL_RATIO;
        ctx.font      = this.configSize.font + 'px Arial';

        ctx.clearRect(0, 0, $canvas.width, $canvas.height);

        ctx.beginPath();
        ctx.arc(x, y, radius, -QUART, 100);
        ctx.fillStyle = `rgba(${skill.color},.1)`;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(x, y, radius, -QUART, current);
        ctx.strokeStyle = `rgb(${skill.color})`;
        ctx.stroke();
        ctx.fillStyle = '#666';
        ctx.fillText(extent + '%', ($canvas.width / 2) - this.configSize.textX, ($canvas.height / 2) + 10);
    }

    startAnimation() {

        setTimeout(() => {
            this.skills.forEach((skill, index) => {
                setTimeout(() => {
                    this.animateElements(skill.canvas);
                    this.animateCanvas(skill);
                }, 400 * index);
            });
        }, 400);
    }

    animateCanvas(skill) {

        if (skill.percent < 100) {
            requestAnimationFrame(() => this.animateCanvas(skill));
        }

        this.render(skill);

        skill.percent += 1.5;
    }

    animateElements(element) {
        element.parentNode.style.transform = 'scale(1)';
        element.parentNode.style.opacity   = 1;
    }

    getConfigurationSize() {

        let width = window.innerWidth;

        this.configSize = {
            canvasWidth: 65,
            lineWidth: 3,
            font: 12 * PIXEL_RATIO,
            textX: 10 * PIXEL_RATIO,
        };

        if (width >= 375) {
            this.configSize = {
                canvasWidth: 75,
                lineWidth: 4,
                font: 12 * PIXEL_RATIO,
                textX: 10 * PIXEL_RATIO,
            };
        }

        if (width >= 450) {
            this.configSize = {
                canvasWidth: 90,
                lineWidth: 4,
                font: 12 * PIXEL_RATIO,
                textX: 10 * PIXEL_RATIO,
            };
        }

        if (width >= 600) {
            this.configSize = {
                canvasWidth: 120,
                lineWidth: 4,
                font: 14 * PIXEL_RATIO,
                textX: 10 * PIXEL_RATIO,
            };
        }

        if (width >= 1415) {
            this.configSize = {
                canvasWidth: 180,
                lineWidth: 5,
                font: 16 * PIXEL_RATIO,
                textX: 12 * PIXEL_RATIO,
            };
        }
    }
}

export default Skills;