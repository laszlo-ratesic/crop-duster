async function logout() {
  const response = await fetch('/api/users/logout', {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    console.log('Successfully logged out!');
  } else {
    alert(response.statusText);
  }
}

logout();
