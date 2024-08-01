document.getElementById('dataForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const filename = document.getElementById('filename').value.trim(); // Captura o nome do arquivo
    const barra = document.getElementById('barra').value.padEnd(25, ' '); // Posição 1 a 25
    const idlocal = document.getElementById('idlocal').value.padEnd(31, ' '); // Posição 26 a 56
    const quantidade = document.getElementById('quantidade').value.toString().padStart(10, ' '); // Posição 57 a 66
    const dataVencimentoElement = document.getElementById('dataVencimento');
    const dataVencimento = dataVencimentoElement.value ? new Date(dataVencimentoElement.value).toLocaleDateString('pt-BR', {day: '2-digit', month: '2-digit', year: 'numeric'}).replace(/(\d{2})\/(\d{2})\/(\d{4})/, '$1/$2/$3').padStart(12, ' ') : ''.padEnd(12, ' '); // Posição 67 a 78
    const loteIndustria = document.getElementById('loteIndustria').value.padEnd(60, ' '); // Posição 79 a 138

    const linha = `${barra}${idlocal}${quantidade}${dataVencimento}${loteIndustria}\n`;

    const blob = new Blob([linha], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename + '.invdet' || 'arquivo.invdet'; // Usa o nome fornecido ou o padrão
    link.click();
});
