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
                const idlocal = row[1].toString().padEnd(25, ' ');   // Posição 1 a 25
                const barra = row[0].toString().padEnd(31, ' ');     // Posição 26 a 56
                const quantidade = row[4].toString().padStart(10, ' '); // Posição 57 a 66
                
                // Verificação e formatação da data de validade
                let validade = ''.padEnd(12, ' ');  // Posição 67 a 78, default é espaço
                if (row[2]) {
                    validade = new Date(row[2]).toLocaleDateString('pt-BR', {day: '2-digit', month: '2-digit', year: 'numeric'}).padStart(12, ' ');
                }

                const lote = row[3].toString().padEnd(60, ' ');       // Posição 79 a 138

                const linha = `${idlocal}${barra}${quantidade}${validade}${lote}\n`;
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
