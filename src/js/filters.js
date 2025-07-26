// Filters Module
function updateFilteredPreview() {
  const table = document.getElementById("qsoTable");
  const qsoCount = document.getElementById("qsoCount");

  // Apply filters
  const fromDate = (document.getElementById("fromDate").value || "").replaceAll(
    "-",
    ""
  );
  const toDate = (
    document.getElementById("toDate").value || "99999999"
  ).replaceAll("-", "");
  const fromTime = (
    document.getElementById("fromTime").value || "0000"
  ).replace(":", "");
  const toTime = (document.getElementById("toTime").value || "2359").replace(
    ":",
    ""
  );
  const callFilter = document.getElementById("callFilter").value.toUpperCase();
  const bandFilter = document.getElementById("bandFilter").value;
  const modeFilter = document.getElementById("modeFilter").value;

  filteredEntries = allEntries.filter((e) => {
    return (
      e.date >= fromDate &&
      e.date <= toDate &&
      e.time >= fromTime &&
      e.time <= toTime &&
      (callFilter === "" || e.call.toUpperCase().includes(callFilter)) &&
      (bandFilter === "" || e.band === bandFilter) &&
      (modeFilter === "" || e.mode === modeFilter)
    );
  });

  // Sort filtered entries by date and time
  filteredEntries.sort((a, b) => {
    const dateA = parseInt(a.date + a.time.padEnd(4, "0"));
    const dateB = parseInt(b.date + b.time.padEnd(4, "0"));
    return dateA - dateB;
  });

  qsoCount.textContent = `${filteredEntries.length} QSO${
    filteredEntries.length !== 1 ? "s" : ""
  }`;

  // Update slider count if timeline is active and we're not updating from slider
  if (!isSliderUpdating && timelineData.sortedEntries.length > 0) {
    const minSlider = document.getElementById("sliderMin");
    const maxSlider = document.getElementById("sliderMax");
    const totalEntries = timelineData.sortedEntries.length;
    const minIndex = Math.floor((minSlider.value / 100) * (totalEntries - 1));
    const maxIndex = Math.floor((maxSlider.value / 100) * (totalEntries - 1));
    const qsosInRange = timelineData.sortedEntries.slice(
      minIndex,
      maxIndex + 1
    ).length;
    document.getElementById("selectedCount").textContent = `${qsosInRange} QSO${
      qsosInRange !== 1 ? "s" : ""
    } selected`;
  }

  // Generate table with date separators
  let tableHTML = "";
  let currentDate = "";

  filteredEntries.forEach((e, index) => {
    // Add date separator if date changes
    if (e.date !== currentDate) {
      if (currentDate !== "") {
        // Add a subtle separator row
        tableHTML += `
                    <tr class="bg-gray-50">
                        <td colspan="9" class="px-4 py-1">
                            <div class="flex items-center">
                                <div class="flex-1 border-t border-gray-300"></div>
                            </div>
                        </td>
                    </tr>
                `;
      }

      // Add date header row
      const dayOfWeek = new Date(
        e.date.slice(0, 4),
        e.date.slice(4, 6) - 1,
        e.date.slice(6, 8)
      ).toLocaleDateString("en-US", { weekday: "long" });
      tableHTML += `
                <tr class="bg-blue-50 border-b-2 border-blue-200">
                    <td colspan="9" class="px-4 py-2 font-semibold text-blue-800">
                        📅 ${formatDate(e.date)} - ${dayOfWeek}
                    </td>
                </tr>
            `;
      currentDate = e.date;
    }

    // Add QSO row
    tableHTML += `
            <tr class="hover:bg-gray-50 ${
              index % 2 === 0 ? "bg-white" : "bg-gray-25"
            }">
                <td class="px-4 py-2">${formatDate(e.date)}</td>
                <td class="px-4 py-2 font-mono">${formatTime(e.time)}</td>
                <td class="px-4 py-2 font-bold text-blue-700">${e.call}</td>
                <td class="px-4 py-2 text-sm">${e.freq}</td>
                <td class="px-4 py-2">
                    <span class="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                        ${e.band}
                    </span>
                </td>
                <td class="px-4 py-2">
                    <span class="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs font-medium">
                        ${e.mode}
                    </span>
                </td>
                <td class="px-4 py-2 text-center font-mono text-sm">${
                  e.rstSent
                }</td>
                <td class="px-4 py-2 text-center font-mono text-sm">${
                  e.rstRcvd
                }</td>
                <td class="px-4 py-2 text-sm text-gray-600">${e.comment}</td>
            </tr>
        `;
  });

  table.innerHTML = tableHTML;
}
