
import './styles.css';

import { Component } from 'react';                                                          //Importa o Component de react
                 //Importa o componente
import { loadPosts } from '../../utils/load-posts'
import { Posts } from '../../Posts/index';
import { ButtonPages } from '../../components/ButtonPages';
import { TextInput } from '../../components/TextInput';

//Componente de Classe

class Home extends Component {                                                               //Criado uma classe chamada App que pega a extensao do Component
  state = {                                                                                 //em Component tem State, assim cria um objeto array 'posts' dentro deste State
  //State é o que controla a renderizacao da pagina, se algo mudar dentro do state a página é renderizada novamente  
    posts: [],
    allPosts: [],
    page: 0,
    postPerPage: 30,
    searchValue: ''
  }

   async componentDidMount() {                                                                     //ComponentDidMount() é chamado imediatamente após um componente ser montado
   await this.loadPosts()                                                                         //Chama a função loadPosts
  }


  loadPosts = async () => {
    const { page, postPerPage } = this.state
                                                                    //Cria a função loadPosts
    const postsAndPhotos = await loadPosts()
    this.setState({ posts: postsAndPhotos.slice(page, postPerPage), allPosts: postsAndPhotos,})                                               //Seta o state fazendo o posts receber a funcao postsAndPhotos                                         
  }

  loadMorePosts = () => {
    const {
      page,
      postPerPage,
      allPosts,
      posts  
    } = this.state
    const nextPage = page + postPerPage
    const nextPosts = allPosts.slice(nextPage, nextPage + postPerPage)
    posts.push(...nextPosts)

    this.setState({ posts, page: nextPage })
  }
  
  handleChange = (e) => {
    const { value } = e.target;
    this.setState({ searchValue: value });
  }

  render() {
    const { posts, page, postPerPage, allPosts, searchValue } = this.state
    const noMorePosts = page + postPerPage >= allPosts.length

    const filteredPosts = !!searchValue ?                         //traducao dessa linha ('Se searchValue for true faz ? se for false faz :')
    allPosts.filter(post => {
      return post.title.toUpperCase().includes(searchValue.toUpperCase())
    }) 
    : posts

    return (
      <section className="container">
        <div className="search-container">
          {!!searchValue && (
            <>
            <h1>Search value: {searchValue}</h1>
            </>
          )}

          <TextInput searchValue={searchValue} handleChange={this.handleChange}/>
        </div>
        
          {filteredPosts.length > 0 && (
            <Posts posts={filteredPosts} />
          )}
        
          {filteredPosts.length === 0 && (
           <p>Não existem Posts!</p> 
            )}  


        <div className="button-container">
          {!searchValue && (
            <ButtonPages 
            text="Carregar mais Posts"
            onClick={this.loadMorePosts}
            disabled={noMorePosts}
          />    
          )}        
        </div>             
      </section>
    );
  }    
}
      
    

//Componente de Funcao

/*function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}
*/

export default Home;
