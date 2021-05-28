import React  from 'react';
import axios from 'axios';
import {
  Typography, Grid
} from '@material-ui/core';
import Header from './components/Header/Header';
import ReactWordcloud from 'react-wordcloud';
import './styles/App.css'
import "d3-transition";
import { select } from "d3-selection";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      words: [],
      match: true,
  };
}


  changeKey = (newKey) => {
    var options = {
      headers: {
        'x-rapidapi-key': '1b1153daf8msh3dce44a68879090p11af0fjsna7afcb37a3cb',
        'x-rapidapi-host': 'wordsapiv1.p.rapidapi.com'
      }
    };
    axios.get('https://wordsapiv1.p.rapidapi.com/words/'+ newKey + '/hasTypes', options).then((response) => {
      this.setState({words: response.data.hasTypes});
      if (this.state.words.length === 0) {
        this.setState({match: false});
      } else {
        this.setState({match: true});
      }
    }).catch((error) => {
      this.setState({match:false});
      console.error(error);
    });
  }

  getCallback = (callback) => {
    return (word, event) => {
      const isActive = callback !== "onWordMouseOut";
      const element = event.target;
      const text = select(element);
      text
        .on("click", () => {
          let attribute = element.getAttribute("font-weight");
          text.transition().attr("font-weight", function(index, current) {
            if (attribute == "bold") {
              return "normal";
            } else {
              return "bold";
            }
          });
        })
        .transition()
        .attr("font-size", isActive ? "150%" : "100%")
    };
  }

  render () {

    const callbacks = {
      onWordClick: this.getCallback("onWordClick"),
      onWordMouseOut: this.getCallback("onWordMouseOut"),
      onWordMouseOver: this.getCallback("onWordMouseOver")
    };
    
    const options = {
      colors: "black",
      rotations: 2, 
      rotationAngles: [-90, 0],
      enableTooltip: false,
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
    };
    var related = [];
    for (let i = 0; i < this.state.words.length; i++) {
      related.push({ text: this.state.words[i], value: 1});
    }

    return (
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Header changeKey={this.changeKey} />
        </Grid>    
        <Grid item xs={12}>        
         <div className="cloud">         
          {this.state.match ?  
              <ReactWordcloud 
                callbacks={callbacks}
                options={options}
                words={related}/>
            :   <Typography align="center" className="no-matches">
                  No matches found!
                </Typography>
            }   
           </div>  
        </Grid>
      </Grid>
    );
  }
}

export default App;
