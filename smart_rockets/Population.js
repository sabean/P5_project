
class Population {
    constructor() {
        this.rockets = [];
        this.popsize = 50;
        this.matingpool = [];
        for (var i = 0; i < this.popsize; i++) {
            this.rockets[i] = new Rocket();
        }
    }
    evaluate() {
        var maxfit = 0;
        var maxtime = 0;
        var total = 0
        for (var i = 0; i < this.popsize; i++) {
            this.rockets[i].calcFitness();
            if(this.rockets[i].fitness > maxfit){
                maxfit = this.rockets[i].fitness;
            }
            if(this.rockets[i].timestep > maxtime){
                maxtime = this.rockets[i].superfit;
            }
        }
        for(var i = 0; i < this.popsize; i++) {
            this.rockets[i].calcSuperFitness(maxtime);
            this.rockets[i].totalfit = 0.7*this.rockets[i].fitness + 0.3*this.rockets[i].superfit;
        }
        total = 0.7*maxfit+0.3*maxtime;
        for (var i = 0; i < this.popsize; i++) {
            //this.rockets[i].fitness /= maxfit;
            this.rockets[i].totalfit /= total;
        }

        this.matingpool = [];
        for (var i = 0; i < this.popsize; i++) {
            //var n = this.rockets[i].fitness*100;
            var n = this.rockets[i].totalfit*100;
            for (var j = 0; j < n; j++) {
                this.matingpool.push(this.rockets[i]);
            }
            //this.rockets[i].fitness /= maxfit;
            this.rockets[i].totalfit /= total;
        }
    }
    selection() {
        var newRockets = [];
        for (var i = 0; i < this.rockets.length; i++) {
            var parentA = random(this.matingpool).dna;
            var parentB = random(this.matingpool).dna;
            var child = parentA.crossover(parentB);
            child.mutation();
            newRockets[i] = new Rocket(child);
        }
        this.rockets = newRockets;
        
    }
    run() {
        for (var i = 0; i < this.popsize; i++) {
            this.rockets[i].update();
            this.rockets[i].show();
        }
    }
    motion() {
        var innercount = 0;
        for (var i = 0; i < this.popsize; i++) {
            if (this.rockets[i].completed == true || this.rockets[i].crashed == true){
                innercount++;
            }
        }
        if(innercount == this.popsize){
            return true;
        } 
        return false;
    }
}