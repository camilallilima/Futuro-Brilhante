document.addEventListener('DOMContentLoaded', () => {

    // ---------------------------------
    // 1. SCROLL SUAVE (LOGO e NAV)
    // Garante que o clique na logo e nos links leve à seção com animação suave.
    // ---------------------------------
    const scrollLinks = document.querySelectorAll('a[href^="#"]');

    scrollLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();


            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Altura do header fixo (ajuste se mudar o padding do header)
                const headerHeight = 75;
                const offsetTop = targetElement.offsetTop - headerHeight;

                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Aguarda o carregamento completo do documento
    document.addEventListener('DOMContentLoaded', function () {
        // 1. Pega o botão hambúrguer pelo ID
        const toggleButton = document.getElementById('menu-mobile-toggle');
        // 2. Pega a lista de links (o menu) pelo ID
        const navLinks = document.getElementById('nav-links-menu');

        // 3. Adiciona um evento de clique ao botão
        toggleButton.addEventListener('click', function () {
            // 4. Alterna a classe 'active' na lista de links
            // Se a classe existir, remove. Se não existir, adiciona.
            navLinks.classList.toggle('active');

            // (Opcional) Trocar o ícone do hambúrguer para um "X"
            // toggleButton.querySelector('i').classList.toggle('fa-bars');
            // toggleButton.querySelector('i').classList.toggle('fa-times');
        });

        // 5. Opcional: Fechar o menu ao clicar em um link (para navegação em seção)
        const navItems = document.querySelectorAll('.nav-links .nav-item');
        navItems.forEach(item => {
            item.addEventListener('click', function () {
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                }
            });
        });
    });

    // ---------------------------------
    // 2. CARROSSEL FUNCIONAL BÁSICO
    // ---------------------------------
    const track = document.querySelector('.carousel-track');
    const slides = Array.from(track.children);
    const nextButton = document.querySelector('.carousel-button.next');
    const prevButton = document.querySelector('.carousel-button.prev');
    let slideIndex = 0;



    // Função para calcular a largura de um slide
    const getSlideWidth = () => slides[0] ? slides[0].getBoundingClientRect().width : 0;

    // Posiciona os slides lado a lado
    const setSlidePositions = () => {
        const slideWidth = getSlideWidth();
        slides.forEach((slide, index) => {
            slide.style.left = slideWidth * index + 'px';
        });
    };

    // Função para mover o track (carrossel)
    const moveToSlide = (index) => {
        const slideWidth = getSlideWidth();
        if (slides[index]) {
            track.style.transform = 'translateX(-' + slideWidth * index + 'px)';
            slideIndex = index;
        }
    };


    // Inicializa a posição dos slides
    setSlidePositions();

    // Evento de clique - Próximo slide
    nextButton.addEventListener('click', () => {
        let targetIndex = slideIndex + 1;
        if (targetIndex >= slides.length) {
            targetIndex = 0; // Loop para o primeiro slide
        }
        moveToSlide(targetIndex);
    });

    // Evento de clique - Slide anterior
    prevButton.addEventListener('click', () => {
        let targetIndex = slideIndex - 1;
        if (targetIndex < 0) {
            targetIndex = slides.length - 1; // Loop para o último slide
        }
        moveToSlide(targetIndex);
    });

    // Corrige a largura dos slides ao redimensionar a janela
    window.addEventListener('resize', () => {
        setSlidePositions();
        moveToSlide(slideIndex); // Garante que permaneça no slide atual após o resize
    });


    // ---------------------------------
    // 3. ANIMAÇÃO DE SCROLL (Intersection Observer)
    // Faz as seções aparecerem com animação ao entrar na tela.
    // ---------------------------------
    const sections = document.querySelectorAll('.content-section');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1 // Ativa quando 10% da seção está visível
    });

    sections.forEach(section => {
        // Ignora a seção "home" pois já tem a classe 'visible' no HTML para aparecer imediatamente.
        if (!section.classList.contains('visible')) {
            observer.observe(section);
        }
    });
});

