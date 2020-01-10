// Creating a random character
var newChar = () => {
    let c = Math.floor(Math.random()*60)+63;
    //let c = floor(random(63, 122));
    if (c === 63) c = 32;
    if (c === 64) c = 46;
  
    return String.fromCharCode(c);
};

// DNA class for creating a phrase or phrases
class DNA {
    // genes and fitness properties
    constructor(num) {
        this.genes = [];
        this.fitness = 0;
        for (let i = 0; i < num; i++) {
            this.genes.push(newChar());
        }
    }

    //g converting the list into string
    getPhrase() {
        return this.genes.join("");
    }

    // calculating how close is our guess with target
    // fitness function
    calcFitness(target) {
        let score = 0;
        for (let i = 0; i < this.genes.length; i++) {
            if (this.genes[i] == target.charAt(i)) {
                score++;
            }
        }
        this.fitness = score / target.length;
    }

    // child is a mix of two parents
    crossover(partner) {
        // new child
        let child = new DNA(this.genes.length);
        let midpoint = Math.floor(Math.random()*this.genes.length);
        //let midpoint = floor(random(this.genes.length));
        for(let i = 0; i < this.genes.length; i++) {
            if(i > midpoint) child.genes[i] = this.genes[i];
            else child.genes[i] = partner.genes[i];
        }
        return child
    }

    // Mutation of the child according to the rate
    mutate(mutationRate) {
        for(let i = 0; i < this.genes.length; i++) {
            let x  = Math.random();
            if (x < mutationRate) {
                this.genes[i] = newChar();
            }
        }   
    }
}