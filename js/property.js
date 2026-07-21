// Данные об объектах недвижимости
const properties = {
    1: {
        name: 'Винтаж',
        location: 'За городом, 15 км',
        price: 4500,
        guests: 4,
        bedrooms: 2,
        bathrooms: 2,
        images: ['assets/image/main.jpg', 'assets/image/main.jpg', 'assets/image/main.jpg'],
        description: 'Красивый деревянный коттедж с камином и террасой. Идеально для семьи. Коттедж расположен в тихом лесном массиве, вдали от суеты города. Он идеален для семейного отдыха, медового месяца или корпоративного мероприятия.',
        amenities: ['Камин', 'Терраса', 'Кухня', 'WiFi', 'Парковка', 'Лесной участок', 'Уличное освещение', 'Барбекю'],
        info: {
            'Минимальный срок': '1 ночь',
            'Приём гостей': 'Весь год',
        }
    },
    2: {
        name: 'Классика',
        location: 'Центр города, 3 км',
        price: 3200,
        guests: 2,
        bedrooms: 1,
        bathrooms: 1,
        images: ['assets/image/main.jpg', 'assets/image/main.jpg', 'assets/image/main.jpg'],
        description: 'Современный апартамент с панорамными окнами и современным интерьером. Расположен в самом центре города, рядом со всеми достопримечательностями, ресторанами и магазинами. Идеален для деловых поездок и городского отдыха.',
        amenities: ['Кондиционер', 'Холодильник', 'Микроволновка', 'Телевизор', 'WiFi', 'Интернет'],
        info: {
            'Минимальный срок': '1 ночь',
            'Приём гостей': 'Весь год',
        }
    },
    3: {
        name: 'Минимализм',
        location: 'Озерный край, 45 км',
        price: 8900,
        guests: 6,
        bedrooms: 3,
        bathrooms: 3,
        images: ['assets/image/main.jpg', 'assets/image/main.jpg', 'assets/image/main.jpg'],
        description: 'Роскошная вилла с собственным пляжем, джакузи и прекрасным видом на озеро. Эта элегантная вилла предоставляет все необходимое для идеального отдыха. Жилая площадь 200 м², территория 500 м². Вилла оснащена всем необходимым для комфортного проживания большой семьи или группы друзей.',
        amenities: ['Джакузи', 'Сауна', 'Бассейн', 'Кухня премиум', 'WiFi', 'Климат-контроль', 'Домашний кинотеатр', 'Собственный пляж', 'Терраса', 'Гаража'],
        info: {
            'Минимальный срок': '2 ночи',
            'Приём гостей': 'Весь год',
        }
    }
};

// Получить ID из URL
function getPropertyId() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id');
}

// Загрузить информацию о свойстве
function loadPropertyInfo() {
    const propertyId = getPropertyId();
    const property = properties[propertyId];

    if (!property) {
        document.getElementById('propertyContent').innerHTML = '<p>Объект не найден</p>';
        return;
    }

    // Установить основную информацию
    document.title = property.name + ' - Caspian Villas';

    const content = `
        <h2>${property.name}</h2>
        <p class="location" style="margin-bottom: 1rem; color: #666;">${property.location}</p>
        
        <div class="property-details" style="margin-bottom: 1.5rem;">
            <span>• ${property.guests} гостей</span>
            <span>• ${property.bedrooms} спальни</span>
            <span>• ${property.bathrooms} ванные</span>
        </div>

        <div class="price-section" style="margin-bottom: 2rem;">
            <div style="display: flex; align-items: baseline; gap: 0.5rem;">
                <span class="price">${property.price.toLocaleString()} ₽</span>
                <span class="per-night">за ночь</span>
            </div>
        </div>

        <button class="btn btn-secondary" onclick="window.open('https://forms.yandex.ru/u/6a5a3840068ff06d92fe2f1a', '_blank', 'noopener')">Забронировать</button>
    `;

    document.getElementById('propertyContent').innerHTML = content;

    const imageUrls = property.images || ['assets/image/main.jpg'];
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

    galleryThumbs.innerHTML = imageUrls.map((src, index) => 
        `<img class="thumb" src="${src}" alt="Миниатюра ${index + 1} - ${property.name}" data-src="${src}" />`
    ).join('');

    galleryThumbs.querySelectorAll('.thumb').forEach((thumb, index) => {
        thumb.addEventListener('click', () => {
            const selectedSrc = thumb.dataset.src;
            mainImage.src = selectedSrc;
            mainImageLink.href = selectedSrc;
            openLightbox(index);
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

    // Установить описание
    document.getElementById('fullDescription').textContent = property.description;

    // Загрузить удобства
    const amenitiesHtml = property.amenities.map(amenity => 
        `<div class="amenity">${amenity}</div>`
    ).join('');
    document.getElementById('amenities').innerHTML = amenitiesHtml;

    // Загрузить информацию
    const infoHtml = Object.entries(property.info).map(([key, value]) => 
        `<div class="info-item">
            <strong>${key}</strong>
            ${value}
        </div>`
    ).join('');
    document.getElementById('infoGrid').innerHTML = infoHtml;
}

// Загрузить информацию при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    loadPropertyInfo();
});
