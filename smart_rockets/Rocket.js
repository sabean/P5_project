
class Rocket {
    constructor(dna) {
        this.pos = createVector(width/2,height);
        this.vel = createVector();
        this.acc = createVector();
        this.completed = false;
        this.crashed = false;
        this.timestep = 0;
        this.totalfit = 0;
        if(dna) {
            this.dna = dna;
        } else {
            this.dna = new DNA();
        }
        this.fitness = 0;
        this.superfit = 0;
    }

    applyForce(force) {
        this.acc.add(force);
    }

    update() {
        var d = dist(this.pos.x, this.pos.y, target.x, target.y);
        if(d < 10) {
            this.completed = true;
            this.pos = target.copy();
        }
        if(this.pos.x > rx && this.pos.x < rx + rw && this.pos.y > ry && this.pos.y < ry + rh){
            this.crashed = true;
        }
        if(this.pos.x > width || this.pos.x < 0){
            this.crashed = true;
        }
        if(this.pos.y > height || this.pos.y < 0){
            this.crashed = true;
        }
        
        if(!this.completed && !this.crashed){
            this.applyForce(this.dna.genes[count]);
            this.vel.add(this.acc);
            this.pos.add(this.vel);
            this.acc.mult(0);
            this.vel.limit(4);
            this.timestep+=1;
            if(this.timestep > 2000) {
                count = 0;
                this.timestep = 600;
            }
        }
    }

    show() {
        push();
        noStroke();
        fill(255,150);
        translate(this.pos.x, this.pos.y);
        rotate(this.vel.heading());
        rectMode(CENTER);
        rect(0,0,25,5);
        pop()
    }
    
    calcFitness() {
        var d = dist(this.pos.x, this.pos.y, target.x, target.y);
        this.superfit = map(d,0,width,width,0);
        if(this.completed){
            this.fitness *= 10;
        }
        if(this.crashed){
            this.fitness /= 10;
        }
    }
    calcSuperFitness(mfit) {
        this.superfit = map(this.timestep,0,mfit,0,width);
        if(this.completed){
            this.superfit *= 10;
        }
        if(this.crashed){
            this.superfit /= 10;
        }
    }
}
