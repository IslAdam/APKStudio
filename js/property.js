const properties = {
    1: {
        name: 'Modern Classic',
        location: 'Частный дом / 240 м2',
        area: '240 м2',
        style: 'Modern Classic',
        stage: 'Под ключ',
        images: [
            'assets/images/main/1.jpeg',
            'assets/images/main/3.jpeg',
            'assets/images/main/6.jpg'
        ],
        description: 'Проект частного дома, собранный на контрасте строгой архитектурной логики и теплой интерьерной атмосферы. Пространство выстроено вокруг ясных осей, комфортных маршрутов и спокойной палитры материалов.',
        amenities: ['Парадная гостиная', 'Кухня-остров', 'Мастер-спальня', 'Система хранения', 'Световой сценарий', 'Авторский надзор'],
        info: {
            'Тип объекта': 'Частный дом',
            'Площадь': '240 м2',
            'Формат работы': 'Концепция, документация, сопровождение',
            'Основной акцент': 'Классическая симметрия и современная функциональность'
        }
    },
    2: {
        name: 'Ethno Modern',
        location: 'Квартира / 118 м2',
        area: '118 м2',
        style: 'Ethno Modern',
        stage: 'Комплектация',
        images: [
            'assets/images/main/3.jpeg',
            'assets/images/main/4.jpg',
            'assets/images/main/2.jpg'
        ],
        description: 'Интерьер квартиры, построенный на сочетании современной геометрии и натуральных фактур. Пространство остается визуально спокойным, но при этом насыщенным за счет света, дерева, текстиля и точной ритмики деталей.',
        amenities: ['Кухня-гостиная', 'Натуральное дерево', 'Мягкий свет', 'Скрытое хранение', 'Локальные акценты', 'Подбор материалов'],
        info: {
            'Тип объекта': 'Квартира',
            'Площадь': '118 м2',
            'Формат работы': 'Дизайн-проект и комплектация',
            'Основной акцент': 'Тактильные материалы и жилая функциональность'
        }
    },
    3: {
        name: 'Minimalism',
        location: 'Коммерческий интерьер',
        area: 'Коммерческий объект',
        style: 'Minimalism',
        stage: 'Рабочая документация',
        images: [
            'assets/images/main/6.jpg',
            'assets/images/main/5.jpg',
            'assets/images/main/4.jpg'
        ],
        description: 'Коммерческое пространство с минималистичной подачей, где каждая линия подчинена навигации, образу бренда и чистому пользовательскому опыту. Основной акцент сделан на визуальной строгости и практичности среды.',
        amenities: ['Навигационная логика', 'Чистая геометрия', 'Бренд-среда', 'Сценарный свет', 'Зонирование', 'Коммерческая подача'],
        info: {
            'Тип объекта': 'Коммерческий интерьер',
            'Площадь': 'Индивидуально',
            'Формат работы': 'Концепция и рабочая документация',
            'Основной акцент': 'Минималистичный образ и удобная эксплуатация'
        }
    }
};

function getPropertyId() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id');
}

function loadPropertyInfo() {
    const propertyId = getPropertyId();
    const property = properties[propertyId];

    if (!property) {
        document.getElementById('propertyContent').innerHTML = '<p>Проект не найден</p>';
        document.getElementById('fullDescription').textContent = 'Информация по проекту недоступна.';
        return;
    }

    document.title = property.name + ' - APK Studio';

    const content = `
        <h2>${property.name}</h2>
        <p class="location property-location">${property.location}</p>
        <div class="property-details" style="margin-bottom: 1.5rem;">
            <span>${property.area}</span>
            <span>${property.style}</span>
            <span>${property.stage}</span>
        </div>
        <button class="btn btn-secondary" onclick="window.location.href='contact.html'">Обсудить похожий проект</button>
    `;

    document.getElementById('propertyContent').innerHTML = content;

    const imageUrls = property.images;
    const mainImage = document.getElementById('mainImage');
    const mainImageLink = document.getElementById('mainImageLink');
    const galleryThumbs = document.getElementById('galleryThumbs');
    const lightbox = document.getElementById('imageLightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxClose = document.getElementById('lightboxClose');
    const lightboxPrev = document.getElementById('lightboxPrev');
    const lightboxNext = document.getElementById('lightboxNext');
    let currentImageIndex = 0;

    function openLightbox(index) {
        currentImageIndex = index;
        const src = imageUrls[currentImageIndex];
        lightboxImage.src = src;
        lightboxImage.alt = property.name + ' — ' + (currentImageIndex + 1);
        lightbox.classList.add('active');
        lightbox.setAttribute('aria-hidden', 'false');
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        lightbox.setAttribute('aria-hidden', 'true');
        lightboxImage.src = '';
    }

    function showPreviousImage() {
        currentImageIndex = (currentImageIndex - 1 + imageUrls.length) % imageUrls.length;
        openLightbox(currentImageIndex);
    }

    function showNextImage() {
        currentImageIndex = (currentImageIndex + 1) % imageUrls.length;
        openLightbox(currentImageIndex);
    }

    mainImage.src = imageUrls[0];
    mainImage.alt = property.name;
    mainImageLink.href = imageUrls[0];

    galleryThumbs.innerHTML = imageUrls.map((src, index) => `<img class="thumb" src="${src}" alt="Миниатюра ${index + 1} - ${property.name}" data-src="${src}" />`).join('');

    galleryThumbs.querySelectorAll('.thumb').forEach((thumb, index) => {
        thumb.addEventListener('click', () => {
            const selectedSrc = thumb.dataset.src;
            mainImage.src = selectedSrc;
            mainImageLink.href = selectedSrc;
            currentImageIndex = index;
        });
    });

    mainImageLink.addEventListener('click', function(event) {
        event.preventDefault();
        openLightbox(currentImageIndex);
    });

    lightboxPrev.addEventListener('click', function(event) {
        event.stopPropagation();
        showPreviousImage();
    });

    lightboxNext.addEventListener('click', function(event) {
        event.stopPropagation();
        showNextImage();
    });

    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (event) => {
        if (event.target === lightbox) {
            closeLightbox();
        }
    });

    document.addEventListener('keydown', (event) => {
        if (!lightbox.classList.contains('active')) {
            return;
        }

        if (event.key === 'Escape') {
            closeLightbox();
        } else if (event.key === 'ArrowLeft') {
            showPreviousImage();
        } else if (event.key === 'ArrowRight') {
            showNextImage();
        }
    });

    document.getElementById('fullDescription').textContent = property.description;
    document.getElementById('amenities').innerHTML = property.amenities.map((amenity) => `<div class="amenity">${amenity}</div>`).join('');
    document.getElementById('infoGrid').innerHTML = Object.entries(property.info).map(([key, value]) => `
        <div class="info-item">
            <strong>${key}</strong>
            ${value}
        </div>
    `).join('');
}

document.addEventListener('DOMContentLoaded', function() {
    loadPropertyInfo();
});
