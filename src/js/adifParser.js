// ADIF Parser Module
function parseAdif(content, filename) {
  const entries = [];
  const rawEntries = content.split(/<eor>/i);

  rawEntries.forEach((raw) => {
    if (raw.trim().length < 10) return;

    const entry = extractFields(raw, filename);
    if (entry.date && entry.time) {
      entries.push(entry);
    }
  });

  return entries;
}

function extractFields(raw, filename) {
  return {
    raw: raw.trim() + " <EOR>",
    filename: filename,
    date: extractField(raw, "qso_date") || "",
    time: extractField(raw, "time_on") || "",
    call: extractField(raw, "call") || "",
    freq: extractField(raw, "freq") || "",
    band:
      extractField(raw, "band") || getBandFromFreq(extractField(raw, "freq")),
    mode: extractField(raw, "mode") || "",
    rstSent: extractField(raw, "rst_sent") || "",
    rstRcvd: extractField(raw, "rst_rcvd") || "",
    comment: extractField(raw, "comment") || "",
    country: extractField(raw, "country") || "",
    gridsquare: extractField(raw, "gridsquare") || "",
  };
}

function extractField(raw, fieldName) {
  const match = raw.match(new RegExp(`<${fieldName}:\\d+>([^<\\n\\r]+)`, "i"));
  return match ? match[1].trim() : null;
}

function getBandFromFreq(freq) {
  if (!freq) return "";
  const f = parseFloat(freq);
  if (f >= 1.8 && f <= 2.0) return "160m";
  if (f >= 3.5 && f <= 4.0) return "80m";
  if (f >= 7.0 && f <= 7.3) return "40m";
  if (f >= 14.0 && f <= 14.35) return "20m";
  if (f >= 21.0 && f <= 21.45) return "15m";
  if (f >= 28.0 && f <= 29.7) return "10m";
  if (f >= 50.0 && f <= 54.0) return "6m";
  if (f >= 144.0 && f <= 148.0) return "2m";
  if (f >= 420.0 && f <= 450.0) return "70cm";
  return "";
}
