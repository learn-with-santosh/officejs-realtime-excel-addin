import { connectWebSocket, disconnectWebSocket } from '../services/socketClient';

Office.onReady((info) => {
  if (info.host === Office.HostType.Excel) {
    document.getElementById('connect-btn')!.onclick = startConnection;
    document.getElementById('disconnect-btn')!.onclick = stopConnection;
  }
});

let currentRow = 1;

function startConnection() {
  document.getElementById('connect-btn')!.setAttribute('disabled', 'true');
  document.getElementById('disconnect-btn')!.removeAttribute('disabled');
  
  connectWebSocket(handleIncomingData, updateStatus);
}

function stopConnection() {
  disconnectWebSocket();
  document.getElementById('disconnect-btn')!.setAttribute('disabled', 'true');
  document.getElementById('connect-btn')!.removeAttribute('disabled');
}

function updateStatus(status: string) {
  document.getElementById('status')!.innerText = status;
}

async function handleIncomingData(data: any) {
  try {
    await Excel.run(async (context) => {
      const sheet = context.workbook.worksheets.getActiveWorksheet();
      const range = sheet.getRangeByIndexes(currentRow, 0, 1, 2);
      
      range.values = [[data.timestamp, data.value]];
      range.format.autofitColumns();
      
      currentRow++;
      if (currentRow > 100) { currentRow = 1; } // Loop back so we don't write infinitely
      
      await context.sync();
    });
  } catch (error) {
    console.error('Error writing to Excel', error);
  }
}
