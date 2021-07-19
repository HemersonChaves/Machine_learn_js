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
function feedForward(entradas=[], alvo=0, epocas_treino=1, func_ativacao= "sigmoide"){
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

        let saida = 0;
        switch(func_ativacao){
            case "tang_hiperbolica":saida  = parseFloat(tangenteHiperbolica(somatoria)).toFixed(4); break;
            case "relu": saida  = parseFloat(relu(somatoria)).toFixed(4); break;
            case "leakyRelu":saida  = parseFloat(leakyRelu(somatoria)).toFixed(4); break;
            case "binaryStep":saida  = parseFloat(binaryStep(somatoria)).toFixed(4); break;
            case "sigmoide": saida =  parseFloat(sigmoide(somatoria)).toFixed(4); break;
            
            default: saida =  parseFloat(sigmoide(somatoria)).toFixed(4);
        }
        

        let erro = parseFloat(Math.abs(alvo - saida)).toFixed(4);

        for(let j=0; j<entradas.length; j++){
            if(entradas[j]<=0) entradas[j] = 0.1;
            peso[j] += entradas[j] * gradienteDescendente(erro);
        }

        let epoca = i.toString().padStart(7,"0");
        console.log(`época: ${epoca} - taxa de erro: ${erro} - saída: ${saida}`);

    }

}

// ## Funções de ativação
// tangente hiperbolica: retorna valores entre -1 e 1
function tangenteHiperbolica(n=0) {return Math.sinh(n)/Math.cosh(n);}
// função sigmóide: retorna valores entre 0 e 1
function sigmoide(n=0) {return 1/ (1+ Math.pow(Math.E, -n));}
// unidade linear retificada (relu): retorna somente valores nulos e positivos
function  relu(n=0){return Math.max(n, 0); }
// unidade linear retificada com vazamento (leaky relu): retorna somente valores maiores que zero
function  leakyRelu(n=0){return Math.max(n, 0.01); }
// passo binário: retorna somente 0 e 1 
function binaryStep(n=0){return (n>= 0)? 1 : 0;} 

feedForward([0], 0.1, 800);