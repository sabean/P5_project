

// DNA class for creating a phrase or phrases
class DNA {
    // genes and fitness properties
    constructor(genes) {
        if (genes) {
            this.genes = genes;
        } else {
            this.genes = [];
            this.fitness = 0;
            for (let i = 0; i < lifespan; i++) {
                this.genes[i] = p5.Vector.random2D();
                this.genes[i].setMag(maxforce);
            }
        }
        
    }
    crossover(partner) {
        var newgenes = [];
        var mid = floor(random(this.genes.length));
        for(var i = 0; i < this.genes.length; i++){
            if(i > mid){
                newgenes[i] = this.genes[i];
            } else {
                newgenes[i] = partner.genes[i];
            }
        }
        return new DNA(newgenes);
    }
    mutation() {
        for(var i = 0; i < this.genes.length; i++){
            if(random(1) < 0.01) {
                this.genes[i] = p5.Vector.random2D();
                this.genes[i].setMag(maxforce);
            }
        }
    }
}