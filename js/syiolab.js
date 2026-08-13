'use strict';

let projects = [];


document.addEventListener('DOMContentLoaded', async () => {

  try {

    const response = await fetch('/data/projects.json');

    if (!response.ok) {
      throw new Error('projects.jsonの読み込みに失敗しました');
    }

    projects = await response.json();


    /*
     * =========================
     * SYIOLabo本体
     * =========================
     */

    const syioLabo = projects.find(
      project => project.id === 'syio-lab'
    );


    if (!syioLabo) {
      throw new Error(
        'SYIOLabo本体のデータがprojects.jsonにありません'
      );
    }


    /*
     * =========================
     * SYIOLabo情報を表示
     * =========================
     */

    const title =
      document.getElementById('syiolabo-title');

    const description =
      document.getElementById('syiolabo-description');

    const image =
      document.getElementById('syiolabo-image');


    if (title) {
      title.textContent = syioLabo.title;
    }

    if (description) {
      description.textContent =
        syioLabo.description;
    }

    if (image) {
      image.src = syioLabo.image;
      image.alt = syioLabo.title;
    }


    /*
     * =========================
     * SYIOLabo関連プロジェクト
     * =========================
     */

    const syioProjects = projects.filter(
      project =>
        project.category === 'syio-lab' &&
        project.id !== 'syio-lab'
    );


    renderProjects(syioProjects);


  } catch (error) {

    console.error(error);

  }

});


/**
 * SYIOLaboプロジェクト表示
 */
function renderProjects(projects) {

  const list =
    document.getElementById('projectList');

  if (!list) {
    return;
  }

  list.innerHTML = '';


  /*
   * プロジェクトがない場合
   */

  if (projects.length === 0) {

    list.insertAdjacentHTML(
      'beforeend',
      `
      <li class="project-item project-item--empty">
        <p>現在、公開されているプロジェクトはありません。</p>
      </li>
      `
    );

    return;

  }


  /*
   * プロジェクトカード生成
   */

  projects.forEach(project => {

    list.insertAdjacentHTML(
      'beforeend',
      createProjectCard(project)
    );

  });

}


/**
 * プロジェクトカード
 */
function createProjectCard(project) {

  const target =
    project.url ? '_blank' : '_self';


  return `
    <li class="project-item">

      <article class="project-card ${project.status}">

        <img
          class="project-card__image"
          src="../${project.image}"
          alt="${project.title}"
        >

        <div class="project-card__body">

          <a
            href="${project.url || '#'}"
            target="${target}"
            ${project.url ? 'rel="noopener noreferrer"' : ''}
          >

            ${
              project.subtitle
                ? `
                  <p class="project-card__category">
                    ${project.subtitle}
                  </p>
                `
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