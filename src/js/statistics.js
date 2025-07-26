// Statistics Module
function updateStats() {
    const stats = calculateStats();
    const statsGrid = document.getElementById('statsGrid');

    statsGrid.innerHTML = `
        <div class="bg-white rounded-lg p-4 text-center shadow-sm">
            <div class="text-2xl font-bold text-blue-600">${stats.totalQSOs}</div>
            <div class="text-sm text-gray-600">Total QSOs</div>
        </div>
        <div class="bg-white rounded-lg p-4 text-center shadow-sm">
            <div class="text-2xl font-bold text-green-600">${stats.uniqueCallsigns}</div>
            <div class="text-sm text-gray-600">Unique Calls</div>
        </div>
        <div class="bg-white rounded-lg p-4 text-center shadow-sm">
            <div class="text-2xl font-bold text-purple-600">${stats.topBand}</div>
            <div class="text-sm text-gray-600">Top Band</div>
        </div>
        <div class="bg-white rounded-lg p-4 text-center shadow-sm">
            <div class="text-2xl font-bold text-orange-600">${stats.topMode}</div>
            <div class="text-sm text-gray-600">Top Mode</div>
        </div>
    `;
}

function calculateStats() {
    const callsigns = new Set();
    const bands = {};
    const modes = {};

    allEntries.forEach(entry => {
        callsigns.add(entry.call);
        bands[entry.band] = (bands[entry.band] || 0) + 1;
        modes[entry.mode] = (modes[entry.mode] || 0) + 1;
    });

    const topBand = Object.keys(bands).reduce((a, b) => bands[a] > bands[b] ? a : b, '') || 'N/A';
    const topMode = Object.keys(modes).reduce((a, b) => modes[a] > modes[b] ? a : b, '') || 'N/A';

    return {
        totalQSOs: allEntries.length,
        uniqueCallsigns: callsigns.size,
        topBand,
        topMode
    };
}
