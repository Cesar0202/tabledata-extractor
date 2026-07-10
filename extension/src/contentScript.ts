export interface ExtractedTable {
  id: string;
  headers: string[];
  rows: string[][];
}

function getTableTitle(table: HTMLTableElement, index: number): string {
  const caption = table.querySelector('caption');
  if (caption && caption.textContent?.trim()) {
    return caption.textContent.trim();
  }

  let prev = table.previousElementSibling;
  for (let i = 0; i < 3; i++) {
    if (!prev) break;
    const tagName = prev.tagName.toLowerCase();
    if (['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(tagName)) {
      if (prev.textContent?.trim()) return prev.textContent.trim();
    }
    if (tagName === 'p' || tagName === 'div') {
      const strong = prev.querySelector('strong, b');
      if (strong && strong.textContent?.trim()) return strong.textContent.trim();
      if (prev.textContent && prev.textContent.trim().length > 0 && prev.textContent.trim().length < 60) {
        return prev.textContent.trim();
      }
    }
    prev = prev.previousElementSibling;
  }

  if (table.id) return table.id;
  return `Tabla ${index + 1}`;
}

export function parseTables(documentObj: Document = document): ExtractedTable[] {
  const tables = documentObj.querySelectorAll('table');
  const extracted: ExtractedTable[] = [];

  tables.forEach((table, index) => {
    const headers: string[] = [];
    const rows: string[][] = [];

    // Parse headers
    const thead = table.querySelector('thead');
    const headerCells = thead ? thead.querySelectorAll('th, td') : table.querySelectorAll('tr')[0]?.querySelectorAll('th, td');
    
    if (headerCells) {
      headerCells.forEach(cell => {
        headers.push(cell.textContent?.trim().replace(/\s+/g, ' ') || '');
      });
    }

    // Parse rows
    const tbody = table.querySelector('tbody') || table;
    const trs = tbody.querySelectorAll('tr');
    
    // Start from index 1 if no thead and first row was used as headers
    const startIndex = (!thead && table.querySelectorAll('tr')[0]?.querySelector('th')) ? 1 : 0;

    for (let i = startIndex; i < trs.length; i++) {
      const row = trs[i];
      // Skip rows inside thead if we're querying from the whole table
      if (thead && thead.contains(row)) continue;
      
      const rowData: string[] = [];
      const cells = row.querySelectorAll('td, th');
      
      // Only include rows that have data
      if (cells.length > 0) {
        cells.forEach(cell => {
          rowData.push(cell.textContent?.trim().replace(/\s+/g, ' ') || '');
        });
        rows.push(rowData);
      }
    }

    // Only add if there's actual data
    if (headers.length > 0 || rows.length > 0) {
      // Clean the title for safe filenames by removing invalid characters
      let safeTitle = getTableTitle(table, index).replace(/[/\\?%*:|"<>]/g, '-').trim();
      // Truncate to reasonable length
      if (safeTitle.length > 50) safeTitle = safeTitle.substring(0, 50) + '...';

      extracted.push({
        id: safeTitle,
        headers,
        rows
      });
    }
  });

  return extracted;
}

// Listen for messages from popup
chrome.runtime?.onMessage?.addListener((request: any, _sender: any, sendResponse: any) => {
  if (request.action === 'extractTables') {
    const tables = parseTables();
    sendResponse({ tables });
  }
  return true;
});
