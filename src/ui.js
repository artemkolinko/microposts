class UI {
  constructor() {
    this.postForm = document.querySelector('#card-form');
    this.posts = document.querySelector('#posts');
    this.title = document.querySelector('#title');
    this.body = document.querySelector('#body');
    this.idInput = document.querySelector('#id');
    this.postSubmit = document.querySelector('#postSubmit');
    this.forState = 'add';
  }

  // Show all posts
  showPosts(posts) {
    let html = '';

    posts.forEach((post) => {
      html += `
      <div class="card mb-3">
        <div class="card-body">
          <h4 class="card-title">${post.title}</h4>
          <p class="card-text">${post.body}</p>
          <a href="#" class="card-link edit" data-id="${post.id}">
            <i class="fa fa-pencil"></i>
          </a>
          <a href="#" class="card-link delete" data-id="${post.id}">
            <i class="fa fa-remove"></i>
          </a>
        </div>
      </div>
      `;
    });

    this.posts.innerHTML = html;
  }

  // Show alert message
  showAlert(message, className) {
    this.clearAlert();

    const div = `<div class="${className}">${message}</div>`;

    this.posts.insertAdjacentHTML('beforebegin', div);

    // Set timeout
    setTimeout(() => {
      this.clearAlert();
    }, 2000);
  }

  // Clear alert message
  clearAlert() {
    const currentAlert = document.querySelector('.alert');
    if (currentAlert) {
      currentAlert.remove();
    }
  }

  // Clear input fields
  clearInput() {
    this.title.value = '';
    this.body.value = '';
  }

  // Clear id input
  clearIdInput() {
    this.idInput.value = '';
  }

  // Fill form to edit
  fillForm({ id, title, body }) {
    this.title.value = title;
    this.body.value = body;
    this.idInput.value = id;

    // Change to Edit State
    this.changeFormState('edit');

    // ui.postSubmit.remove();

    // Scroll page to top
    window.scrollTo(0, 0);
  }

  // Change form state
  changeFormState(type) {
    if (type === 'edit') {
      // change submit btn to edit
      this.postSubmit.textContent = 'Edit';
      this.postSubmit.className = 'post-submit btn btn-warning btn-block';

      // Add cancel btn
      const btnCancel = document.createElement('button');
      btnCancel.className = 'post-cancel btn btn-light btn-block mt-3';
      btnCancel.appendChild(document.createTextNode('Cancel'));

      // Вставляем смежный элемент в форму (before closing tag) or elem.insertBefore()
      document
        .querySelector('#card-form')
        .insertAdjacentElement('beforeend', btnCancel);
    } else {
      // change submit btn back
      this.postSubmit.textContent = 'Post';
      this.postSubmit.className = 'btn btn-primary btn-block';
      // Remove cancel btn
      if (document.querySelector('.post-cancel')) {
        document.querySelector('.post-cancel').remove();
      }

      // Clear id
      this.clearIdInput();

      // Clear input
      this.clearInput();
    }
  }
}

export default new UI();
