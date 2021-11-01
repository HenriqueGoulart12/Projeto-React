import "./styles.css";

import { useCallback, useEffect, useState } from "react"; //Importa o Component de react
//Importa o componente
import { loadPosts } from "../../utils/load-posts";
import { Posts } from "../../Posts/index";
import { ButtonPages } from "../../components/ButtonPages/index";
import { TextInput } from "../../components/TextInput";

export const Home = () => {
    const [posts, setPosts] = useState([]);
    const [allPosts, setAllPosts] = useState([]);
    const [page, setPage] = useState(0);
    const [postPerPage] = useState(30);
    const [searchValue, setSearchValue] = useState("");

    const noMorePosts = page + postPerPage >= allPosts.length;

    const filteredPosts = searchValue //traducao dessa linha ('Se searchValue for true faz ? se for false faz :')
        ? allPosts.filter((post) => {
              return post.title
                  .toUpperCase()
                  .includes(searchValue.toUpperCase());
          })
        : posts;

    const handleLoadPosts = useCallback(async (page, postPerPage) => {
        const postsAndPhotos = await loadPosts();

        setPosts(postsAndPhotos.slice(page, postPerPage));
        setAllPosts(postsAndPhotos);
    }, []);

    useEffect(() => {
        handleLoadPosts(0, postPerPage);
    }, [handleLoadPosts, postPerPage]);

    const loadMorePosts = () => {
        const nextPage = page + postPerPage;
        const nextPosts = allPosts.slice(nextPage, nextPage + postPerPage);
        posts.push(...nextPosts);

        setPosts(posts);
        setPage(nextPage);
    };

    const handleChange = (e) => {
        const { value } = e.target;
        setSearchValue(value);
    };

    return (
        <section className="container">
            <div className="search-container">
                {!!searchValue && (
                    <>
                        <h1>Search value: {searchValue}</h1>
                    </>
                )}

                <TextInput
                    searchValue={searchValue}
                    handleChange={handleChange}
                />
            </div>

            {filteredPosts.length > 0 && <Posts posts={filteredPosts} />}

            {filteredPosts.length === 0 && <p>Não existem Posts!</p>}

            <div className="button-container">
                {!searchValue && (
                    <ButtonPages
                        text="Carregar mais Posts"
                        onClick={loadMorePosts}
                        disabled={noMorePosts}
                    />
                )}
            </div>
        </section>
    );
};

//Componente de Classe

/*export class Home2 extends Component {                                                               //Criado uma classe chamada App que pega a extensao do Component
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

  render() {
    const { posts, page, postPerPage, allPosts, searchValue } = this.state
    const noMorePosts = page + postPerPage >= allPosts.length




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
