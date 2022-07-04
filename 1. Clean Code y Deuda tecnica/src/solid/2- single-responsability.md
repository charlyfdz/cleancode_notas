# SRP - Single Responsability Principle

> "There should never be more than one reason to change a class or module"
- Tobert C. Martin

Have a single responsibility != do a single thing
This principle is based on creating components that are only exposed to a single source of change.


#### Detect violations of the principle
- Name of classes and/or models too generic
- Changes in the code usually affect the class or module
- Class involves multiple layers
- A large number of imports
- High number of public methods


example

```typescript

(() => {

    interface Product { 
        id:   number;
        name: string;
    }
    
    // Usualmente, esto es una clase para controlar la vista que es desplegada al usuario
    class ProductBloc {
    
        loadProduct( id: number ) {
            // Realiza un proceso para obtener el producto y retornarlo
            console.log('Producto: ',{ id, name: 'OLED Tv' });
        }
    
        saveProduct( product: Product ) {
            // Realiza una petición para salvar en base de datos 
            console.log('Guardando en base de datos', product );
        }
    
        notifyClients() {
            console.log('Enviando correo a los clientes');
        }
    
        onAddToCart( productId: number ) {
            // Agregar al carrito de compras
            console.log('Agregando al carrito ', productId );
        }
    
    }
    


    const productBloc = new ProductBloc();

    productBloc.loadProduct(10);
    productBloc.saveProduct({ id: 10, name: 'OLED TV' });
    productBloc.notifyClients();
    productBloc.onAddToCart(10);


})();


```

#### Using the single responsability principle

```typescript

(() => {

    interface Product { 
        id:   number;
        name: string;
    }
    
    // Usualmente, esto es una clase para controlar la vista que es desplegada al usuario

    class ProductService {

        //private httpAdapter: Object;

        getProduct( id: number ){
            console.log('Product': { id:name, 'OLED TV' });
        }

        saveProduct( product: Product ){
            console.log( 'Guardado en base de datos', product )
        }

    }

    class Mailer{

        private masterEmail : string = 'email@mail.com';

        sendEmail( emailList:string[], template:'toclients'|'to-admins){
            console.log( 'Enviando correo a los clientes', template) ;
        }

    }

    class ProductBloc {

        private productService : ProductService;
        private mailer : Mailer;

        constructor( productService:ProductService, mailer: Mailer ){
            this.productService =  productService;
            this.mailer = mailer;
        }
    
        loadProduct( id: number ) {
            // Realiza un proceso para obtener el producto y retornarlo
            this.productSeriver.getProduct( id )
        }
    
        saveProduct( product: Product ) {
            // Realiza una petición para salvar en base de datos 
            this.productService.saveProduct(product)
        }
    
        notifyClients(){
            this.mailer.sendEmail(['user@mail.com'],'to-clients')
        }
    }

    class CartBloc {
        
        private itemInCart: Object[] = []
        
        addToCart( productId: number ) {
            // Agregar al carrito de compras
            console.log('Agregando al carrito ', productId );
        }

    }

    const productService = new ProductService();
    const mailer =  new Mailer();
    

    const productBloc = new ProductBloc( productService, mailer);
    const cartBloc =  new CartBloc()

    productBloc.loadProduct(10);
    productBloc.saveProduct({ id: 10, name: 'OLED TV' });
    productBloc.notifyClients();
    cartBloc.onAddToCart(10);


})();


```
