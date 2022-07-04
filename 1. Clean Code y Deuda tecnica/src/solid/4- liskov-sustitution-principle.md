# Liskov sustitution principle

If "U" is a subtype of "T", then any instance of "T" should be able to be substituted for any instance of "U" without altering system properties


> liskov-a.ts

```typescript


import { Tesla, Audi, Toyota, Honda } from './liskov-b';

(() => {
    
    const printCarSeats = ( cars: Vehicle() ) => {
        
        //for (const car of cars) {
        // 
        //    if( car instanceof Tesla ) {
        //        console.log( 'Tesla', car.getNumberOfSeats() )
        //        continue;
        //    }
        //    if( car instanceof Audi ) {
        //        console.log( 'Audi', car.getNumberOfSeats() )
        //        continue;
        //    }
        //    if( car instanceof Toyota ) {
        //        console.log( 'Toyota', car.getNumberOfSeats() )
        //        continue;
        //    }
        //    if( car instanceof Honda ) {
        //        console.log( 'Honda', car.getNumberOfSeats() )
        //        continue;
        //    }         

        //}

        cars.forEach(car=>{
            console.log(car.constructor.name, car.getNumberOfSeats());
        });
        
    }   
    const cars = [
        new Tesla(7),
        new Audi(2),
        new Toyota(5),
        new Honda(5),
    ];


    printCarSeats( cars );

})();

```

> liskov-b.ts

```typescript

export abstract class Vehicle{

    abstract getNumberOfSeats():number;

}


export class Tesla extends Vehicle{

    constructor( private numberOfSeats: number ) {
        super()
    }

    getNumberOfSeats() {
        return this.numberOfSeats;
    }
}

export class Audi extends Vehicle{

    constructor( private numberOfSeats: number ) {
        super()
    }

    getNumberOfSeats() {
        return this.numberOfSeats;
    }
}

export class Toyota extends Vehicle{

    constructor( private numberOfSeats: number ) {
        super()
    }

    getNumberOfSeats() {
        return this.numberOfSeats;
    }
}

export class Honda extends Vehicle{

    constructor( private numberOfSeats: number ) {
        super()
    }

    getNumberOfSeats() {
        return this.numberOfSeats;
    }
}

```