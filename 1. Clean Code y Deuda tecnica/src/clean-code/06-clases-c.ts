(()=>{

    //ejemplo de principio de responsabilidad única
    //priorizar la composicion frente a la herencia
    //evitemos usar los extends en la herencia de las clases
    //creamos una clase que prioriza la compoción de cada una de las clases permitiendo que sean propias 

    type Gender = "M" | "F";

    interface PersonProps{
        name      : string;
        gender    : Gender;
        birthdate : Date;
    }
    
    class Person {
        public name     : string;
        public gender   : Gender;
        public birthdate: Date;

        constructor({name, gender, birthdate}: PersonProps){
            
            this.name      = name;
            this.gender    = gender;
            this.birthdate = birthdate;

        }
    }

    interface UserProps{
        email    : string;
        role     : string;
    }

    class User{
        public lastAccess : Date;
        public email      :string;
        public role       :string;

        constructor({email,role}: UserProps){
            
            this.lastAccess = new Date();
            this.email=email;
            this.role=role;
        }

        checkCredentials(){
            return true;
        }
    }


    interface SettingProps{
        workingDirectory : string;
        lastOpenFolder   : string;
    }

    class Settings{
        
        public workingDirectory : string;
        public lastOpenFolder   : string;

        constructor({workingDirectory,lastOpenFolder}:SettingProps){
            
            this.workingDirectory = workingDirectory;
            this.lastOpenFolder = lastOpenFolder;

        }
    }

    interface UserSettingProps{
        workingDirectory : string;
        lastOpenFolder   : string;
        email            : string;
        role             : string;
        name             : string;
        gender           : Gender;
        birthdate        : Date;
    }

    class UserSettings{
        public person   : Person;
        public user     : User;
        public settings : Settings;

        constructor({
            name, gender, birthdate,
            email, role,
            workingDirectory, lastOpenFolder
        }:UserSettingProps){

            this.person = new Person({ name, gender, birthdate });
            this.user = new User({ email, role });
            this.settings = new Settings({workingDirectory,lastOpenFolder});

        }
    }

    const userSettings = new UserSettings({
        workingDirectory : '/usr/home',
        lastOpenFolder   : '/home',
        email            : 'carlos@gmail.com',
        role             : 'Admin',
        name             : 'Carlos',
        gender           : 'M',
        birthdate        :  new Date('1996/01/07'),
    });


    console.log({userSettings})

})();