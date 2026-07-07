/**
 * Google Apps Script — paste into your Apps Script project and redeploy.
 *
 * Deploy as Web App:
 *   Execute as: Me
 *   Who has access: Anyone
 *
 * Security: whitelists field names, sanitizes values, and blocks formula injection.
 */

var ALLOWED_FIELD_KEYS = [
  'branchId',
  'recentActivity',
  'icpProfile',
  'homeRegion',
  'homeTown',
  'lastConversionDirection',
  'transactionLocation',
  'transactionValue',
  'frequency',
  'currentSolution',
  'friction',
  'inertia',
  'contactConsent',
  'phoneNumber',
  'email',
  'whatsappCommunity',
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_content',
];

var FIELD_MAX_LENGTH = {
  branchId: 50,
  recentActivity: 50,
  icpProfile: 200,
  homeRegion: 50,
  homeTown: 120,
  lastConversionDirection: 50,
  transactionLocation: 200,
  transactionValue: 50,
  frequency: 50,
  currentSolution: 200,
  friction: 200,
  inertia: 50,
  contactConsent: 10,
  phoneNumber: 20,
  email: 120,
  whatsappCommunity: 10,
  utm_source: 120,
  utm_medium: 120,
  utm_campaign: 120,
  utm_content: 120,
};

var MAX_USER_AGENT_LENGTH = 500;
var MAX_SURVEY_ID_LENGTH = 100;
var MAX_DURATION_MS = 86400000;

var UTM_FIELD_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content'];

function doPost(e) {
  try {
    var payload = JSON.parse(e.postData.contents);
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    var surveyId = sanitizeString(payload.surveyId, MAX_SURVEY_ID_LENGTH);
    if (!surveyId) {
      return jsonResponse({ success: false, error: 'Invalid survey identifier.' });
    }

    var branchId = payload.branchId ? sanitizeString(payload.branchId, 220) : '';
    var submittedAt = payload.submittedAt
      ? sanitizeString(payload.submittedAt, 40)
      : new Date().toISOString();
    var durationMs = Number(payload.durationMs);
    if (!isFinite(durationMs) || durationMs < 0 || durationMs > MAX_DURATION_MS) {
      return jsonResponse({ success: false, error: 'Invalid duration value.' });
    }

    var userAgent = sanitizeString(payload.userAgent || '', MAX_USER_AGENT_LENGTH);

    var rowData = {
      submittedAt: submittedAt,
      surveyId: surveyId,
      branchId: branchId,
      durationMs: Math.round(durationMs),
      userAgent: userAgent,
    };

    if (payload.fields && typeof payload.fields === 'object') {
      var keys = Object.keys(payload.fields);
      if (keys.length > ALLOWED_FIELD_KEYS.length) {
        return jsonResponse({ success: false, error: 'Too many fields submitted.' });
      }

      for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        if (ALLOWED_FIELD_KEYS.indexOf(key) === -1) {
          return jsonResponse({ success: false, error: 'Unexpected field: ' + key });
        }

        var maxLen = FIELD_MAX_LENGTH[key] || 500;
        var value = sanitizeString(String(payload.fields[key]), maxLen);
        if (value || UTM_FIELD_KEYS.indexOf(key) !== -1) {
          rowData[key] = value;
        }
      }
    }

    appendRowWithHeaders(sheet, rowData);

    return jsonResponse({ success: true });
  } catch (err) {
    return jsonResponse({ success: false, error: String(err.message || err) });
  }
}

function sanitizeString(value, maxLength) {
  if (value === null || value === undefined) return '';
  var str = String(value)
    .replace(/\0/g, '')
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '')
    .replace(/<[^>]*>/g, '')
    .trim();

  if (str.length > maxLength) return '';

  var trimmed = str.replace(/^\s+/, '');
  if (/^[=+\-@\t\r|]/.test(trimmed)) {
    str = "'" + str;
  }

  return str;
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
  return jsonResponse({ success: true, message: 'Discovery survey endpoint is active.' });
}
