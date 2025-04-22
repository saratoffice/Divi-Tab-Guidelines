document.addEventListener("DOMContentLoaded", function () {
    const csvUrl = "https://docs.google.com/spreadsheets/d/1mLh8E5JEHP-HCrBgs42pVpiY4ZpP7LG-O__3Av2-MgY/export?format=csv&gid=884226509";

    fetch(csvUrl)
      .then(response => response.text())
      .then(csvText => {
        const parsed = Papa.parse(csvText, { header: false });
        const rows = parsed.data.slice(1); // skip header

        document.querySelectorAll(".csv-tab-container").forEach(container => {
          const category = container.getAttribute("data-category");
          const tableBody = rows.filter(row => row[1] === category);
          const tableHTML = `
            <table class="csv-table">
              <thead>
                <tr>
                  <th>S.No.</th>
                  <th>Subject</th>
                  <th>Download</th>
                  <th>Share</th>
                </tr>
              </thead>
              <tbody>
                ${tableBody.map((row, i) => {
                  const subject = (row[2] || "").replace(/_/g, " ").replace(/\.pdf/i, "");
                  const link = row[5];
                  return `
                    <tr>
                      <td>${i + 1}</td>
                      <td>${subject}</td>
                      <td><a href="${link}" target="_blank"><button class="download-btn">Download</button></a></td>
                      <td><a href="https://wa.me/?text=${encodeURIComponent("📄 " + subject + "\n🔗 " + link)}" target="_blank"><button class="share-btn">Share</button></a></td>
                    </tr>
                  `;
                }).join("")}
              </tbody>
            </table>
          `;
          container.querySelector(".csv-table-placeholder").innerHTML = tableHTML;
        });
      })
      .catch(err => console.error("CSV Load Error:", err));
  });
