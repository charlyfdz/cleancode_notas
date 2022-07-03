class HtmlElement{

    /****************************************************** */
    /*Lista de propiedades
     * 1- propiedades estaticas
     * 2- propiedades públicas de último
    */
    /****************************************************** */
    public static domReady:boolean=false;

    private _id:string;
    private type:string;
    private updatedAt: number;
    /********************************************************** */


    /****************************************************** */
    /**
     * 1- empezando con los constructores estáticos
     * 2- El contructor
     * 3- Seguidamente de metodos estáticos
     * 4- Métodos privados
     * 5- Resto de métodos de instancia ordenados de mayor a menor importancia
     * 6- Getters y Seeters al final
     */
    /****************************************************** */

    static createInput(id:string){
        return new HtmlElement(id,'input');
    }

    constructor(id:string,type:string){
        this._id = id;
        this.type = type;
        this.updatedAt = Date.now()
    }

    setType(type:string){
        this.type = type;
        this.updatedAt = Date.now();
    }

    get id():string{
        return this.id
    }

    /****************************************************** */



}