// Timeline Module
function setupTimeline() {
    if (allEntries.length === 0) return;

    // Sort entries by date and time
    timelineData.sortedEntries = [...allEntries].sort((a, b) => {
        const dateA = parseInt(a.date + a.time.padEnd(4, '0'));
        const dateB = parseInt(b.date + b.time.padEnd(4, '0'));
        return dateA - dateB;
    });

    timelineData.minDate = timelineData.sortedEntries[0].date;
    timelineData.maxDate = timelineData.sortedEntries[timelineData.sortedEntries.length - 1].date;

    // Update timeline display
    document.getElementById('timelineStart').textContent = formatDate(timelineData.minDate);
    document.getElementById('timelineEnd').textContent = formatDate(timelineData.maxDate);
    document.getElementById('timelineSection').classList.remove('hidden');

    // Set slider to today's range by default (if today exists in data)
    const today = new Date();
    const todayStr = today.getFullYear().toString() +
        (today.getMonth() + 1).toString().padStart(2, '0') +
        today.getDate().toString().padStart(2, '0');

    // Find today's position in the timeline
    let todayStartIndex = -1;
    let todayEndIndex = -1;

    for (let i = 0; i < timelineData.sortedEntries.length; i++) {
        if (timelineData.sortedEntries[i].date === todayStr) {
            if (todayStartIndex === -1) todayStartIndex = i;
            todayEndIndex = i;
        }
    }

    if (todayStartIndex >= 0) {
        // Today exists in data - set slider to today's range
        const minPercent = (todayStartIndex / (timelineData.sortedEntries.length - 1)) * 100;
        const maxPercent = (todayEndIndex / (timelineData.sortedEntries.length - 1)) * 100;
        document.getElementById('sliderMin').value = minPercent;
        document.getElementById('sliderMax').value = maxPercent;
    } else {
        // Today doesn't exist - set to full range but keep today in date inputs
        document.getElementById('sliderMin').value = 0;
        document.getElementById('sliderMax').value = 100;
    }

    updateSliderSelection();
}

function updateSliderSelection() {
    if (timelineData.sortedEntries.length === 0 || isSliderUpdating) return;

    const minSlider = document.getElementById('sliderMin');
    const maxSlider = document.getElementById('sliderMax');
    const sliderTrack = document.getElementById('sliderTrack');

    let minVal = parseInt(minSlider.value);
    let maxVal = parseInt(maxSlider.value);

    // Ensure min is never greater than max
    if (minVal > maxVal) {
        if (event.target === minSlider) {
            maxVal = minVal;
            maxSlider.value = maxVal;
        } else {
            minVal = maxVal;
            minSlider.value = minVal;
        }
    }

    // Update track visual
    const minPercent = minVal;
    const maxPercent = maxVal;
    sliderTrack.style.left = minPercent + '%';
    sliderTrack.style.width = (maxPercent - minPercent) + '%';

    // Calculate actual dates based on slider positions
    const totalEntries = timelineData.sortedEntries.length;
    const minIndex = Math.floor((minVal / 100) * (totalEntries - 1));
    const maxIndex = Math.floor((maxVal / 100) * (totalEntries - 1));

    const startEntry = timelineData.sortedEntries[minIndex];
    const endEntry = timelineData.sortedEntries[maxIndex];

    // Update display
    document.getElementById('selectedStart').textContent = formatDate(startEntry.date);
    document.getElementById('selectedEnd').textContent = formatDate(endEntry.date);

    // Count QSOs in range
    const qsosInRange = timelineData.sortedEntries.slice(minIndex, maxIndex + 1).length;
    document.getElementById('selectedCount').textContent = `${qsosInRange} QSO${qsosInRange !== 1 ? 's' : ''} selected`;

    // Update date inputs to match slider selection
    isSliderUpdating = true;
    document.getElementById('fromDate').value = startEntry.date.slice(0, 4) + '-' +
        startEntry.date.slice(4, 6) + '-' +
        startEntry.date.slice(6, 8);
    document.getElementById('toDate').value = endEntry.date.slice(0, 4) + '-' +
        endEntry.date.slice(4, 6) + '-' +
        endEntry.date.slice(6, 8);
    isSliderUpdating = false;

    // Update the filtered preview
    updateFilteredPreview();
}
