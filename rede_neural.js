// função somatoria 
/**
 * 
 * @param {vetor somatoria} arr 
 * @returns 
 */
function funcaoSomatoria(arr=[]){
    return arr.reduce((acumulador, proximo)=> acumulador + proximo);
}
//função gradiente... descida dop gradiente 
/// diferença entre o valor obitido e o valor esperado 
function gradienteDescendente(n=0){
    //sigmoid
    return n *(1-n);
}
/**
 * 
 * @param {entrada do neuronio} entradas 
 * @param {resultado q queremos} alvo 
 * @param {vezes de trainamentos} epocas_treino 
 */
function feedForward(entradas=[], alvo=0, epocas_treino=1){
    if(alvo<=0) alvo=0.1;
    else if(alvo>=1) alvo=1;

    let peso = [];
    for(let i=0; i<entradas.length; i++){
        peso.push(Math.random());
    }
    //percorrer a quantidade de epocas de treinamento
    for(let i=1;i<=epocas_treino; i++){
        let multiplicar = [];
        // percorre entradas
        for(let j=0; j<entradas.length; j++){
            if(entradas[j]<=0) entradas[j] = 0.1;
            //multiplica peso por entrada
            multiplicar.push(entradas[j]*peso[j]);
        }

        let somatoria = funcaoSomatoria(multiplicar);
        let saida = parseFloat(Math.tanh(somatoria)).toFixed(4);

        let erro = parseFloat(Math.abs(alvo - saida)).toFixed(4);

        for(let j=0; j<entradas.length; j++){
            peso[j] += entradas[j] * gradienteDescendente(erro);
        }

        let epoca = i.toString().padStart(7,"0");
        console.log(`época: ${epoca} - taxa de erro: ${erro} - saída: ${saida}`);

    }

}

feedForward([2, 1], 0.1, 500);