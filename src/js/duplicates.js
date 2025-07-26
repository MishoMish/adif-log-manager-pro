// Duplicates Module
function detectDuplicates() {
  duplicates = [];
  const seen = new Map();

  allEntries.forEach((entry, index) => {
    const key = `${entry.call}-${entry.date}-${entry.time}`;
    if (seen.has(key)) {
      duplicates.push({
        original: seen.get(key),
        duplicate: { ...entry, index },
      });
    } else {
      seen.set(key, { ...entry, index });
    }
  });
}

function showDuplicates() {
  const duplicateList = document.getElementById("duplicateList");
  duplicateList.innerHTML = duplicates
    .map(
      (dup) => `
        <div class="bg-white rounded-lg p-3 shadow-sm">
            <strong>${dup.duplicate.call}</strong> on ${formatDate(
        dup.duplicate.date
      )} at ${formatTime(dup.duplicate.time)}
            <br><small class="text-gray-600">Files: ${
              dup.original.filename
            } & ${dup.duplicate.filename}</small>
        </div>
    `
    )
    .join("");
}

function removeDuplicates() {
  const duplicateIndices = duplicates
    .map((d) => d.duplicate.index)
    .sort((a, b) => b - a);
  duplicateIndices.forEach((index) => {
    allEntries.splice(index, 1);
  });
  duplicates = [];
  document.getElementById("duplicateSection").classList.add("hidden");
  updateStats();
  updateFilteredPreview();
}

function keepDuplicates() {
  document.getElementById("duplicateSection").classList.add("hidden");
}
