// Menu data structure
var menuLinks = [
  {text: 'about', href: '/about'},
  {text: 'catalog', href: '#', subLinks: [
    {text: 'all', href: '/catalog/all'},
    {text: 'top selling', href: '/catalog/top'},
    {text: 'search', href: '/catalog/search'},
  ]},
  {text: 'orders', href: '#' , subLinks: [
    {text: 'new', href: '/orders/new'},
    {text: 'pending', href: '/orders/pending'},
    {text: 'history', href: '/orders/history'},
  ]},
  {text: 'account', href: '#', subLinks: [
    {text: 'profile', href: '/account/profile'},
    {text: 'sign out', href: '/account/signout'},
  ]},
];

document.addEventListener('DOMContentLoaded', function() {
  // Select and cache the <main> element in a variable named mainEl
  const mainEl = document.querySelector('main');

  // Set the background color of mainEl to the value stored in the --main-bg CSS custom property
  mainEl.style.backgroundColor = 'var(--main-bg)';

  // Set the content of mainEl to <h1>DOM Manipulation</h1>
  mainEl.innerHTML = '<h1>DOM Manipulation</h1>';

  // Add a class of flex-ctr to mainEl
  mainEl.classList.add('flex-ctr');

  // Select and cache the <nav id="top-menu"> element in a variable named topMenuEl.
  const topMenuEl = document.querySelector('#top-menu');

  // Set the height of the topMenuEl element to be 100%.
  topMenuEl.style.height = '100%';

  // Set the background color of topMenuEl to the value stored in the --top-menu-bg CSS custom property.
  topMenuEl.style.backgroundColor = 'var(--top-menu-bg)';

  // Add a class of flex-around to topMenuEl.
  topMenuEl.classList.add('flex-around');

  // Iterate over the entire menuLinks array and for each "link" object:
  // Create an <a> element.
  // On the new element, add an href attribute with its value set to the href property of the "link" object.
  // Set the new element's content to the value of the text property of the "link" object.
  // Append the new element to the topMenuEl element.
  menuLinks.forEach(link => {
      const newLink = document.createElement('a');
      newLink.setAttribute('href', link.href);
      newLink.innerHTML = link.text;
      topMenuEl.appendChild(newLink);
  });

  // Select and cache the <nav id="sub-menu"> element in a variable named subMenuEl.
  const subMenuEl = document.querySelector('#sub-menu');

  // Set the height subMenuEl element to be "100%".
  subMenuEl.style.height = '100%';

  // Set the background color of subMenuEl to the value stored in the --sub-menu-bg CSS custom property.
  subMenuEl.style.backgroundColor = 'var(--sub-menu-bg)';

  // Add a class of flex-around to subMenuEl.
  subMenuEl.classList.add('flex-around');

  // Select and cache the all of the <a> elements inside of topMenuEl in a variable named topMenuLinks.
  const topMenuLinks = topMenuEl.querySelectorAll('a');

  // Attach a delegated 'click' event listener to topMenuEl.
  topMenuEl.addEventListener('click', (event) => {
      event.preventDefault();
      // Check if the clicked element is an <a> element
      if (!event.target.matches('a')) {
          return; // Exit the function if the clicked element is not an <a> element
      }
      // Log the content of the <a> element to verify the handler is working
      console.log(event.target.textContent);

      // Remove 'active' class from all <a> elements inside topMenuEl
      topMenuLinks.forEach(link => {
          link.classList.remove('active');
      });

      // Add the active class to the <a> element that was clicked,
      // unless it was already active, in which case it should remove it.
      event.target.classList.add('active');

      // Get the clicked link object from menuLinks
      const clickedLink = menuLinks.find(link => link.text === event.target.textContent);

      // If the clicked <a> element's "link" object within menuLinks has a subLinks property
      if (clickedLink.subLinks) {
          subMenuEl.style.top = '100%'; // Set the CSS top property of subMenuEl to 100%
          buildSubmenu(clickedLink.subLinks); // Call buildSubmenu function and pass the array of subLinks
      } else {
          subMenuEl.style.top = '0%'; // Set the CSS top property of subMenuEl to 0%
          subMenuEl.innerHTML = ''; // Clear the current contents of subMenuEl
      }
  });

  // Attach a delegated 'click' event listener to subMenuEl.
  subMenuEl.addEventListener('click', (event) => {
      event.preventDefault();
      // Check if the clicked element is an <a> element
      if (!event.target.matches('a')) {
          return; // Exit the function if the clicked element is not an <a> element
      }
      // Log the content of the <a> element to verify the handler is working
      console.log(event.target.textContent);
      // Set the CSS top property of subMenuEl to 0.
      subMenuEl.style.top = '0%';

      // Remove 'active' class from all <a> elements inside topMenuEl
      topMenuLinks.forEach(link => {
          link.classList.remove('active');
      });

      // Update the contents of mainEl within an <h1> to the contents of the <a> element clicked within subMenuEl.
      mainEl.innerHTML = `<h1>${event.target.textContent}</h1>`;

      // If the ABOUT link is clicked, an <h1>About</h1> should be displayed.
      if (event.target.textContent === "about") {
          mainEl.innerHTML = '<h1>About</h1>';
      }
  });

  // Function to build submenu
  const buildSubmenu = (subLinks) => {
      // Clear the current contents of subMenuEl
      subMenuEl.innerHTML = '';

      // Iterate over the subLinks array and build submenu
      subLinks.forEach(sublink => {
          const newSubLink = document.createElement('a');
          newSubLink.setAttribute('href', sublink.href);
          newSubLink.innerHTML = sublink.text;
          subMenuEl.appendChild(newSubLink);
      });
  }
});
