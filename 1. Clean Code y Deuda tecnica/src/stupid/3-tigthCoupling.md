# The ideal is to have low coupling and good cohesion



### cohesion

Cohesion refers to what the class (or module) can do.

Low cohesion means that the class performs a wide variety of actions: it is broad, it does not focus on what it should do

High cohesion means that the class focuses on what it should be doing, i.e. only methods related to the intent of the class

![](https://enterprisecraftsmanship.com/images/2015/2015-09-02-1-03.png)
> reference: [Links]https://enterprisecraftsmanship.com/posts/cohesion-coupling-difference


### Coupling

Refers to how related or dependent two classes or modules are on each other

- Low coupling, changing something important in one class should not affect the other

- High coupling, it would make it difficult to change and maintain your code, since the classes are closely knit, making a change might require a complete system revamp

#### disadvantages of high coupling:
- A change in one module usually causes a domino effect of changes in other modules
- Module assembly may require more effort and/or time due to higher dependency between modules
- A particular module may be more difficult to reuse and/or test because dependent modules must be included.

#### solutions:

- "A" has an attribute that refers to "B"

- "A" calls the services of an object "B"

- "A" has a method that references "B" (via return type or parameter)

- "A" is a subclass of (or implements) class "B"



example:

##### high-coupling
```typescript
(()=>{
    // No aplicando el principio de responsabilidad única
    type Gender = 'M'|'F';

    // high coupling

    /*this a a low coupling class but if we change it, all the classes that extends this class have to be changes**/
    class Person {
        constructor(
            public firstName: string,
            public lastName: string
            public gender: Gender,
            public birthdate: Date,
        ){}
    }

    class User extends Person {
        constructor(
            public email: string,
            public role: string,
            private lastAccess: Date,
            name: string,
            gender: Gender,
            birthdate: Date,
        ){
            super(name, gender, birthdate);
            this.lastAccess = new Date();
        }

        checkCredentials() {
            return true;
        }
    }


class UserSettings extends User {
    constructor(
        public workingDirectory: string,
        public lastFolderOpen: string,
        email     : string,
        role      : string,
        name      : string,
        gender    : Gender,
        birthdate : Date,
    ){
        super(
            email,
            role,
            new Date(),
            name,
            gender,
            birthdate
        )
    }
}
    


    const userSettings = new UserSettings(
        '/urs/home',
        '/development',
        'carlos@google.com',
        'F',
        'Carlos',
        'M',
        new Date('1996-10-22')
    );

    console.log({ userSettings, credentials: userSettings.checkCredentials() });
    
})()


```

### low-coupling
```typescript
(()=>{
    // Aplicando el principio de responsabilidad única
    // Prioriza la composición frente a la herencia

    type Gender = 'M'|'F';

    //in this example, Person class only have coupling with UserSettings class, 

    interface PersonProps {
        name     : string;
        gender   : Gender;
        birthdate: Date;
    }

    class Person {
        public name     : string;
        public gender   : Gender;
        public birthdate: Date;

        constructor({ name, gender, birthdate }: PersonProps ){
            this.name = name;
            this.gender = gender;
            this.birthdate = birthdate;
        }
    }


    interface UserProps {
        email     : string;
        role      : string;
    }
    class User {

        public email       : string;
        public role        : string;
        private lastAccess : Date;

        constructor({ email, role }: UserProps ){
            this.lastAccess = new Date();
            this.email = email;
            this.role = role;
        }

        checkCredentials() {
            return true;
        }
    }


    interface SettingsProps {
        lastFolderOpen  : string;
        workingDirectory: string;
    }

    class Settings {
        public workingDirectory: string; 
        public lastFolderOpen  : string; 

        constructor({ workingDirectory, lastFolderOpen }: SettingsProps ){
            this.workingDirectory = workingDirectory;
            this.lastFolderOpen = lastFolderOpen;
        }
    }
    
    
    // Nuevo User Settings
    interface UserSettingsProps {
        birthdate       : Date;
        email           : string;
        gender          : Gender;
        lastFolderOpen  : string;
        name            : string;
        role            : string;
        workingDirectory: string;
    }

    class UserSettings {
        // constructor(
        //     public person: Person,
        //     public user  : User,
        //     public settings: Settings,
        // ){}
        public person  : Person;
        public user    : User; 
        public settings: Settings;

        constructor({ 
            name, gender, birthdate,
            email, role,
            workingDirectory, lastFolderOpen,
        }: UserSettingsProps) {
            this.person = new Person({ name, gender, birthdate });
            this.user = new User({ email, role });
            this.settings = new Settings({ workingDirectory, lastFolderOpen })
        }
    }
    


    const userSettings = new UserSettings({
        birthdate: new Date('1996-10-22'),
        email: 'carlos@google.com',
        gender: 'M',
        lastFolderOpen: '/home',
        name: 'Carlos',
        role: 'Admin',
        workingDirectory: '/usr/home'
    });

    console.log({ userSettings, credentials: userSettings.user.checkCredentials() });
    
})()

```