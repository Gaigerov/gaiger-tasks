import './tooltip.css';

const tooltipContainerList = document.querySelectorAll('.v-tooltip');

tooltipContainerList.forEach(container => {
    const tooltipWindow = container.querySelector('.v-tooltip__window');

    container.addEventListener('click', () => {
        tooltipWindow.style.display = tooltipWindow.style.display === 'block' ? 'none' : 'block';
    });
});
