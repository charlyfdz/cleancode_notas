## Singleton patron: 
Pros:
- Guarantees a single instance of the class throughout the entire application

Cons:
- Lives in a global context
- Can be modified by anyone and at any time
- Not traceable
- Difficult to test due to its location

example:
#####javascript

```javascript
const Singleton = (function () {
    
    let instance;

    function createInstance() {
        return new Object('I am the instance');
    }

    return {
        getInstance() {
            if (!instance) {
                instance = createInstance();
            }
            return instance;
        }
    };
})();

function main() {

    const instance1 = Singleton.getInstance();
    const instance2 = Singleton.getInstance();

    console.log('Misma instancia? ', (instance1 === instance2)); //true
}

main();

```


