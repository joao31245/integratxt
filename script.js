document.getElementById('dataForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const filename = document.getElementById('filename').value.trim();
    const fileInput = document.getElementById('xlsxFile').files[0];
    
    if (fileInput) {
        const reader = new FileReader();

        reader.onload = function(e) {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: 'array' });
            const sheet = workbook.Sheets[workbook.SheetNames[0]];
            const rows = XLSX.utils.sheet_to_json(sheet, { header: 1 });

            const zip = new JSZip();
            
            rows.slice(1).forEach((row, index) => {
                const barra = row[0].toString().padEnd(25, ' ');
                const idlocal = row[1].toString().padEnd(31, ' ');
                const validade = row[2].toString().padStart(12, ' ');
                const lote = row[3].toString().padEnd(60, ' ');
                const quantidade = row[4].toString().padStart(10, ' ');

                const linha = `${barra}${idlocal}${quantidade}${validade}${lote}\n`;
                const txtFilename = `${filename}_${index + 1}.invdet`;

                zip.file(txtFilename, linha);
            });

            zip.generateAsync({ type: 'blob' })
                .then(function(content) {
                    saveAs(content, filename + '.zip');
                });
        };

        reader.readAsArrayBuffer(fileInput);
    } else {
        alert('Por favor, selecione um arquivo XLSX.');
    }
});
