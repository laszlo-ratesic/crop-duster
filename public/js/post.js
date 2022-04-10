async function postFormHandler(event) {
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
    const response = await fetch('/api/posts', {
      method: 'POST',
      body: JSON.stringify({
        post_title,
        post_subtitle,
        post_text,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.reload();
    } else {
      alert(response.statusText);
    }
  }
}

document
  .querySelector('.post-form')
  .addEventListener('submit', postFormHandler);

// doodle file logic
  document.getElementById('buttonid').addEventListener('click', openDialog);

function openDialog() {
  document.getElementById('fileid').click();
}