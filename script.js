// Host this JS file on GitHub CDN
(function() {
  'use strict';
  
  function initCSVTables() {
    const csvUrl = "YOUR_CSV_URL_HERE";
    
    function createTable(targetId, category) {
      fetch(csvUrl)
        .then(res => res.text())
        .then(csv => {
          const data = Papa.parse(csv, { header: true }).data;
          const container = document.getElementById(targetId);
          
          if (!container) return;
          
          const filtered = data.filter(row => row.Category === category);
          const html = `
            <div class="custom-csv-table-container">
              <table>
                <thead>
                  <tr>
                    <th>S.No.</th>
                    <th>Subject</th>
                    <th>Download</th>
                    <th>Share</th>
                  </tr>
                </thead>
                <tbody>
                  ${filtered.map((row, i) => `
                    <tr class="custom-csv-table-row">
                      <td>${i + 1}</td>
                      <td>${row.Subject.replace(/_/g, ' ').replace(/\.pdf$/i, '')}</td>
                      <td>
                        <a href="${row.Download}" target="_blank" class="custom-download-btn">
                          Download
                        </a>
                      </td>
                      <td>
                        <a href="${row.Share}" target="_blank" class="custom-share-btn">
                          Share
                        </a>
                      </td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          `;
          
          container.innerHTML = html;
        });
    }
    
    // Initialize tables when tabs are clicked
    document.querySelectorAll('.et_pb_tab').forEach(tab => {
      tab.addEventListener('click', function() {
        const targetId = this.getAttribute('data-toggle-target');
        const category = this.dataset.category;
        if (targetId && category) {
          createTable(targetId, category);
        }
      });
    });
  }
  
  document.addEventListener('DOMContentLoaded', initCSVTables);
})();
