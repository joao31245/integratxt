document.getElementById('dataForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const barra = document.getElementById('barra').value.padEnd(25, ' '); // Posição 1 a 25
    const idlocal = document.getElementById('idlocal').value.padEnd(31, ' '); // Posição 26 a 56
    const quantidade = document.getElementById('quantidade').value.toString().padStart(10, ' '); // Posição 57 a 66
    const loteIndustria = document.getElementById('loteIndustria').value.padEnd(60, ' '); // Posição 79 a 138

    const linha = `${barra}${idlocal}${quantidade}          ${loteIndustria}\n`; // Adicionando espaços para ajustar as posições

    const blob = new Blob([linha], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'arquivo.invdet';
    link.click();
});
