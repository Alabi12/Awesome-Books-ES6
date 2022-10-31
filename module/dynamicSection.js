const dynamicSection = () => {
  const navLinks = document.querySelector('.nav-links');
  const allSections = document.querySelectorAll('section');

  navLinks.addEventListener('click', (e) => {
    e.preventDefault();
    const clickedLink = e.target.closest('.nav-link a');
    if (!clickedLink) return;

    const id = clickedLink.getAttribute('href').replace('#', '');

    [...allSections].forEach((sec) => {
      sec.classList.add('hide');
    });

    const elementToShow = document.getElementById(id);
    elementToShow.classList.remove('hide');
  });
};

export default dynamicSection;
