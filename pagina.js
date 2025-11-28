// Dados de exemplo para as Trilhas
const trilhasData = [
    {
        titulo: "Fundamentos de Programação",
        status: "Em Progresso",
        progresso: 65,
        proximo: "Módulo 5: Estruturas de Dados",
        tempo: "15 horas restantes"
    },
    {
        titulo: "Introdução à Inteligência Artificial",
        status: "Pendente",
        progresso: 0,
        proximo: "Módulo 1: Conceitos Básicos",
        tempo: "30 horas totais"
    },
    {
        titulo: "Design de Experiência (UX/UI)",
        status: "Concluída",
        progresso: 100,
        proximo: "Nenhum",
        tempo: "Concluída!"
    }
];

document.addEventListener('DOMContentLoaded', () => {
    // 1. Funções de Navegação (Troca de Seções)
    const navItems = document.querySelectorAll('.nav-item[data-section]');
    const contentSections = document.querySelectorAll('.content-section');

    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = item.getAttribute('data-section');

            // Remove 'active' de todos os itens e secções
            navItems.forEach(n => n.classList.remove('active'));
            contentSections.forEach(s => s.classList.remove('active'));

            // Adiciona 'active' ao item e secção clicados
            item.classList.add('active');
            document.getElementById(targetId).classList.add('active');
        });
    });

    // 2. Gerar Cartões de Trilhas Dinamicamente
    const trilhasList = document.getElementById('trilhasList');

    trilhasData.forEach(trilha => {
        const card = document.createElement('div');
        card.classList.add('trilha-card');

        let statusClass = '';
        if (trilha.status === 'Em Progresso') statusClass = 'primary';
        else if (trilha.status === 'Concluída') statusClass = 'success';
        else statusClass = 'secondary';
        
        // Template do cartão com base nos dados
        card.innerHTML = `
            <h3>${trilha.titulo}</h3>
            <div class="trilha-progress">Status: <span style="font-weight: bold; color: var(--${statusClass}-color);">${trilha.status}</span></div>
            <div class="progress-bar-container" style="height: 15px;">
                <div class="progress-bar" style="width: ${trilha.progresso}%;"></div>
                <span class="progress-text" style="color: ${trilha.progresso < 15 ? 'var(--text-color)' : 'white'}; left: ${trilha.progresso < 15 ? 'auto' : '10px'}; right: ${trilha.progresso < 15 ? '10px' : 'auto'};">${trilha.progresso}%</span>
            </div>
            <p><strong>Próximo:</strong> ${trilha.proximo}</p>
            <p><strong>Duração:</strong> ${trilha.tempo}</p>
            <button class="btn primary" style="margin-top: 10px;">${trilha.progresso < 100 ? 'Continuar' : 'Ver Certificado'}</button>
        `;
        
        trilhasList.appendChild(card);
    });
});