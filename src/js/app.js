// Main App Initialization
// Event listeners
document.getElementById('adifFiles').addEventListener('change', handleFiles);
document.querySelectorAll('input[type="date"], input[type="time"], input[type="text"], select').forEach(input => {
    input.addEventListener('input', updateFilteredPreview);
});

// Timeline slider event listeners
document.getElementById('sliderMin').addEventListener('input', updateSliderSelection);
document.getElementById('sliderMax').addEventListener('input', updateSliderSelection);

// Initialize with default dates
window.onload = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    const isoDate = `${yyyy}-${mm}-${dd}`;

    document.getElementById('fromDate').value = isoDate;
    document.getElementById('toDate').value = isoDate;
    document.getElementById('fromTime').value = '00:00';
    document.getElementById('toTime').value = '23:59';
};
