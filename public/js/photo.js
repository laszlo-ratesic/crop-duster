async function photoFormHandler(event) {
  event.preventDefault();

  const post_title = document
    .querySelector('input[name="post-title"]')
    .value.trim();
  const post_subtitle = document
    .querySelector('input[name="post-subtitle"]')
    .value.trim();
  const post_text = document
    .querySelector('textarea[name="post-text"]')
    .value.trim();


  if (post_text) {
    let apiUrl;
    if (!post_subtitle) {
      apiUrl =
        'https://api.unsplash.com/search/photos?client_id=' +
        process.env.API_KEY +
        '&query=' +
        post_title;
    } else {
      apiUrl =
        'https://api.unsplash.com/search/photos?client_id=' +
        process.env.API_KEY +
        '&query=' +
        post_subtitle;
    }
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept-Version': 'v1'
      },
    });

    if (response.ok) {
      document.location.redirect(apiUrl);
    } else {
      alert(response.statusText);
    }
  }
}

document
  .querySelector('#add-photo-btn')
  .addEventListener('click', photoFormHandler);
