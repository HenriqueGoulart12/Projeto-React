export const loadPosts = async () => {
    const postsResponse = fetch("https://jsonplaceholder.typicode.com/posts"); //Joga dentro da variavel postsResponse o fetch da API
    const photosResponse = fetch("https://jsonplaceholder.typicode.com/photos"); //Joga dentro da variavel photosResponse o fetch da API

    const [posts, photos] = await Promise.all([postsResponse, photosResponse]); //Joga dentro das variaveis 'posts' e 'photos' a Promise de tudo das variaveis que estao as url

    const postsJson = await posts.json(); //Joga dentro da variavel postsJson a transformacao do retorno das variaveis acima em Json()
    const photosJson = await photos.json(); //Joga dentro da variavel photosJson a transformacao do retorno das variaveis acima em Json()

    const postsAndPhotos = postsJson.map((post, index) => {
        //Joga dentro da variavel postsAndPhotos um map pegando o post e o index e retornando todos os posts e a

        return { ...post, cover: photosJson[index].url }; // variavel 'cover' recebe o resultado da variavel photosJson[index].url
    });

    return postsAndPhotos;
};
