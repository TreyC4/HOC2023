const sigmoid = x => 1 / (1 + Math.exp(x));
const rounder = x => round(1 / (1 + Math.exp(x)));

class Network {
  
  constructor(learning_rate) {
    this.learning_rate = learning_rate || 0.1;
  }
  
  fromGenome(genomes) {
    this.input_nodes = 8;
    this.output_nodes = 8;
    this.hidden_nodes = 8;
    this.weights_ih = new Matrix(8, 8);
    this.weights_ho = new Matrix(8, 8);  
    this.bias_h = new Matrix(8, 1);        
    this.bias_o = new Matrix(8, 1);
    genomes = genomes.split('h');
    genomes.pop().split('i').forEach(genome => {
      let arr = ("00000000000" + parseInt(genome, 16).toString(2)).substr(-12).split('');
      if (arr[0] == '1')this.bias_o.data[parseInt(arr.splice(1, 3).join(''), 2)][0] = parseInt(arr.splice(1).join(''), 2);
      else this.bias_h.data[parseInt(arr.splice(1, 3).join(''), 2)][0] = parseInt(arr.splice(1).join(''), 2);
    });
    genomes[0].split('g').forEach((genome, i) => {
      let binary = ("000000000000000" + parseInt(genome, 16).toString(2)).substr(-16).split('');
      const part = parseInt(binary.shift());
      binary = binary.join('').match(/[0-1]{1,3}/g);
      if (part)this.weights_ho.data[parseInt(binary.shift(), 2)][parseInt(binary.shift(), 2)] = parseInt(binary.join(''), 2) / 102.2;
      else this.weights_ih.data[parseInt(binary.shift(), 2)][parseInt(binary.shift(), 2)] = parseInt(binary.join(''), 2) / 102.2;
    });
  }
  
  fromLayers(input_nodes, hidden_nodes, output_nodes) {
    this.input_nodes = input_nodes;
    this.hidden_nodes = hidden_nodes;
    this.output_nodes = output_nodes;
    this.weights_ih = new Matrix(this.hidden_nodes, this.input_nodes);
    this.weights_ho = new Matrix(this.output_nodes, this.hidden_nodes);
    this.weights_ih.randomize();
    this.weights_ho.randomize();
    this.bias_h = new Matrix(this.hidden_nodes, 1);
    this.bias_o = new Matrix(this.output_nodes, 1);
    this.bias_h.randomize();
    this.bias_o.randomize();
  }
  
  ffor (input) {
    let inputs = Matrix.fromArray(input);
    let hidden = Matrix.multiply(this.weights_ih, inputs);
    hidden.add(this.bias_h);
    hidden.map(sigmoid);
    
    let output = Matrix.multiply(this.weights_ho, hidden);
    output.add(this.bias_o);
    output.map(rounder);

    return output.toArray();
  }
}
