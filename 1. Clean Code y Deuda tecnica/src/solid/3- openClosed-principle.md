# Open and Close Principle

It depends a lot on the context

States that software entities (classes, modules, methods, etc.) must be open for extension but closed for modification

The principle can be achieved even with the use of inheritance or by composition design patterns such as the strategy pattern.

### Detect violations early

- Changes normally affect our class or module
- When a class or module affects many layers. (Presentation, storage, etc...)


#### open-close-a.ts

```typescript
import { PhotosService, PostService, TodoService } from './open-close-b';
import {HttpClient} from './open-close-c'

(async () => {

    const httpClient = new HttpClient();

    const todoService = new TodoService(httpClient);
    const postService = new PostService(httpClient);
    const photosService = new PhotosService(httpClient);

    const todos = await todoService.getTodoItems();
    const posts = await postService.getPosts();
    const photos = await photosService.getPhotos();
    
    
    console.log({ todos, posts, photos });
    

})();

```

#### open-close-b.ts

```typescript
// Hay que agregar la dependencia de axios ```yarn add axios```
//import axios from 'axios';

import {Httpclient} from './open-close-c';

export class TodoService { 

    constructor(private http: HttpClient){}

    async getTodoItems() {
        const { data } = await this.http.get('https://jsonplaceholder.typicode.com/todos/');
        return data;
    }
}


export class PostService {

    constructor(private http: HttpClient){}

    async getPosts() {
        const { data } = await this.http.get('https://jsonplaceholder.typicode.com/posts');
        return data;
    }
}


export class PhotosService {

    constructor(private http: HttpClient){}

    async getPhotos() {
        const { data } = await this.http.get('https://jsonplaceholder.typicode.com/photos');
        return data;
    }

}

```


### open-close-c.ts

```typescript
//si cambiamos axios unicamente tenemos que cambiar esta clase, el resto funciona correctamente
import axios from 'axios';

export class HttpClient{

    async get( url: string ){
        const {data, status } = await axios.get(url);
        console.log({status})
        return {data,status}
    }

}




```