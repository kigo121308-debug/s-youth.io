'use strict';

let ITEMS_PER_PAGE = getItemsPerPage();

let projects = [];
let filteredProjects = [];
let currentPage = 1;

/**
 * デバイスごとの表示件数
 */
function getItemsPerPage() {

  if (window.innerWidth >= 1024) {
    // PC（3列×3行）
    return 9;
  }

  if (window.innerWidth >= 768) {
    // タブレット（2列×3行）
    return 6;
  }

  // スマホ（1列×4行）
  return 2;

}

document.addEventListener('DOMContentLoaded', async () => {

  try {

    const response = await fetch('data/projects.json');

    if (!response.ok) {
      throw new Error('projects.jsonの読み込みに失敗しました');
    }

    projects = await response.json();

    filteredProjects = [...projects];

    createFilterButtons();

    renderProjects(currentPage);
    renderPagination();

  } catch (error) {

    console.error(error);

  }

});

function renderProjects(page) {

  const list = document.getElementById('projectList');

  list.innerHTML = '';

  const start = (page - 1) * ITEMS_PER_PAGE;
  const end = start + ITEMS_PER_PAGE;

  const pageProjects = filteredProjects.slice(start, end);

  pageProjects.forEach(project => {

    list.insertAdjacentHTML(
      'beforeend',
      createProjectCard(project)
    );

  });

}

function renderPagination() {

  const pagination = document.getElementById('pagination');

  pagination.innerHTML = '';

  const totalPages = Math.ceil(filteredProjects.length / ITEMS_PER_PAGE);

  // 前へ
  if (currentPage > 1) {

    pagination.insertAdjacentHTML(
      'beforeend',
      `<button class="page-btn prev">←</button>`
    );

    pagination.lastElementChild.addEventListener('click', () => {

      currentPage--;

      renderProjects(currentPage);
      renderPagination();

      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });

    });

  }

  // ページ番号
  for (let i = 1; i <= totalPages; i++) {

    pagination.insertAdjacentHTML(
      'beforeend',
      `
      <button
        class="page-btn ${i === currentPage ? 'active' : ''}"
        data-page="${i}"
      >
        ${i}
      </button>
      `
    );

  }

  // ページクリック
  pagination.querySelectorAll('[data-page]').forEach(button => {

    button.addEventListener('click', () => {

      currentPage = Number(button.dataset.page);

      renderProjects(currentPage);
      renderPagination();

      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });

    });

  });

  // 次へ
  if (currentPage < totalPages) {

    pagination.insertAdjacentHTML(
      'beforeend',
      `<button class="page-btn next">→</button>`
    );

    pagination.lastElementChild.addEventListener('click', () => {

      currentPage++;

      renderProjects(currentPage);
      renderPagination();

      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });

    });

  }

}

function createProjectCard(project) {

  const target = project.url ? '_blank' : '_self';

  return `
    <li class="project-item">

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

function createFilterButtons() {

  const filter = document.getElementById('projectFilter');

  filter.innerHTML = '';

  filter.insertAdjacentHTML(
    'beforeend',
    `<button class="filter-btn active" data-category="all">すべて</button>`
  );

  const categories = [...new Map(
    projects.map(project => [
      project.category,
      project.categoryName
    ])
  ).entries()];

  categories.forEach(([category, categoryName]) => {

    filter.insertAdjacentHTML(
      'beforeend',
      `
      <button class="filter-btn" data-category="${category}">
        ${categoryName}
      </button>
      `
    );

  });

  addFilterEvents();

}

function addFilterEvents() {

  document.querySelectorAll('.filter-btn').forEach(button => {

    button.addEventListener('click', () => {

      document.querySelector('.filter-btn.active')
        ?.classList.remove('active');

      button.classList.add('active');

      const category = button.dataset.category;

      if (category === 'all') {

        filteredProjects = [...projects];

      } else {

        filteredProjects = projects.filter(project =>
          project.category === category
        );

      }

      currentPage = 1;

      renderProjects(currentPage);
      renderPagination();

    });

  });

}

/**
 * 画面サイズ変更時
 */
window.addEventListener('resize', () => {

  const newItemsPerPage = getItemsPerPage();

  // 件数が変わらなければ何もしない
  if (newItemsPerPage === ITEMS_PER_PAGE) {
    return;
  }

  ITEMS_PER_PAGE = newItemsPerPage;

  // ページ数が減った場合の対策
  const totalPages = Math.ceil(projects.length / ITEMS_PER_PAGE);

  if (currentPage > totalPages) {
    currentPage = totalPages;
  }

  if (currentPage < 1) {
    currentPage = 1;
  }

  renderProjects(currentPage);
  renderPagination();

});