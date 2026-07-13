'use strict';

document.addEventListener('DOMContentLoaded', async () => {

    const list = document.getElementById('projectList');

    try{

        const response = await fetch('projects.json');

        if(!response.ok){
            throw new Error('projects.jsonの読み込みに失敗しました');
        }

        const projects = await response.json();

        projects.forEach(project => {
            list.insertAdjacentHTML(
                'beforeend',
                createProjectCard(project)
            );
        });

        new Splide('#project-slider',{

            type:'loop',

            perPage:3,

            gap:'2rem',

            arrows:true,

            pagination:true,

            breakpoints:{

                1024:{
                    perPage:2
                },

                768:{
                    perPage:1
                }

            }

        }).mount();

    }catch(error){

        console.error(error);

    }

});

function createProjectCard(project){

    const target = project.url ? "_blank" : "_self";

    return `
        <li class="splide__slide">

            <article class="project-card ${project.status}">

                <img
                    class="project-card__image"
                    src="${project.image}"
                    alt="${project.title}"
                >

                <div class="project-card__body">

                    <a href="${project.url || '#'}" target="${target}">

                        ${
                            project.subtitle
                            ? `<p class="project-card__category">${project.subtitle}</p>`
                            : ''
                        }

                        <h3 class="project-card__title">

                            ${project.title}

                        </h3>

                        <p class="project-card__description">

                            ${project.description}

                        </p>

                    </a>

                </div>

            </article>

        </li>
    `;

}

function createProjectCard(project){

  const target = project.url ? '_blank' : '_self';

  return `
    <li class="splide__slide">

      <article class="project-card ${project.status}">

        <img
          class="project-card__image"
          src="${project.image}"
          alt="${project.title}"
        >

        <div class="project-card__body">

          <a href="${project.url || '#'}" target="${target}">

            ${
              project.subtitle
              ? `<p class="project-card__category">${project.subtitle}</p>`
              : ''
            }

            <h3 class="project-card__title">
              ${project.title}
            </h3>

            <p class="project-card__description">
              ${project.description}
            </p>

          </a>

        </div>

      </article>

    </li>
  `;
}