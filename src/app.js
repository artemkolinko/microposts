import http from './http';
import ui from './ui';
import './assets/css/style.css';

// CORS ??
// Proxy
const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
const apiUrl =
  'https://my-json-server.typicode.com/artemkolinko/microposts-api/';
// const apiUrl = 'http://localhost:3000/';

document.addEventListener('DOMContentLoaded', getPosts);

// Add post listener
ui.postSubmit.addEventListener('click', submitPost);

// Delete post listener
ui.posts.addEventListener('click', deletePost);

// Listen for edit state
ui.posts.addEventListener('click', enableEdit);

// Listen for cancel
// Если элемента может не существовать мы делаем делегирование события на родителя (event delegation)
ui.postForm.addEventListener('click', cancelEdit);

// Get posts controller
function getPosts() {
  http
    .get(proxyUrl + apiUrl + 'posts')
    .then((data) => ui.showPosts(data))
    .catch((err) => console.log(err));
}

// Submit post controller
function submitPost() {
  const title = ui.title.value.trim();
  const body = ui.body.value.trim();
  const id = ui.idInput.value;

  const post = {
    title,
    body,
  };

  // Validate input
  if (title && body) {
    if (id) {
      // Edit post
      http
        .put(apiUrl + `posts/${id}`, post)
        .then((data) => {
          ui.showAlert('Post updated', 'alert alert-success');

          ui.changeFormState('add');

          getPosts();
        })
        .catch((err) => console.log(err));
    } else {
      // Create post
      http
        .post(apiUrl + 'posts', post)
        .then((data) => {
          ui.clearInput();

          ui.showAlert(
            `Post added ${JSON.stringify(data)}`,
            'alert alert-success'
          );

          getPosts();
        })
        .catch((err) => console.log(err));
    }
  } else {
    ui.showAlert('Please enter Title and Post', 'alert alert-warning');
  }
}

// Delete post controller
function deletePost(event) {
  event.preventDefault();

  if (event.target.parentElement.classList.contains('delete')) {
    const id = event.target.parentElement.dataset.id;

    if (confirm('Are you sure?')) {
      http
        .delete(apiUrl + `posts/${id}`)
        .then((data) => {
          ui.showAlert('Post deleted', 'alert alert-success');

          getPosts();
        })
        .catch((err) => console.log(err));
    }
  }
}

// Enable edit post state controller
function enableEdit(e) {
  e.preventDefault();
  if (e.target.parentElement.classList.contains('edit')) {
    const id = e.target.parentElement.dataset.id;
    const body = e.target.parentElement.previousElementSibling.textContent;
    const title =
      e.target.parentElement.previousElementSibling.previousElementSibling
        .textContent;

    const data = { id, title, body };

    // Fill form with current post
    ui.fillForm(data);

    // console.log(title, body);

    // if (confirm('Are you sure?')) {
    //   http
    //     .delete(`http://localhost:3000/posts/${id}`)
    //     .then((data) => {
    //       ui.showAlert('Post deleted', 'alert alert-success');

    //       getPosts();
    //     })
    //     .catch((err) => console.log(err));
    // }
  }
}

// Cencel edit state
function cancelEdit(e) {
  if (e.target.classList.contains('post-cancel')) {
    ui.changeFormState('add');
  }
}
