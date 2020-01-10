const scale = (num, in_min, in_max, out_min, out_max) => {
    return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

class Population {
    constructor(p, m, num) {
        this.population; // Array to hold current population
        this.matingPool; // ArrayList for "mating pool"
        this.generations = 0;
        this.completed = false;
        this.target = p;
        this.mutationRate = m;
        this.perfectScore = 1;

        this.best = "";

        this.population = [];
        for(let i = 0; i < num; i++) {
            this.population[i] = new DNA(this.target.length);
        }
        this.matingPool = [];
        this.calcFitness();
    }
    // filling the fitness array with fitness of each element (DNA)
    calcFitness() {
        for(let i = 0; i < this.population.length; i++) {
            this.population[i].calcFitness(this.target);
        }
    }
    // Generate the mating pool
    naturalSelection() {
        // clear ArrayList
        this.matingPool = [];

        let maxFitness = 0;
        for(let i = 0; i < this.population.length; i++) {
            if (this.population[i].fitness > maxFitness) {
                maxFitness = this.population[i].fitness;
            }
        }
        // higher fitness = more frequency of that elem = more likely to be picked
        // lower fitness = lower frequency = less likely to be picked
        for(let i = 0; i < this.population.length; i++) {
            let fitness = scale(this.population[i].fitness, 0, maxFitness, 0, 1);
            //let n = Math.floor(this.fitness*100);
            let n = Math.floor(fitness*100);
            for (let j = 0; j < n; j++) { 
                this.matingPool.push(this.population[i]);
            } 
        } 
        console.log(this.matingPool.length);
    }

    // Create a new generation
    generate() {
        for(let i = 0; i < this.population.length; i++) {
            let a = Math.floor(Math.random()*this.matingPool.length);
            let b = Math.floor(Math.random()*this.matingPool.length);
            //let a = floor(random(this.matingPool.length));
            //let b = floor(random(this.matingPool.length));
            
            let partnerA = this.matingPool[a];
            let partnerB = this.matingPool[b];
            
            let child = partnerA.crossover(partnerB);
            child.mutate(this.mutationRate);
            this.population[i] = child;
        }
        this.generations++; 
    }

    getBest() {
        return this.best;
    }

    evaluate() {
        let worldrecord = 0.0;
        let index = 0;
        for (let i = 0; i < this.population.length; i++) {
            if (this.population[i].fitness > worldrecord) {
                index = i;
                worldrecord = this.population[i].fitness;
            }
        }
        this.best = this.population[index].getPhrase();
        if (worldrecord === this.perfectScore) {
            this.completed = true;
        }
    }
    isFinished() {
        return this.completed;
    }
    getGenerations() {
        return this.generations;
    }
    // Compute average fitness for the population
    getAverageFitness() {
        let total = 0;
        for (let i = 0; i < this.population.length; i++) {
            total += this.population[i].fitness;
        }
        return total / (this.population.length);
    }

    allPhrases() {
        let everything = "";

        let displayLimit = Math.min(this.population.length, 25);

        //let displayLimit = min(this.population.length, 50);
        for (let i = 0; i < displayLimit; i++) {
            everything += this.population[i].getPhrase() + "<br>";
        }
        return everything;
    } 
}