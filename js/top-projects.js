'use strict';

document.addEventListener('DOMContentLoaded', async () => {

    const container = document.getElementById('featuredProjects');

    try{
        const response = await fetch('projects.json');
        const projects = await response.json();
        const featuredProjects = projects.filter(project => project.featured).slice(0, 5);

        featuredProjects.forEach(project => {
            container.insertAdjacentHTML(
                'beforeend',
                createFeaturedCard(project)
            );
        });

        new Splide('#featuredProjectsSlider', {
            type: 'loop',
            perPage: 3,
            gap: '2rem',
            arrows: false,
            pagination: false,
            drag: 'free',
            focus: 'center',
            autoWidth: false,
            autoScroll: {
                speed: 1,
                pauseOnHover: true,
                pauseOnFocus: true,
            },

            breakpoints: {
                1024: {
                    perPage: 2,
                },
                768: {
                    perPage: 1,
                }
            }
        }).mount(window.splide.Extensions);
            }catch(error){
                console.error(error);
            }
        });

function createFeaturedCard(project){
    return `
        <li class="splide__slide">
            <article class="project-card">
                <a href="${project.url}" target="_blank">
                    <img
                        src="${project.image}"
                        alt="${project.title}"
                        class="project-card__image"
                    >
                    <div class="project-card__body">
                        <p class="project-card__category">
                            ${project.subtitle}
                        </p>
                        <h3 class="project-card__title">
                            ${project.title}
                        </h3>
                        <p class="project-card__description">
                            ${project.description}
                        </p>
                    </div>
                </a>
            </article>
        </li>
    `;
}

