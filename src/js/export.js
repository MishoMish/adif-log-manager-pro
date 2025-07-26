// Export Module
function downloadFiltered() {
  if (filteredEntries.length === 0) {
    alert("No QSOs found matching the current filters.");
    return;
  }

  const adifContent = filteredEntries.map((e) => e.raw).join("\n");
  downloadFile(adifContent, "filtered_log.adi", "text/plain");
}

function downloadCSV() {
  if (filteredEntries.length === 0) {
    alert("No QSOs to export.");
    return;
  }

  const headers = [
    "Date",
    "Time",
    "Callsign",
    "Frequency",
    "Band",
    "Mode",
    "RST Sent",
    "RST Rcvd",
    "Comment",
  ];
  const csvContent = [
    headers.join(","),
    ...filteredEntries.map((e) =>
      [
        formatDate(e.date),
        formatTime(e.time),
        e.call,
        e.freq,
        e.band,
        e.mode,
        e.rstSent,
        e.rstRcvd,
        `"${e.comment}"`,
      ].join(",")
    ),
  ].join("\n");

  downloadFile(csvContent, "qso_log.csv", "text/csv");
}

function generateReport() {
  if (allEntries.length === 0) {
    alert("No QSOs loaded.");
    return;
  }

  const stats = calculateStats();
  const bandBreakdown = {};
  const modeBreakdown = {};

  filteredEntries.forEach((e) => {
    bandBreakdown[e.band] = (bandBreakdown[e.band] || 0) + 1;
    modeBreakdown[e.mode] = (modeBreakdown[e.mode] || 0) + 1;
  });

  const reportContent = `
AMATEUR RADIO LOG REPORT
========================
Generated: ${new Date().toLocaleString()}

SUMMARY
-------
Total QSOs: ${stats.totalQSOs}
Unique Callsigns: ${stats.uniqueCallsigns}
Filtered QSOs: ${filteredEntries.length}

BAND BREAKDOWN
--------------
${Object.entries(bandBreakdown)
  .map(([band, count]) => `${band}: ${count}`)
  .join("\n")}

MODE BREAKDOWN
--------------
${Object.entries(modeBreakdown)
  .map(([mode, count]) => `${mode}: ${count}`)
  .join("\n")}

FILES PROCESSED
---------------
${uploadedFiles.map((f) => f.name).join("\n")}
    `.trim();

  downloadFile(reportContent, "qso_report.txt", "text/plain");
}

function downloadFile(content, filename, type) {
  const blob = new Blob([content], { type });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = filename;
  a.click();
  URL.revokeObjectURL(a.href);
}
