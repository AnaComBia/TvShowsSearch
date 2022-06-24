const handleSearch = async (evt) => {
  evt.preventDefault();

  const messageBox = document.getElementById('message');
  const showList = document.getElementById('shows');

  messageBox.innerHTML = '';
  showList.innerHTML = '';

  const textToSearch = document.getElementById('query').value;

  const url = `https://api.tvmaze.com/search/shows?q=${textToSearch}`;

  const response = await fetch(url);
  if (!response.ok) {
    messageBox.innerHTML = 'Failed do fetch results.';
    return;
  }

  const showsFetched = await response.json();

  if (showsFetched.length === 0) {
    messageBox.innerHTML = 'Not found.';
    return;
  }

  showsFetched.forEach((item) => {
    const showName = item?.show?.name;
    const showPictureUrl = item?.show?.image?.medium || '';

    showList.insertAdjacentHTML(
      'beforeend',
      `
      <li>
        <img class="poster" src="${showPictureUrl}" />
        <span class="show-name">${showName}</span>
      </li>
    `
    );
  });
};

document.addEventListener('DOMContentLoaded', () => {
  document
    .querySelector('#search-form')
    .addEventListener('submit', handleSearch);
});
