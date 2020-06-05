import React, { Component } from 'react';
import './App.css';
import { Button, Input, Jumbotron, InputGroup, InputGroupAddon, ListGroup, ListGroupItem, Alert } from 'reactstrap';

class App extends Component {
  constructor(props){
  super(props)
    this.state = {
      search: "",
      articles: [],
      error: null
    }
  }

  getArticles = (query) => {
    let apiKey = process.env.REACT_APP_NYT_API_KEY
    let searchURL =`https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${query}&api-key=${apiKey}`

    fetch(searchURL)
    .then((response ) => {
      if (response.status !==200){
        throw({ message: "Could not perform the search, please try again"})
      }
      return response.json()
    })
    .then((payload) => {
      let articles = payload.response.docs
      this.setState({ articles: articles})
    })
    .catch((error) => this.setState({error}))
  }

  searchInput = () => {
    this.getArticles(this.state.search)
  }



  render(){
  return (
    <>
     <Jumbotron>
        <h1 className="display-3">New York Times Article API tester</h1>
        <p className="lead">An API challenge application utilizing the NYT Article Search API.</p>
        <hr className="my-2" />
        <p>Want to see the code? Click the learn more button to see the Github Repo</p>
        <p className="lead">
          <Button color="primary" href="https://github.com/alyxender/nyt-api">Learn More</Button>
        </p>
      </Jumbotron>
      <br />
      <div id="input">
      <InputGroup>
        <Input 
          placeholder="Search for an article."
          type="text"
          onChange={ (e) => this.setState({ search: e.target.value })}
          value = { this.state.search }
         />
         <InputGroupAddon addonType="append">
          <Button color="secondary" onClick={ this.searchInput }>Search</Button>
          </InputGroupAddon>
      </InputGroup>
      </div>
      <div id="error">
          { this.state.error &&
            <Alert color="danger">
              { this.state.error.message }
            </Alert>
          }
      </div>

      <div id="results">
          { this.state.articles.map((article, index) => {
            return(
              <ListGroup key={ index } >
                <ListGroupItem tag="a" href={ article.web_url } action>{ article.abstract }</ListGroupItem>
              </ListGroup>
            )
          })
          }
      </div>
    </>
  )
 }
}

export default App;
