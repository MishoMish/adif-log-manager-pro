// File Manager Module
function handleFiles(event) {
  const files = Array.from(event.target.files);
  files.forEach((file) => {
    if (
      !uploadedFiles.find((f) => f.name === file.name && f.size === file.size)
    ) {
      uploadedFiles.push(file);
    }
  });
  updateFileList();
  document.getElementById("mergeBtn").disabled = uploadedFiles.length === 0;
}

function updateFileList() {
  const fileList = document.getElementById("fileList");
  const fileCount = document.getElementById("fileCount");

  fileCount.textContent = `${uploadedFiles.length} file${
    uploadedFiles.length !== 1 ? "s" : ""
  }`;

  fileList.innerHTML = uploadedFiles
    .map(
      (file, index) => `
        <div class="flex items-center justify-between bg-white rounded-lg p-3 shadow-sm">
            <span class="text-sm">${file.name} (${(file.size / 1024).toFixed(
        1
      )} KB)</span>
            <button onclick="removeFile(${index})" class="text-red-500 hover:text-red-700 text-sm">
                Remove
            </button>
        </div>
    `
    )
    .join("");
}

function removeFile(index) {
  uploadedFiles.splice(index, 1);
  updateFileList();
  document.getElementById("mergeBtn").disabled = uploadedFiles.length === 0;
}

function clearFiles() {
  uploadedFiles = [];
  allEntries = [];
  filteredEntries = [];
  duplicates = [];
  timelineData = { minDate: "", maxDate: "", sortedEntries: [] };
  document.getElementById("adifFiles").value = "";
  updateFileList();
  updateFilteredPreview();
  document.getElementById("statsSection").classList.add("hidden");
  document.getElementById("duplicateSection").classList.add("hidden");
  document.getElementById("timelineSection").classList.add("hidden");
  document.getElementById("mergeBtn").disabled = true;
}

async function mergeFiles() {
  allEntries = [];

  for (const file of uploadedFiles) {
    const content = await readFileAsync(file);
    const entries = parseAdif(content, file.name);
    allEntries.push(...entries);
  }

  detectDuplicates();
  setupTimeline();
  updateStats();
  updateFilteredPreview();

  document.getElementById("statsSection").classList.remove("hidden");

  if (duplicates.length > 0) {
    document.getElementById("duplicateSection").classList.remove("hidden");
    showDuplicates();
  }
}

function readFileAsync(file) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.readAsText(file);
  });
}
