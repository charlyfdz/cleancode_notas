# Dependency onversion principle

The most important components are those focused on solving the underlying business problem, that is, the domain layer.
The least important are those that are close to the infrastructure, that is, those related to the UI, persistence, communication with external APIs, etc.

![]( https://miro.medium.com/max/1838/1*yR4C1B-YfMh5zqpbHzTyag.png)

- High level modules should not depend on low level modules
- Both should depend on abstractions
- Abstractions should not depend on details
- Details should depend on abstractions

One of the most important reasons why the business rules or domain layer must depend on abstractions or interfaces and not on concretions is that it increases their tolerance to change.
Every change in an abstract component implies a change in its implementation.
In contrast, changes to concrete implementations, most of the time, do not require changes to the interfaces they implement.

A simple solution is Dependency Injection
Dependency in programming, means that a module or component requires another to be able to carry out its work
At some point our program or application will be made up of many modules. When this happens, it is when we must use dependency injection.


example

> dependency-a.ts
```typescript

import { PostService } from './dependency-b';
import {JsonDataBaseService} from './dependency-c'

// Main
(async () => {

    //const provider = new JsonNewDataBaseService();
    //const provider = new LocalDataBaseService();
    const provider = new HttpAPIService();
    
    const postService = new PostService( provider );
    const posts = await postService.getPosts();

    console.log({ posts })

})();

```

> dependency-b.ts

```typescript

import { PostProvider } from "./dependency-c";

export interface Post {
    body:   string;
    id:     number;
    title:  string;
    userId: number;
}


export class PostService {

    private posts: Post[] = [];

    constructor(private postProvider : PostProvider) {}

    async getPosts() {
        this.posts = await this.postProvider.getPosts();
        return this.posts;
    }
}

```

> dependency-c.ts

```typescript

import localPosts from './local-database.json'
import {Post} from './dependency-b'

export abstract class PostProvider{

    abstract getPosts(): Promise<Post[]>

}

export class LocalDataBaseService implements PostProvider {

    constructor() {}

    async getPosts() {
        return [
            {
                'userId': 1,
                'id': 1,
                'title': 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
                'body': 'quia et suscipit suscipit recusandae consequuntur expedita et cum reprehenderit molestiae ut ut quas totam nostrum rerum est autem sunt rem eveniet architecto'
            },
            {
                'userId': 1,
                'id': 2,
                'title': 'qui est esse',
                'body': 'est rerum tempore vitae sequi sint nihil reprehenderit dolor beatae ea dolores neque fugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis qui aperiam non debitis possimus qui neque nisi nulla'
            }]
    }

}

export class JsonDataBaseService implements PostProvider {

    async getPosts() {
        return localPosts;
    }

}   


export class WebAPIService implements PostProvider {

  async getPosts(): Promise<Post[]>{
    const resp = await fetch('https://jsonplaceholder.typicode.com/posts');
    const posts = await resp.json();
  }

}

```

> local-database.json

```typescript
[
  {
    "userId": 1,
    "id": 1,
    "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
    "body": "quia et suscipit suscipit recusandae consequuntur expedita et cum reprehenderit molestiae ut ut quas totam nostrum rerum est autem sunt rem eveniet architecto"
  },
  {
    "userId": 1,
    "id": 2,
    "title": "qui est esse",
    "body": "est rerum tempore vitae sequi sint nihil reprehenderit dolor beatae ea dolores neque fugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis qui aperiam non debitis possimus qui neque nisi nulla"
  },
  {
    "userId": 1,
    "id": 3,
    "title": "ea molestias quasi exercitationem repellat qui ipsa sit aut",
    "body": "et iusto sed quo iure voluptatem occaecati omnis eligendi aut ad voluptatem doloribus vel accusantium quis pariatur molestiae porro eius odio et labore et velit aut"
  },
  {
    "userId": 1,
    "id": 4,
    "title": "eum et est occaecati",
    "body": "ullam et saepe reiciendis voluptatem adipisci sit amet autem assumenda provident rerum culpa quis hic commodi nesciunt rem tenetur doloremque ipsam iure quis sunt voluptatem rerum illo velit"
  },
  {
    "userId": 1,
    "id": 5,
    "title": "nesciunt quas odio",
    "body": "repudiandae veniam quaerat sunt sed alias aut fugiat sit autem sed est voluptatem omnis possimus esse voluptatibus quis est aut tenetur dolor neque"
  }
]

```