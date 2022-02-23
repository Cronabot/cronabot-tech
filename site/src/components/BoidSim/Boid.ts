import p5Types from 'p5';

class Boid {
    position: p5Types.Vector;
    velocity: p5Types.Vector;
    acceleration: p5Types.Vector;
    size: number = 3;
    maxSpeed: number;
    maxForce: number;

    constructor(p5: p5Types) {
        this.position = p5.createVector(
            p5.random(p5.width),
            p5.random(p5.height)
        );
        this.velocity = p5.createVector(p5.random(-1, 1), p5.random(-1, 1));
        this.velocity.setMag(p5.random(2, 4));
        this.acceleration = p5.createVector();
        this.maxSpeed = 3;
        this.maxForce = 0.5;
    }

    flock(p5: p5Types, boids: Boid[]) {
        let separationForce = this.separation(p5, boids);
        let alignmentForce = this.alignment(p5, boids);
        let cohesionForce = this.cohesion(p5, boids);

        let mousePos = p5.createVector(p5.mouseX, p5.mouseY);
        let mouseAttractionForce = this.attraction(p5, mousePos);

        separationForce.mult(1.5);
        alignmentForce.mult(1);
        mouseAttractionForce.mult(-2);

        this.acceleration.add(separationForce.div(this.size));
        this.acceleration.add(alignmentForce.div(this.size));
        this.acceleration.add(cohesionForce.div(this.size));
        this.acceleration.add(mouseAttractionForce.div(this.size));
    }

    steerTo(target: p5Types.Vector) {
        let desired = p5Types.Vector.sub(target, this.position);
        desired.normalize();
        desired.mult(this.maxSpeed);
        let steer = p5Types.Vector.sub(desired, this.velocity);
        steer.limit(this.maxForce);
        return steer;
    }

    separation(p5: p5Types, boids: Boid[]) {
        let perception = 25;
        let steer = p5.createVector(0, 0);
        let count = 0;
        for (let i = 0; i < boids.length; i++) {
            let d = p5Types.Vector.dist(this.position, boids[i].position);
            if (d > 0 && d < perception) {
                let diff = p5Types.Vector.sub(this.position, boids[i].position);
                diff.normalize();
                diff.div(d ^ (d * 10));
                steer.add(diff);
                count++;
            }
        }
        if (count > 0) {
            steer.div(count);
        }

        if (steer.mag() > 0) {
            steer.normalize();
            steer.mult(this.maxSpeed);
            steer.sub(this.velocity);
            steer.limit(this.maxForce);
        }
        return steer;
    }

    alignment(p5: p5Types, boids: Boid[]) {
        let neighbordist = 50;
        let sum = p5.createVector(0, 0);
        let count = 0;
        for (let i = 0; i < boids.length; i++) {
            let d = p5Types.Vector.dist(this.position, boids[i].position);
            if (d > 0 && d < neighbordist) {
                sum.add(boids[i].velocity);
                count++;
            }
        }
        if (count > 0) {
            sum.div(count);
            sum.normalize();
            sum.mult(this.maxSpeed);
            let steer = p5Types.Vector.sub(sum, this.velocity);
            steer.limit(this.maxForce);
            return steer;
        } else {
            return p5.createVector(0, 0);
        }
    }

    cohesion(p5: p5Types, boids: Boid[]) {
        let neighbordist = 50;
        let sum = p5.createVector(0, 0);
        let count = 0;
        for (let i = 0; i < boids.length; i++) {
            let d = p5Types.Vector.dist(this.position, boids[i].position);
            if (d > 0 && d < neighbordist) {
                sum.add(boids[i].position);
                count++;
            }
        }
        if (count > 0) {
            sum.div(count);
            return this.steerTo(sum);
        } else {
            return p5.createVector(0, 0);
        }
    }

    attraction(p5: p5Types, target: p5Types.Vector) {
        let radius = 100;
        if (p5Types.Vector.dist(this.position, target) < radius) {
            return this.steerTo(target);
        }
        return p5.createVector(0, 0);
    }

    update(p5: p5Types) {
        this.velocity.add(this.acceleration);
        this.velocity.limit(this.maxSpeed);
        this.position.add(this.velocity);
        this.acceleration.mult(0);

        if (this.position.x > p5.width) {
            this.position.x = 0;
        } else if (this.position.x < 0) {
            this.position.x = p5.width;
        }
        if (this.position.y > p5.height) {
            this.position.y = 0;
        } else if (this.position.y < 0) {
            this.position.y = p5.height;
        }
    }

    draw(p5: p5Types) {
        let theta = this.velocity.heading() + p5.radians(90);
        p5.fill('rgb(21,21,21)');
        p5.stroke('rgb(50,89,91)');
        p5.push();
        p5.translate(this.position.x, this.position.y);
        p5.rotate(theta);
        p5.beginShape();
        p5.vertex(0, -this.size * 2);
        p5.vertex(-this.size, this.size * 2);
        p5.vertex(this.size, this.size * 2);
        p5.endShape(p5.CLOSE);
        p5.pop();
    }
}

export default Boid;
