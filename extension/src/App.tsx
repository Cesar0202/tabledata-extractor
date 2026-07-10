import { useState, useEffect } from 'react';
import type { ExtractedTable } from './contentScript';

function App() {
  const [tables, setTables] = useState<ExtractedTable[]>([]);
  const [loading, setLoading] = useState(true);
  const [webhookUrl, setWebhookUrl] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    // Request tables from content script
    chrome.tabs?.query({ active: true, currentWindow: true }, (tabs: chrome.tabs.Tab[]) => {
      if (tabs[0]?.id) {
        chrome.tabs.sendMessage(tabs[0].id, { action: 'extractTables' }, (response: any) => {
          if (response && response.tables) {
            setTables(response.tables);
          }
          setLoading(false);
        });
      } else {
        setLoading(false);
      }
    });
  }, []);

  const exportCSV = (table: ExtractedTable) => {
    const csvContent = [
      table.headers.join(','),
      ...table.rows.map(row => row.map(cell => `"${cell.replace(/"/g, '""')}"`).join(','))
    ].join('\\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${table.id}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportJSON = (table: ExtractedTable) => {
    const jsonContent = JSON.stringify(table, null, 2);
    const blob = new Blob([jsonContent], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${table.id}.json`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const sendToWebhook = async () => {
    if (!webhookUrl) {
      setStatus('Please enter a webhook URL');
      return;
    }
    
    setStatus('Sending...');
    try {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ tables }),
      });
      
      if (response.ok) {
        setStatus('Sent successfully!');
      } else {
        setStatus(`Error: ${response.statusText}`);
      }
    } catch (error) {
      setStatus('Failed to send request');
    }
    
    setTimeout(() => setStatus(''), 3000);
  };

  if (loading) {
    return <div className="p-4 text-center">Scanning page...</div>;
  }

  return (
    <div className="p-4 flex flex-col gap-4">
      <h1 className="text-xl font-bold text-blue-400">TableData Extractor</h1>
      
      {tables.length === 0 ? (
        <div className="text-slate-400 text-sm">No tables found on this page.</div>
      ) : (
        <>
          <div className="text-sm font-semibold">{tables.length} table(s) found</div>
          
          <div className="flex flex-col gap-3 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
            {tables.map((table, idx) => (
              <div key={idx} className="bg-slate-800 p-3 rounded border border-slate-700">
                <div className="font-medium mb-1 truncate" title={table.id}>
                  {table.id} ({table.rows.length} rows)
                </div>
                <div className="flex gap-2 mt-2">
                  <button 
                    onClick={() => exportCSV(table)}
                    className="bg-blue-600 hover:bg-blue-500 text-xs px-2 py-1 rounded transition-colors"
                  >
                    CSV
                  </button>
                  <button 
                    onClick={() => exportJSON(table)}
                    className="bg-emerald-600 hover:bg-emerald-500 text-xs px-2 py-1 rounded transition-colors"
                  >
                    JSON
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-2 pt-3 border-t border-slate-700 flex flex-col gap-2">
            <label className="text-xs text-slate-300">Webhook URL (n8n/Make):</label>
            <input 
              type="url" 
              value={webhookUrl}
              onChange={(e) => setWebhookUrl(e.target.value)}
              placeholder="https://hook.us1.make.com/..." 
              className="bg-slate-800 border border-slate-600 rounded px-2 py-1 text-sm focus:outline-none focus:border-blue-500 w-full"
            />
            <button 
              onClick={sendToWebhook}
              className="bg-purple-600 hover:bg-purple-500 w-full py-1.5 rounded text-sm font-medium transition-colors"
            >
              Send All to Webhook
            </button>
            {status && <div className="text-xs text-center text-amber-400">{status}</div>}
          </div>
        </>
      )}
    </div>
  );
}

export default App;
