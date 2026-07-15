import os

with open('src/components/Dashboard.tsx', 'r') as f:
    content = f.read()

target = """  const chartData = useMemo(() => {
    // Generates points for the expected curve (weekly + end of batch)
    const ages = new Set<number>();
    for (let i = 1; i <= 100; i += 7) {
      ages.add(i);
    }
    ages.add(100);

    filteredVisits.forEach(v => ages.add(Number(v.idade)));

    const sortedAges = Array.from(ages).sort((a, b) => a - b);

    return sortedAges.map(idade => {
      const visitsAtAge = filteredVisits.filter(v => Number(v.idade) === idade);
      
      let totalExpected = 0;
      visitsAtAge.forEach(v => {
        totalExpected += getExpectedConsumption(idade, v.tipoLote, v.pesoAloj);
      });
      const expected = visitsAtAge.length > 0 ? totalExpected / visitsAtAge.length : getExpectedConsumption(idade);
      
      const dataPoint: any = {
        idade,
        consumoEsperado: expected,
        consumoEsperadoRange: [Math.max(0, expected - 5), expected + 5]
      };
      
      visitsAtAge.forEach(v => {
        if (v.consumoAcumuladoReal && Number(v.consumoAcumuladoReal) > 0) {
          dataPoint[v.integradoId] = Number(v.consumoAcumuladoReal);
        }
      });

      return dataPoint;
    });
  }, [filteredVisits]);"""

replacement = """  const chartData = useMemo(() => {
    let avgPesoAloj: number | undefined = undefined;
    let dominantTipoLote: 'Misto' | 'Fêmea' | 'Macho' | undefined = undefined;

    if (filteredVisits.length > 0) {
      let totalPeso = 0;
      let countPeso = 0;
      const tiposCount = { 'Misto': 0, 'Fêmea': 0, 'Macho': 0 };
      
      const uniqueIntegrados = new Set();
      // Calculate averages from the latest state of each lot in the filtered set
      [...filteredVisits].sort((a, b) => Number(b.idade) - Number(a.idade)).forEach(v => {
        if (!uniqueIntegrados.has(v.integradoId)) {
          uniqueIntegrados.add(v.integradoId);
          if (v.pesoAloj) {
             totalPeso += Number(v.pesoAloj);
             countPeso++;
          }
          if (v.tipoLote) {
             tiposCount[v.tipoLote as keyof typeof tiposCount] = (tiposCount[v.tipoLote as keyof typeof tiposCount] || 0) + 1;
          }
        }
      });
      
      if (countPeso > 0) {
         avgPesoAloj = totalPeso / countPeso;
      }
      
      let maxCount = -1;
      Object.entries(tiposCount).forEach(([tipo, count]) => {
         if (count > maxCount) {
            maxCount = count;
            dominantTipoLote = tipo as any;
         }
      });
    }

    // Generates points for the expected curve (weekly + end of batch)
    const ages = new Set<number>();
    for (let i = 1; i <= 100; i += 7) {
      ages.add(i);
    }
    ages.add(100);

    filteredVisits.forEach(v => ages.add(Number(v.idade)));

    const sortedAges = Array.from(ages).sort((a, b) => a - b);

    return sortedAges.map(idade => {
      const visitsAtAge = filteredVisits.filter(v => Number(v.idade) === idade);
      
      // Calculate a stable expected consumption using the overall average pesoAloj and dominant tipoLote
      const expected = getExpectedConsumption(idade, dominantTipoLote, avgPesoAloj);
      
      const dataPoint: any = {
        idade,
        consumoEsperado: expected,
        consumoEsperadoRange: [Math.max(0, expected - 5), expected + 5]
      };
      
      visitsAtAge.forEach(v => {
        if (v.consumoAcumuladoReal && Number(v.consumoAcumuladoReal) > 0) {
          dataPoint[v.integradoId] = Number(v.consumoAcumuladoReal);
        }
      });

      return dataPoint;
    });
  }, [filteredVisits]);"""

if target in content:
    with open('src/components/Dashboard.tsx', 'w') as f:
        f.write(content.replace(target, replacement))
    print("Patched successfully")
else:
    print("Target not found")
