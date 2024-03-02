const renderBtn = document.querySelector('.btn');
renderBtn.addEventListener('click', request, {once: true});

function request() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://andreyhunter.github.io/data.json');

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const data = JSON.parse(xhr.response);
            createCard(data, '.list')
            initializeEventListeners();
        }
    };

    xhr.send();
}

function createCard(data, selector) {
    const element = document.querySelector(selector);

    data.people.forEach(person => {
        const listItem = document.createElement('li');
        listItem.classList.add('list__item');

        listItem.innerHTML = `
            <div class="list__item-head">
                <img src="${person.photo}" alt="${person.city}" class="list__item-image">
                <h3 class="list__item-title">${person.city}</h3>
            </div>
            <div class="list__item-body">
                <p class="list__item-desc">${person.desc}</p>
                <span class="list__item-span"></span>
            </div>
        `;

        element.appendChild(listItem);
    });
}

function initializeEventListeners() {
    const elements = document.querySelectorAll('.list__item-head');

    elements.forEach(item => item.addEventListener('click', showElement));
}

let lastActive = null;

function resetAllExceptCurrent(currentElement) {
    document.querySelectorAll('.list__item-body').forEach(wrapper => {
        if (wrapper !== currentElement.nextElementSibling) {
            wrapper.style.height = null;
            wrapper.style.padding = '';
        }
    });

    if (lastActive && lastActive !== currentElement) {
        toggleElementClasses(lastActive, false);
    }
}

function toggleElementClasses(element, toggle = true) {
    const image = element.querySelector('.list__item-image');
    const title = element.querySelector('.list__item-title');
    if (image && title) {
        const method = toggle ? 'toggle' : 'remove';
        image.classList[method]('filter');
        title.classList[method]('opacity');
    }
}

function showElement() {
    const content = this.nextElementSibling;
    const isAlreadyActive = lastActive === this && content.style.height;

    resetAllExceptCurrent(this);

    if (isAlreadyActive) {
        content.style.height = null;
        content.style.padding = '';
        toggleElementClasses(this, false);
        lastActive = null;
    } else {
        if (!isAlreadyActive) toggleElementClasses(this);
        lastActive = this;
        content.style.height = `${content.scrollHeight + 60}px`;
        content.style.padding = '20px';
    }
}