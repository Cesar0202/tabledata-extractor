import { describe, it, expect, beforeEach } from 'vitest';
import { parseTables } from './contentScript';
import { JSDOM } from 'jsdom';

describe('Table Parser', () => {
  let dom: JSDOM;
  let document: Document;

  beforeEach(() => {
    dom = new JSDOM(`
      <!DOCTYPE html>
      <html>
      <body>
        <table id="simple-table">
          <thead>
            <tr>
              <th>Name</th>
              <th> Age </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Alice</td>
              <td>25</td>
            </tr>
            <tr>
              <td>Bob</td>
              <td>30</td>
            </tr>
          </tbody>
        </table>
        
        <table id="no-thead">
          <tr>
            <th>City</th>
            <th>Country</th>
          </tr>
          <tr>
            <td>Paris</td>
            <td>France</td>
          </tr>
        </table>
      </body>
      </html>
    `);
    document = dom.window.document;
  });

  it('should parse a simple table with thead correctly', () => {
    const tables = parseTables(document);
    expect(tables).toHaveLength(2);
    
    expect(tables[0].id).toBe('simple-table');
    expect(tables[0].headers).toEqual(['Name', 'Age']);
    expect(tables[0].rows).toEqual([
      ['Alice', '25'],
      ['Bob', '30']
    ]);
  });

  it('should parse a table without thead correctly', () => {
    const tables = parseTables(document);
    
    expect(tables[1].id).toBe('no-thead');
    expect(tables[1].headers).toEqual(['City', 'Country']);
    expect(tables[1].rows).toEqual([
      ['Paris', 'France']
    ]);
  });
});
