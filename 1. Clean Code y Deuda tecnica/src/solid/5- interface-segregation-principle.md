# Insterface segmentation principle

Clients should not be forced to rely on interfaces that they do not use

#### Detect violations of the Interfaces principle

- If the interfaces we design force us to violate the principles of single responsibility and Liskov substitution
- 
 
```typescript

interface Bird{
    eat(): void;
}

interface FlyingBird{
    fly():void;
}

interface RunningBird{
    run():void;
}

interface SwimmerBird{
    swim(): void;
}

class Tucan implements Bird, FlyingBird {
    public fly(){}
    public eat(){}
}

class Humminbird implements Bird, FlyingBird {
    public fly(){}
    public eat(){}
}

class Ostrich implements Bird, RunningBird{
    public eat(){}
    public run(){}
}

class Pengin implements Bird, RunnigBird, SwimmerBird{
    public eat(){}
    public run(){}
    public swim(){}
}


```
