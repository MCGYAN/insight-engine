/**
 * Google Apps Script — paste into your Apps Script project and redeploy.
 *
 * Deploy as Web App:
 *   Execute as: Me
 *   Who has access: Anyone
 *
 * The script creates column headers from field names on first submission,
 * then appends rows on subsequent submissions. New fields are added as columns.
 */

function doPost(e) {
  try {
    const payload = JSON.parse(e.postData.contents);
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    const rowData = {
      submittedAt: payload.submittedAt || new Date().toISOString(),
      surveyId: payload.surveyId || '',
      branchId: payload.branchId || '',
      durationMs: payload.durationMs || 0,
      userAgent: payload.userAgent || '',
    };

    if (payload.fields && typeof payload.fields === 'object') {
      Object.keys(payload.fields).forEach(function (key) {
        rowData[key] = payload.fields[key];
      });
    }

    appendRowWithHeaders(sheet, rowData);

    return jsonResponse({ success: true });
  } catch (err) {
    return jsonResponse({ success: false, error: String(err.message || err) });
  }
}

function appendRowWithHeaders(sheet, rowData) {
  var newKeys = Object.keys(rowData);

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(newKeys);
    sheet.getRange(1, 1, 1, newKeys.length).setFontWeight('bold');
    sheet.appendRow(newKeys.map(function (k) { return rowData[k]; }));
    return;
  }

  var existingHeaders = sheet
    .getRange(1, 1, 1, sheet.getLastColumn())
    .getValues()[0]
    .map(function (h) { return String(h); });

  var mergedHeaders = existingHeaders.slice();
  newKeys.forEach(function (key) {
    if (mergedHeaders.indexOf(key) === -1) {
      mergedHeaders.push(key);
    }
  });

  if (mergedHeaders.length > existingHeaders.length) {
    sheet.getRange(1, 1, 1, mergedHeaders.length).setValues([mergedHeaders]);
    sheet.getRange(1, 1, 1, mergedHeaders.length).setFontWeight('bold');
  }

  var row = mergedHeaders.map(function (header) {
    return rowData[header] !== undefined ? rowData[header] : '';
  });

  sheet.appendRow(row);
}

function jsonResponse(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

function doGet() {
  return jsonResponse({ success: true, message: 'AfriMoney assessment endpoint is active.' });
}
